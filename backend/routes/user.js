const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  const rawIp = Array.isArray(forwarded) ? forwarded[0] : (forwarded || req.socket.remoteAddress || '');
  return String(rawIp).split(',')[0].trim().replace(/^::ffff:/, '');
};

const SESSION_TIMEOUT_MINUTES = Math.max(Number(process.env.VISITOR_SESSION_TIMEOUT_MINUTES) || 30, 1);

let visitorTablesReady = false;

const addColumnIfMissing = async (tableName, columnName, definition) => {
  const [columns] = await pool.query(`SHOW COLUMNS FROM ${tableName} LIKE ?`, [columnName]);
  if (columns.length === 0) {
    try {
      await pool.query(`ALTER TABLE ${tableName} ADD COLUMN ${definition}`);
    } catch (error) {
      if (error.code !== 'ER_DUP_FIELDNAME') {
        throw error;
      }
    }
  }
};

const ensureVisitorTables = async () => {
  if (visitorTablesReady) return;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS visitor_logs (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      session_id VARCHAR(128) NOT NULL,
      visitor_id VARCHAR(128) NULL,
      ip_address VARCHAR(64) NOT NULL,
      path VARCHAR(512) NULL,
      landing_path VARCHAR(512) NULL,
      last_path VARCHAR(512) NULL,
      referrer VARCHAR(1024) NULL,
      user_agent TEXT NULL,
      device_type VARCHAR(32) NULL,
      browser_name VARCHAR(64) NULL,
      os_name VARCHAR(64) NULL,
      language VARCHAR(32) NULL,
      timezone VARCHAR(64) NULL,
      screen_width INT NULL,
      screen_height INT NULL,
      page_view_count INT NOT NULL DEFAULT 1,
      is_blocked TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      last_seen_at DATETIME NULL,
      PRIMARY KEY (id),
      INDEX idx_visitor_logs_created_at (created_at),
      INDEX idx_visitor_logs_last_seen_at (last_seen_at),
      INDEX idx_visitor_logs_session_created (session_id, created_at),
      INDEX idx_visitor_logs_ip_created (ip_address, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await addColumnIfMissing('visitor_logs', 'session_id', 'session_id VARCHAR(128) NULL');
  await addColumnIfMissing('visitor_logs', 'visitor_id', 'visitor_id VARCHAR(128) NULL');
  await addColumnIfMissing('visitor_logs', 'ip_address', 'ip_address VARCHAR(64) NULL');
  await addColumnIfMissing('visitor_logs', 'path', 'path VARCHAR(512) NULL');
  await addColumnIfMissing('visitor_logs', 'landing_path', 'landing_path VARCHAR(512) NULL');
  await addColumnIfMissing('visitor_logs', 'last_path', 'last_path VARCHAR(512) NULL');
  await addColumnIfMissing('visitor_logs', 'referrer', 'referrer VARCHAR(1024) NULL');
  await addColumnIfMissing('visitor_logs', 'user_agent', 'user_agent TEXT NULL');
  await addColumnIfMissing('visitor_logs', 'device_type', 'device_type VARCHAR(32) NULL');
  await addColumnIfMissing('visitor_logs', 'browser_name', 'browser_name VARCHAR(64) NULL');
  await addColumnIfMissing('visitor_logs', 'os_name', 'os_name VARCHAR(64) NULL');
  await addColumnIfMissing('visitor_logs', 'language', 'language VARCHAR(32) NULL');
  await addColumnIfMissing('visitor_logs', 'timezone', 'timezone VARCHAR(64) NULL');
  await addColumnIfMissing('visitor_logs', 'screen_width', 'screen_width INT NULL');
  await addColumnIfMissing('visitor_logs', 'screen_height', 'screen_height INT NULL');
  await addColumnIfMissing('visitor_logs', 'page_view_count', 'page_view_count INT NOT NULL DEFAULT 1');
  await addColumnIfMissing('visitor_logs', 'last_seen_at', 'last_seen_at DATETIME NULL');
  await addColumnIfMissing('visitor_logs', 'is_blocked', 'is_blocked TINYINT(1) NOT NULL DEFAULT 0');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS visitor_blocks (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      ip_address VARCHAR(64) NOT NULL,
      reason VARCHAR(255) NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uniq_visitor_blocks_ip (ip_address),
      INDEX idx_visitor_blocks_active (is_active)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  visitorTablesReady = true;
};

const parseUserAgent = (userAgent = '') => {
  const ua = String(userAgent);
  const lower = ua.toLowerCase();

  const deviceType = /mobile|iphone|ipod|android.*mobile/.test(lower)
    ? 'mobile'
    : /ipad|tablet|android/.test(lower)
      ? 'tablet'
      : 'desktop';

  const browserName = /edg\//i.test(ua)
    ? 'Edge'
    : /opr\//i.test(ua)
      ? 'Opera'
      : /chrome|crios/i.test(ua)
        ? 'Chrome'
        : /safari/i.test(ua)
          ? 'Safari'
          : /firefox|fxios/i.test(ua)
            ? 'Firefox'
            : 'Other';

  const osName = /windows/i.test(ua)
    ? 'Windows'
    : /android/i.test(ua)
      ? 'Android'
      : /iphone|ipad|ipod/i.test(ua)
        ? 'iOS'
        : /mac os|macintosh/i.test(ua)
          ? 'macOS'
          : /linux/i.test(ua)
            ? 'Linux'
            : 'Other';

  return { deviceType, browserName, osName };
};

const toNullableNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

// 파일 업로드 세팅 (Multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

// [POST] /api/user/track
router.post('/track', async (req, res) => {
  const { visitor_id, session_id, path: pagePath, referrer, language, timezone, screen_width, screen_height } = req.body || {};
  const visitorId = String(visitor_id || '').slice(0, 128);
  const sessionId = String(session_id || '').slice(0, 128);
  const ipAddress = getClientIp(req);
  const userAgent = req.headers['user-agent'] || '';
  const normalizedPath = pagePath ? String(pagePath).slice(0, 512) : null;
  const normalizedReferrer = referrer ? String(referrer).slice(0, 1024) : null;
  const { deviceType, browserName, osName } = parseUserAgent(userAgent);

  if (!sessionId) {
    return res.status(400).json({ success: false, message: 'session_id is required' });
  }

  try {
    await ensureVisitorTables();

    const [blocks] = await pool.query(
      'SELECT id, reason FROM visitor_blocks WHERE ip_address = ? AND is_active = 1 LIMIT 1',
      [ipAddress]
    );
    const block = blocks[0];

    const [sessions] = await pool.query(
      `SELECT id
       FROM visitor_logs
       WHERE session_id = ?
         AND COALESCE(last_seen_at, created_at) >= DATE_SUB(NOW(), INTERVAL ? MINUTE)
       ORDER BY COALESCE(last_seen_at, created_at) DESC
       LIMIT 1`,
      [sessionId, SESSION_TIMEOUT_MINUTES]
    );
    const activeSession = sessions[0];

    if (activeSession) {
      await pool.query(
        `UPDATE visitor_logs
         SET visitor_id = COALESCE(?, visitor_id),
             ip_address = ?,
             path = ?,
             last_path = ?,
             referrer = COALESCE(referrer, ?),
             user_agent = ?,
             device_type = ?,
             browser_name = ?,
             os_name = ?,
             language = COALESCE(?, language),
             timezone = COALESCE(?, timezone),
             screen_width = COALESCE(?, screen_width),
             screen_height = COALESCE(?, screen_height),
             page_view_count = COALESCE(page_view_count, 1) + 1,
             is_blocked = ?,
             last_seen_at = NOW()
         WHERE id = ?`,
        [
          visitorId || null,
          ipAddress,
          normalizedPath,
          normalizedPath,
          normalizedReferrer,
          String(userAgent).slice(0, 1000),
          deviceType,
          browserName,
          osName,
          language ? String(language).slice(0, 32) : null,
          timezone ? String(timezone).slice(0, 64) : null,
          toNullableNumber(screen_width),
          toNullableNumber(screen_height),
          block ? 1 : 0,
          activeSession.id
        ]
      );
    } else {
      await pool.query(
        `INSERT INTO visitor_logs (
          visitor_id, session_id, ip_address, path, landing_path, last_path,
          referrer, user_agent, device_type, browser_name, os_name, language,
          timezone, screen_width, screen_height, page_view_count, is_blocked,
          created_at, last_seen_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, NOW(), NOW())`,
        [
          visitorId || null,
          sessionId,
          ipAddress,
          normalizedPath,
          normalizedPath,
          normalizedPath,
          normalizedReferrer,
          String(userAgent).slice(0, 1000),
          deviceType,
          browserName,
          osName,
          language ? String(language).slice(0, 32) : null,
          timezone ? String(timezone).slice(0, 64) : null,
          toNullableNumber(screen_width),
          toNullableNumber(screen_height),
          block ? 1 : 0
        ]
      );
    }

    if (block) {
      return res.status(403).json({
        success: false,
        blocked: true,
        reason: block.reason || '관리자에 의해 접근이 제한되었습니다.'
      });
    }

    return res.json({
      success: true,
      blocked: false,
      tracked: activeSession ? 'updated' : 'created',
      session_timeout_minutes: SESSION_TIMEOUT_MINUTES
    });
  } catch (error) {
    console.error('Visitor tracking error:', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});


// [GET] /api/user/popups
router.get('/popups', async (req, res) => {
  try {
    const sql = `
      SELECT idx, title, image_url, link_url 
      FROM popups 
      WHERE is_active = 1 
      ORDER BY priority DESC, idx DESC
      LIMIT 5
    `;
    const [rows] = await pool.query(sql);
    
    // 💡 프론트엔드와 규격을 맞추기 위해 객체로 감싸서 보냅니다.
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('❌ SQL ERROR:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// [GET] /api/user/community
router.get('/community', async (req, res) => {
  // 프론트에서 넘어오는 activeTab 값 (notice, event, voc)
  const type = req.query.type || 'notice';
  
  try {
    // is_active 조건이 있다면 추가하는 것이 좋습니다.
    const sql = 'SELECT * FROM board WHERE type = ? ORDER BY idx DESC';
    const [rows] = await pool.query(sql, [type]);
    
    // 디버깅용 로그: 어떤 타입으로 몇 건이 조회되었는지 출력
    console.log(`[Community] Fetch Type: ${type}, Found: ${rows.length} posts`);
    
    res.json(rows);
  } catch (error) { 
    console.error('❌ Community Fetch Error:', error.message);
    res.status(500).json({ error: error.message }); 
  }
});

// [POST] /api/user/franchise (이미지 컬럼명 반영 버전)
router.post('/franchise', async (req, res) => {
  const { 
    customer_name, 
    phone_number, 
    email, 
    hope_region, 
    has_store, 
    inquiry_channels, 
    inquiry_content,
    user_agent 
  } = req.body;

  const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  try {
    const sql = `
      INSERT INTO franchise_inquiries 
      (customer_name, phone_number, email, hope_region, has_store, inquiry_channels, inquiry_content, ip_address, user_agent, status, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'RECEIVED', NOW(), NOW())
    `;

    const [result] = await pool.query(sql, [
      customer_name, 
      phone_number, 
      email || null, 
      hope_region || null, 
      has_store || 'N', 
      inquiry_channels || null, 
      inquiry_content || null,
      ip_address,
      user_agent || null
    ]);

    // 🚨 [관리자 이메일 알림 로직] DB 저장 성공 후 알림 발송 시작
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tbswatermhddcoffee@gmail.com', // 발송에 사용할 구글 계정
          pass: 'czrghxonbmyzdkwn'              // 발급받은 16자리 앱 비밀번호
        }
      });

      const mailOptions = {
        // 원래 물어보셨던 from 부분입니다. 이름 뒤에 <형 메일주소>를 붙여주는 게 정석입니다.
        from: '"리프레소 알림" <tbswatermhddcoffee@gmail.com>', 
        to: 'tbswatermhddcoffee@gmail.com',     // 알림을 받아볼 관리자 메일 주소
        subject: `🚨 [신규 가맹상담 접수] ${customer_name}님의 문의가 등록되었습니다.`,
        html: `
          <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
            <h2 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-top: 0;">🚨 가맹 상담 신청 알림</h2>
            <p style="font-size: 14px; color: #555;">홈페이지를 통해 새로운 가맹 상담 신청이 접수되었습니다. 상세 내용은 아래와 같습니다.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 10px; background: #f8f9fa; border: 1px solid #dee2e6; width: 30%; font-weight: bold;">성함</td>
                <td style="padding: 10px; border: 1px solid #dee2e6;">${customer_name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">연락처</td>
                <td style="padding: 10px; border: 1px solid #dee2e6; color: #d9534f; font-weight: bold;">${phone_number}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">이메일</td>
                <td style="padding: 10px; border: 1px solid #dee2e6;">${email ? email : '미기재(고객이 입력 안 함)'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">창업 희망 지역</td>
                <td style="padding: 10px; border: 1px solid #dee2e6;">${hope_region || '미선택'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">점포 보유 여부</td>
                <td style="padding: 10px; border: 1px solid #dee2e6;">${has_store === 'Y' ? '점포 있음(유)' : '점포 없음(무)'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">문의 경로</td>
                <td style="padding: 10px; border: 1px solid #dee2e6;">${inquiry_channels || '미기재'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">상세 문의 내용</td>
                <td style="padding: 10px; border: 1px solid #dee2e6; white-space: pre-wrap;">${inquiry_content || '내용 없음'}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; text-align: center;">
              <p style="font-size: 12px; color: #888;">접수 IP: ${ip_address}</p>
            </div>
          </div>
        `
      };

      // 메일 발송 결과와 상관없이 클라이언트 응답을 보장하기 위해 비동기 콜백으로 처리
      transporter.sendMail(mailOptions, (mailErr, info) => {
        if (mailErr) {
          console.error('❌ 관리자 이메일 발송 에러:', mailErr.message);
        } else {
          console.log('✅ 관리자 이메일 발송 성공:', info.response);
        }
      });

    } catch (mailSetupError) {
      console.error('❌ 메일 발송 설정 에러:', mailSetupError.message);
    }

    // DB 입력 후 반드시 'json' 형태로 응답을 마쳐야 프론트가 에러로 안 빠집니다.
    return res.status(200).json({ 
      success: true, 
      message: '정상적으로 접수되었습니다.' 
    });
    
  } catch (error) {
    console.error('❌ DB 저장 중 에러 발생:', error.message);
    
    if (!res.headersSent) {
      return res.status(500).json({ 
        success: false, 
        error: '데이터베이스 저장 실패' 
      });
    }
  }
});

// [GET] /api/user/community/:id (상세보기)
router.get('/community/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM board WHERE idx = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    
    // 조회수 증가 (실패해도 본문은 보여줘야 하므로 catch 처리)
    await pool.query('UPDATE board SET view_count = view_count + 1 WHERE idx = ?', [id]).catch(() => {});
    
    res.json(rows[0]);
  } catch (error) { 
    res.status(500).json({ error: error.message }); 
  }
});

// [POST] /api/user/community/write
router.post('/community/write', upload.single('image'), async (req, res) => {
  const { type, title, content, is_private, password } = req.body;
  const thumbnail_url = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const sql = `
      INSERT INTO board 
      (category, type, title, content, thumbnail_url, password, is_private, view_count, is_active, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, 0, 1, NOW())
    `;
    const [result] = await pool.query(sql, [type, type, title, content, thumbnail_url, password || null, is_private || 0]);
    res.json({ success: true, idx: result.insertId });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// [GET] /api/user/menus
router.get('/menus', async (req, res) => {
  const { type } = req.query;

  try {
    let query = `
      SELECT
        idx,
        type,
        name,
        eng_name,
        description,
        thumbnail_url,
        price
      FROM cafe_menu
      WHERE is_active = 1
    `;

    const params = [];

    if (type && type !== 'all') {
      query += ' AND type = ?';
      params.push(type);
    }

    query += ' ORDER BY sort_order ASC, idx DESC';

    const [rows] = await pool.query(query, params);

    return res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('메뉴 조회 오류:', error);
    return res.status(500).json({
      success: false,
      message: '메뉴 조회 중 오류가 발생했습니다.',
      error: error.message
    });
  }
});

// [GET] /api/user/stores
router.get('/stores', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM store_list ORDER BY idx ASC');
    res.json(rows);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

module.exports = router;
