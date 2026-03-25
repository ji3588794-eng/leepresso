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

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

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
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const json = await res.json();

      if (json.success) {
        setData(Array.isArray(json.data) ? json.data : []);
      } else {
        setData([]);
        setError(json.message || '방문자 데이터를 불러오지 못했습니다.');
      }
    } catch (err: any) {
      console.error('❌ Visitors API를 찾을 수 없습니다:', err);
      setData([]);
      setError(err.message || 'Visitors API 호출 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className={styles.container}>
      {error && (
        <div style={{ padding: '12px 0', color: 'crimson', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <section className={styles.chartSection}>
        <h3>최근 7일 방문 추이</h3>

        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eee"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
              />
              <Legend verticalAlign="top" align="right" />
              <Line
                type="monotone"
                dataKey="visitors"
                name="방문자(UV)"
                stroke="#8d7b68"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="pv"
                name="페이지뷰(PV)"
                stroke="#e8d5c4"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className={styles.tableSection}>
        <table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>방문자 수 (UV)</th>
              <th>페이지뷰 (PV)</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                  데이터를 불러오는 중입니다...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((row) => (
                <tr key={row.date}>
                  <td>{row.date}</td>
                  <td>{Number(row.visitors || 0).toLocaleString()} 명</td>
                  <td>{Number(row.pv || 0).toLocaleString()} 건</td>
                  <td>-</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                  방문자 데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default VisitorsPage;