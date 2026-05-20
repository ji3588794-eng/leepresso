const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

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