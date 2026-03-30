'use client';

import { useEffect, useState } from 'react';
import styles from './infra.module.scss';

type InfraItem = {
  id: number;
  service_name: string;
  target_url: string;
  status: string;
  usage_percent: number | null;
  d_day: number | null;
  expiry_date: string | null;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const InfraPage = () => {
  const [infra, setInfra] = useState<InfraItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await fetch(`${API_BASE}/api/admin/infra/status`, {
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
        setInfra(Array.isArray(json.data) ? json.data : []);
      } else {
        setInfra([]);
        setError(json.message || '인프라 데이터를 불러오지 못했습니다.');
      }
    } catch (err: any) {
      console.error('❌ Infra API를 찾을 수 없습니다. 주소를 확인하세요:', err);
      setInfra([]);
      setError(err.message || 'Infra API 호출 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h3>시스템 인프라 현황</h3>
        <button className={styles.refreshBtn} onClick={loadData}>
          새로고침
        </button>
      </header>

      {error && (
        <div style={{ padding: '12px 0', color: 'crimson', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <div className={styles.grid}>
        {loading ? (
          <div style={{ padding: '20px' }}>인프라 상태를 불러오는 중...</div>
        ) : infra.length > 0 ? (
          infra.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span
                  className={`${styles.badge} ${
                    item.status === 'active' ? styles.active : styles.warning
                  }`}
                >
                  {item.status?.toUpperCase() || 'UNKNOWN'}
                </span>
              </div>

              <h4>{item.service_name}</h4>
              <p className={styles.url}>{item.target_url}</p>

              {item.usage_percent !== null &&
              !item.service_name?.includes('Domain') ? (
                <div className={styles.gaugeWrap}>
                  <div className={styles.labelRow}>
                    <span>리소스 사용량</span>
                    <span>{item.usage_percent}%</span>
                  </div>
                  <div className={styles.barBg}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${item.usage_percent}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.ddayArea}>
                  <p style={{ fontSize: '0.8rem', color: '#888' }}>
                    도메인 만료까지
                  </p>
                  <p className={styles.ddayText}>
                    {item.d_day !== null && item.d_day !== undefined
                      ? `D-${item.d_day}`
                      : '-'}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#ccc' }}>
                    {item.expiry_date
                      ? `${new Date(item.expiry_date).toLocaleDateString()} 만료`
                      : '-'}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={{ padding: '20px' }}>인프라 상태 데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default InfraPage;