'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import styles from './dashboard.module.scss';

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get('/admin/dashboard/stats');
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error('Dash Load Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <div className={styles.loading}>데이터 수집 중...</div>;

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.mainTitle}>LEEPRESSO 현황 요약</h2>
      
      {/* 주요 현황 카드 (실시간 카운트) */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard} onClick={() => router.push('/admin/inquiry')}>
          <div className={styles.info}>
            <p>신규 창업 문의</p>
            <h3 className={styles.highlight}>{stats?.counts.franchise}건</h3>
          </div>
          <div className={styles.icon}>📩</div>
        </div>
        <div className={styles.statCard} onClick={() => router.push('/admin/community/event')}>
          <div className={styles.info}>
            <p>진행 중인 이벤트</p>
            <h3>{stats?.counts.event}건</h3>
          </div>
          <div className={styles.icon}>🎁</div>
        </div>
        <div className={styles.statCard} onClick={() => router.push('/admin/board/voc')}>
          <div className={styles.info}>
            <p>고객의 소리 (미답변)</p>
            <h3 className={styles.danger}>{stats?.counts.voc}건</h3>
          </div>
          <div className={styles.icon}>🗣️</div>
        </div>
      </section>

      <section className={styles.managementGrid}>
        {/* 운영 관리 현황 (팝업, 메뉴 연동) */}
        <div className={styles.contentCard}>
          <h3>운영 관리 현황</h3>
          <ul className={styles.summaryList}>
            <li>
              <span>등록된 매장 수</span> 
              <strong>{stats?.counts.stores}개</strong>
            </li>
            <li>
              <span>활성화된 메뉴 (cafe_menu)</span> 
              <strong>{stats?.counts.menu}개</strong>
            </li>
            <li>
              <span>등록된 팝업 (popup)</span> 
              <strong>{stats?.counts.popup}개</strong>
            </li>
          </ul>
        </div>

        {/* 최근 창업 문의 목록 (실제 리스트) */}
        <div className={styles.contentCard}>
          <h3>최근 창업 문의</h3>
          <div className={styles.recentInquiry}>
            {stats?.recentFranchise.length > 0 ? (
              stats.recentFranchise.map((item: any) => (
                <div key={item.id} className={styles.inquiryRow}>
                  <span>[{item.hope_region}] {item.customer_name}님</span>
                  <small>{new Date(item.created_at).toLocaleDateString()}</small>
                </div>
              ))
            ) : (
              <p className={styles.noData}>접수된 문의가 없습니다.</p>
            )}
            <button className={styles.moreBtn} onClick={() => router.push('/admin/inquiry')}>
              전체 창업문의 관리 이동
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}