'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import styles from './visitors.module.scss';

type VisitorRow = {
  date: string;
  visitors: number;
  pv: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const VisitorsPage = () => {
  const [data, setData] = useState<VisitorRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await fetch(`${API_BASE}/api/admin/analytics/visitors`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || '데이터를 불러오는데 실패했습니다.');
      }

      setData(Array.isArray(json.data) ? json.data : []);
    } catch (err: any) {
      console.error('❌ 클라이언트 에러:', err);
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className={styles.container} style={{ padding: '20px' }}>
      {error && (
        <div style={{ 
          padding: '15px', 
          color: '#721c24', 
          backgroundColor: '#f8d7da', 
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          marginBottom: '20px' 
        }}>
          <strong>오류 발생:</strong> {error}
        </div>
      )}

      <section className={styles.chartSection}>
        <h3 style={{ marginBottom: '20px' }}>최근 7일 방문 추이</h3>
        <div style={{ width: '100%', height: '400px', backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend verticalAlign="top" align="right" />
              <Line type="monotone" dataKey="visitors" name="방문자(UV)" stroke="#8d7b68" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="pv" name="페이지뷰(PV)" stroke="#e8d5c4" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className={styles.tableSection} style={{ marginTop: '30px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>날짜</th>
              <th style={{ padding: '12px' }}>방문자 수 (UV)</th>
              <th style={{ padding: '12px' }}>페이지뷰 (PV)</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} style={{ textAlign: 'center', padding: '20px' }}>로딩 중...</td></tr>
            ) : data.length > 0 ? (
              data.map((row) => (
                <tr key={row.date} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{row.date}</td>
                  <td style={{ padding: '12px' }}>{Number(row.visitors).toLocaleString()} 명</td>
                  <td style={{ padding: '12px' }}>{Number(row.pv).toLocaleString()} 건</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={3} style={{ textAlign: 'center', padding: '20px' }}>데이터가 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default VisitorsPage;