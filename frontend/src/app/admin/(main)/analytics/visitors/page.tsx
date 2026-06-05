'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import api from '@/app/lib/api';
import styles from './visitors.module.scss';

type VisitorRow = {
  date: string;
  visitors: number;
  unique_visitors: number;
  pv: number;
  avg_pages: number;
  avg_duration_seconds: number;
  blocked_sessions: number;
};

type VisitorSummary = {
  sessions?: number;
  unique_visitors?: number;
  unique_ips?: number;
  page_views?: number;
  avg_pages?: number;
  avg_duration_seconds?: number;
  blocked_sessions?: number;
};

type BreakdownRow = {
  name?: string;
  path?: string;
  sessions?: number;
  entrances?: number;
  pv?: number;
};

type VisitorLog = {
  id: number;
  visitor_id: string | null;
  session_id: string;
  ip_address: string;
  landing_path: string | null;
  last_path: string | null;
  device_type: string | null;
  browser_name: string | null;
  os_name: string | null;
  page_view_count: number;
  duration_seconds: number;
  is_blocked: number;
  block_active: number;
  block_reason: string | null;
  created_at: string;
  last_seen_at: string;
};

type BlockRow = {
  id: number;
  ip_address: string;
  reason: string | null;
  is_active: number;
  created_at: string;
  updated_at: string | null;
};

type VisitorsResponse = {
  data?: VisitorRow[];
  summary?: VisitorSummary;
  breakdowns?: {
    devices?: BreakdownRow[];
    browsers?: BreakdownRow[];
    topPages?: BreakdownRow[];
  };
  session_timeout_minutes?: number;
};

const PERIODS = [7, 14, 30];

const getErrorMessage = (error: unknown) => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (error as { response?: { data?: { message?: string; error?: string } } }).response;
    return response?.data?.message || response?.data?.error || '요청 처리 중 오류가 발생했습니다.';
  }

  if (error instanceof Error) return error.message;

  return '요청 처리 중 오류가 발생했습니다.';
};

const formatNumber = (value: unknown) => Number(value || 0).toLocaleString();

const formatDuration = (seconds: unknown) => {
  const totalSeconds = Math.max(Number(seconds || 0), 0);
  const minutes = Math.floor(totalSeconds / 60);
  const remainSeconds = totalSeconds % 60;

  if (minutes <= 0) return `${remainSeconds}초`;
  return `${minutes}분 ${remainSeconds}초`;
};

const VisitorsPage = () => {
  const [period, setPeriod] = useState(7);
  const [stats, setStats] = useState<VisitorRow[]>([]);
  const [summary, setSummary] = useState<VisitorSummary>({});
  const [devices, setDevices] = useState<BreakdownRow[]>([]);
  const [browsers, setBrowsers] = useState<BreakdownRow[]>([]);
  const [topPages, setTopPages] = useState<BreakdownRow[]>([]);
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [blocks, setBlocks] = useState<BlockRow[]>([]);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [loading, setLoading] = useState(true);
  const [savingIp, setSavingIp] = useState('');
  const [error, setError] = useState('');

  const activeBlockCount = useMemo(
    () => blocks.filter((item) => Number(item.is_active) === 1).length,
    [blocks]
  );

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const [statsRes, logsRes, blocksRes] = await Promise.all([
        api.get<VisitorsResponse>(`/admin/analytics/visitors?days=${period}`),
        api.get('/admin/analytics/visitor-logs?limit=100'),
        api.get('/admin/analytics/blocks'),
      ]);

      setStats(Array.isArray(statsRes.data?.data) ? statsRes.data.data : []);
      setSummary(statsRes.data?.summary || {});
      setDevices(Array.isArray(statsRes.data?.breakdowns?.devices) ? statsRes.data.breakdowns.devices : []);
      setBrowsers(Array.isArray(statsRes.data?.breakdowns?.browsers) ? statsRes.data.breakdowns.browsers : []);
      setTopPages(Array.isArray(statsRes.data?.breakdowns?.topPages) ? statsRes.data.breakdowns.topPages : []);
      setSessionTimeout(Number(statsRes.data?.session_timeout_minutes || 30));
      setLogs(Array.isArray(logsRes.data?.data) ? logsRes.data.data : []);
      setBlocks(Array.isArray(blocksRes.data?.data) ? blocksRes.data.data : []);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [period]);

  const blockIp = async (ip: string) => {
    const reason = window.prompt(`${ip} 차단 사유를 입력하세요.`, '관리자 차단');
    if (reason === null) return;

    try {
      setSavingIp(ip);
      await api.post('/admin/analytics/blocks', { ip_address: ip, reason });
      await fetchAll();
    } catch (err: unknown) {
      alert(getErrorMessage(err));
    } finally {
      setSavingIp('');
    }
  };

  const toggleBlock = async (block: BlockRow, isActive: boolean) => {
    try {
      setSavingIp(block.ip_address);
      await api.patch(`/admin/analytics/blocks/${block.id}`, { is_active: isActive ? 1 : 0 });
      await fetchAll();
    } catch (err: unknown) {
      alert(getErrorMessage(err));
    } finally {
      setSavingIp('');
    }
  };

  const deleteBlock = async (block: BlockRow) => {
    if (!window.confirm(`${block.ip_address} 차단 기록을 삭제할까요?`)) return;

    try {
      setSavingIp(block.ip_address);
      await api.delete(`/admin/analytics/blocks/${block.id}`);
      await fetchAll();
    } catch (err: unknown) {
      alert(getErrorMessage(err));
    } finally {
      setSavingIp('');
    }
  };

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>방문자 통계</h2>
          <p>{sessionTimeout}분 기준 세션으로 방문을 집계하고 페이지뷰를 누적합니다.</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.segmented}>
            {PERIODS.map((day) => (
              <button
                key={day}
                type="button"
                className={period === day ? styles.activeSegment : ''}
                onClick={() => setPeriod(day)}
              >
                {day}일
              </button>
            ))}
          </div>
          <button type="button" className={styles.refreshButton} onClick={fetchAll} disabled={loading}>
            새로고침
          </button>
        </div>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      <section className={styles.summaryGrid}>
        <div>
          <span>방문 세션</span>
          <strong>{formatNumber(summary.sessions)}</strong>
        </div>
        <div>
          <span>순 방문자</span>
          <strong>{formatNumber(summary.unique_visitors)}</strong>
        </div>
        <div>
          <span>페이지뷰</span>
          <strong>{formatNumber(summary.page_views)}</strong>
        </div>
        <div>
          <span>평균 페이지</span>
          <strong>{Number(summary.avg_pages || 0).toFixed(1)}</strong>
        </div>
        <div>
          <span>평균 체류</span>
          <strong>{formatDuration(summary.avg_duration_seconds)}</strong>
        </div>
        <div>
          <span>활성 차단 IP</span>
          <strong>{formatNumber(activeBlockCount)}</strong>
        </div>
      </section>

      <section className={styles.chartSection}>
        <h3>방문 추이</h3>
        <div className={styles.chartBox}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend verticalAlign="top" align="right" />
              <Line type="monotone" dataKey="visitors" name="방문 세션" stroke="#8d7b68" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="unique_visitors" name="순 방문자" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="pv" name="페이지뷰" stroke="#4b5563" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className={styles.insightGrid}>
        <div className={styles.chartSection}>
          <h3>기기 분포</h3>
          <div className={styles.smallChartBox}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={devices}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="sessions" name="세션" fill="#8d7b68" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.rankPanel}>
          <div className={styles.sectionTitle}>
            <h3>브라우저</h3>
          </div>
          <ul className={styles.rankList}>
            {browsers.length > 0 ? browsers.map((item) => (
              <li key={item.name}>
                <span>{item.name || 'unknown'}</span>
                <strong>{formatNumber(item.sessions)} 세션</strong>
              </li>
            )) : <li>데이터가 없습니다.</li>}
          </ul>
        </div>

        <div className={styles.rankPanel}>
          <div className={styles.sectionTitle}>
            <h3>랜딩 페이지 TOP 10</h3>
          </div>
          <ul className={styles.rankList}>
            {topPages.length > 0 ? topPages.map((item) => (
              <li key={item.path}>
                <span title={item.path || '/'}>{item.path || '/'}</span>
                <strong>{formatNumber(item.entrances)}회</strong>
              </li>
            )) : <li>데이터가 없습니다.</li>}
          </ul>
        </div>
      </section>

      <section className={styles.tableSection}>
        <div className={styles.sectionTitle}>
          <h3>최근 방문 세션</h3>
          <span>{logs.length.toLocaleString()}건</span>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>시작</th>
                <th>마지막</th>
                <th>IP</th>
                <th>랜딩</th>
                <th>마지막 페이지</th>
                <th>환경</th>
                <th>PV</th>
                <th>체류</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={10}>로딩 중...</td></tr>
              ) : logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.created_at}</td>
                    <td>{log.last_seen_at}</td>
                    <td>{log.ip_address}</td>
                    <td title={log.landing_path || ''}>{log.landing_path || '-'}</td>
                    <td title={log.last_path || ''}>{log.last_path || '-'}</td>
                    <td>{[log.device_type, log.browser_name, log.os_name].filter(Boolean).join(' / ') || '-'}</td>
                    <td>{formatNumber(log.page_view_count)}</td>
                    <td>{formatDuration(log.duration_seconds)}</td>
                    <td>
                      {Number(log.block_active) === 1 || Number(log.is_blocked) === 1 ? (
                        <span className={styles.badgeDanger}>차단</span>
                      ) : (
                        <span className={styles.badgeNormal}>허용</span>
                      )}
                    </td>
                    <td>
                      {Number(log.block_active) === 1 ? (
                        <span className={styles.muted}>차단됨</span>
                      ) : (
                        <button
                          type="button"
                          className={styles.dangerButton}
                          onClick={() => blockIp(log.ip_address)}
                          disabled={savingIp === log.ip_address}
                        >
                          차단
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={10}>방문 세션이 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.tableSection}>
        <div className={styles.sectionTitle}>
          <h3>차단 IP 관리</h3>
          <span>{blocks.length.toLocaleString()}건</span>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>IP</th>
                <th>사유</th>
                <th>등록일</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {blocks.length > 0 ? (
                blocks.map((block) => {
                  const active = Number(block.is_active) === 1;
                  return (
                    <tr key={block.id}>
                      <td>{block.ip_address}</td>
                      <td>{block.reason || '-'}</td>
                      <td>{block.created_at}</td>
                      <td>{active ? <span className={styles.badgeDanger}>차단 중</span> : <span className={styles.badgeNormal}>해제됨</span>}</td>
                      <td>
                        <div className={styles.actionGroup}>
                          <button
                            type="button"
                            className={active ? styles.secondaryButton : styles.dangerButton}
                            onClick={() => toggleBlock(block, !active)}
                            disabled={savingIp === block.ip_address}
                          >
                            {active ? '해제' : '다시 차단'}
                          </button>
                          <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={() => deleteBlock(block)}
                            disabled={savingIp === block.ip_address}
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr><td colSpan={5}>차단된 IP가 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default VisitorsPage;
