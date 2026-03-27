'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import styles from './dashboard.module.scss';

type DashboardCounts = {
  franchise: number;
  event: number;
  voc: number;
  stores: number;
  menu: number;
  popup: number;
};

type RecentFranchiseItem = {
  id: number;
  hope_region: string;
  customer_name: string;
  created_at: string;
};

type DashboardStats = {
  counts: DashboardCounts;
  recentFranchise: RecentFranchiseItem[];
};

type VisitorRow = {
  date: string;
  visitors: number;
  pv: number;
};

type InfraItem = {
  id: number;
  service_name: string;
  target_url: string;
  status: string;
  usage_percent: number | null;
  d_day: number | null;
  expiry_date: string | null;
};

const DashboardPage = () => {
  const router = useRouter();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [visitors, setVisitors] = useState<VisitorRow[]>([]);
  const [infra, setInfra] = useState<InfraItem[]>([]);
  
  // 💡 [추가] 매장, 메뉴, 팝업 개수를 담을 상태 추가
  const [storeCount, setStoreCount] = useState(0);
  const [menuCount, setMenuCount] = useState(0);
  const [popupCount, setPopupCount] = useState(0);
  
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // 💡 [수정] 누락되었던 매장, 메뉴, 팝업 데이터를 가져오는 API 호출 추가
      const [statsRes, visitorsRes, infraRes, storesRes, menuRes, popupsRes] = await Promise.allSettled([
        api.get('/admin/dashboard/stats'),
        api.get('/admin/analytics/visitors'),
        api.get('/admin/infra/status'),
        api.get('/admin/stores'),
        api.get('/admin/menu'),
        api.get('/admin/popups'),
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value?.data?.success) {
        setStats(statsRes.value.data.data);
      } else {
        setStats(null);
      }

      if (visitorsRes.status === 'fulfilled' && visitorsRes.value?.data?.success) {
        setVisitors(Array.isArray(visitorsRes.value.data.data) ? visitorsRes.value.data.data : []);
      } else {
        setVisitors([]);
      }

      if (infraRes.status === 'fulfilled' && infraRes.value?.data?.success) {
        setInfra(Array.isArray(infraRes.value.data.data) ? infraRes.value.data.data : []);
      } else {
        setInfra([]);
      }

      // 💡 [추가] 각 데이터의 길이를 측정하여 개수 상태에 저장
      if (storesRes.status === 'fulfilled' && storesRes.value?.data?.success) {
        setStoreCount(storesRes.value.data.data.length || 0);
      }
      if (menuRes.status === 'fulfilled' && menuRes.value?.data?.success) {
        setMenuCount(menuRes.value.data.data.length || 0);
      }
      if (popupsRes.status === 'fulfilled' && popupsRes.value?.data?.success) {
        setPopupCount(popupsRes.value.data.data.length || 0);
      }

    } catch (err) {
      console.error('Dashboard Load Error:', err);
      setStats(null);
      setVisitors([]);
      setInfra([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // 💡 [수정] 새로 가져온 개수 데이터(storeCount, menuCount, popupCount)를 매핑
  const counts = useMemo(
    () => ({
      franchise: stats?.counts?.franchise ?? 0,
      event: stats?.counts?.event ?? 0,
      voc: stats?.counts?.voc ?? 0,
      stores: storeCount,
      menu: menuCount,
      popup: popupCount,
    }),
    [stats, storeCount, menuCount, popupCount]
  );

  const visitorSummary = useMemo(() => {
    const totalVisitors = visitors.reduce((sum, item) => sum + Number(item.visitors || 0), 0);
    const totalPv = visitors.reduce((sum, item) => sum + Number(item.pv || 0), 0);
    const latest = visitors.length > 0 ? visitors[visitors.length - 1] : null;
    const prev = visitors.length > 1 ? visitors[visitors.length - 2] : null;

    //console.log("asd", visitorSummary);

    const diff = latest && prev
      ? Number(latest.visitors || 0) - Number(prev.visitors || 0)
      : 0;

    return {
      totalVisitors,
      totalPv,
      latestVisitors: latest ? Number(latest.visitors || 0) : 0,
      latestDate: latest?.date || '-',
      diff,
    };
  }, [visitors]);

  const infraSummary = useMemo(() => {
    const activeCount = infra.filter((item) => item.status === 'active').length;
    const warningCount = infra.filter((item) => item.status !== 'active').length;

    const highUsageCount = infra.filter((item) => {
      if (item.usage_percent === null || item.usage_percent === undefined) return false;
      return Number(item.usage_percent) >= 80;
    }).length;

    const domainDangerCount = infra.filter((item) => {
      if (item.d_day === null || item.d_day === undefined) return false;
      return Number(item.d_day) <= 30;
    }).length;

    return {
      activeCount,
      warningCount,
      highUsageCount,
      domainDangerCount,
    };
  }, [infra]);

  const quickMenus = [
    {
      title: '방문자 분석',
      desc: '최근 7일 방문자수 / 페이지뷰 확인',
      icon: '📈',
      path: '/admin/analytics/visitors',
    },
    {
      title: '인프라 현황',
      desc: '도메인, 리소스, 상태 점검',
      icon: '🖥️',
      path: '/admin/analytics/infra',
    },
    {
      title: '창업 문의',
      desc: '신규 문의 접수/관리',
      icon: '📩',
      path: '/admin/inquiry',
    },
    {
      title: '이벤트 관리',
      desc: '프로모션 등록 및 수정',
      icon: '🎁',
      path: '/admin/community/event',
    },
    {
      title: '공지사항',
      desc: '운영 공지 작성/관리',
      icon: '📢',
      path: '/admin/community/notice',
    },
    {
      title: '고객의 소리',
      desc: 'VOC 확인 및 대응',
      icon: '🗣️',
      path: '/admin/community/voice',
    },
    {
      title: '팝업 관리',
      desc: '메인 팝업 노출 제어',
      icon: '🪟',
      path: '/admin/popup',
    },
    {
      title: '매장 관리',
      desc: '매장 정보 및 노출 관리',
      icon: '🏪',
      path: '/admin/stores',
    },
  ];

  const overviewCards = [
    {
      label: '신규 창업 문의',
      value: `${counts.franchise}건`,
      icon: '📩',
      tone: 'primary',
      path: '/admin/inquiry',
    },
    {
      label: '미답변 고객의소리',
      value: `${counts.voc}건`,
      icon: '🚨',
      tone: 'danger',
      path: '/admin/community/voice',
    },
    {
      label: '진행 중 이벤트',
      value: `${counts.event}건`,
      icon: '🎁',
      tone: 'purple',
      path: '/admin/community/event',
    },
    {
      label: '등록된 매장',
      value: `${counts.stores}개`,
      icon: '🏪',
      tone: 'default',
      path: '/admin/stores',
    },
    {
      label: '메뉴',
      value: `${counts.menu}개`,
      icon: '☕',
      tone: 'default',
      path: '/admin/menu',
    },
    {
      label: '등록 팝업',
      value: `${counts.popup}개`,
      icon: '🪟',
      tone: 'default',
      path: '/admin/popup',
    },
  ];

  if (loading) {
    return <div className={styles.loading}>관리자 대시보드 데이터를 불러오는 중...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <section className={styles.heroSection}>
        <div>
          <p className={styles.heroEyebrow}>ADMIN DASHBOARD</p>
          <h2 className={styles.mainTitle}>LEEPRESSO 운영 현황</h2>
        </div>

        <div className={styles.heroActions}>
          <button
            className={styles.primaryBtn}
            onClick={() => router.push('/admin/inquiry')}
          >
            문의 관리
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => router.push('/admin/analytics/visitors')}
          >
            방문자 분석
          </button>
        </div>
      </section>

      <section className={styles.statsGrid}>
        {overviewCards.map((card) => (
          <div
            key={card.label}
            className={`${styles.statCard} ${styles[card.tone]}`}
            onClick={() => router.push(card.path)}
          >
            <div className={styles.statText}>
              <p>{card.label}</p>
              <h3>{card.value}</h3>
            </div>
            <div className={styles.statIcon}>{card.icon}</div>
          </div>
        ))}
      </section>

      <section className={styles.topGrid}>
        <div className={`${styles.panel} ${styles.emphasisPanel}`}>
          <div className={styles.panelHeader}>
            <div>
              <h3>최근 7일 접속자 통계</h3>
            </div>
            <button
              className={styles.inlineBtn}
              onClick={() => router.push('/admin/analytics/visitors')}
            >
              전체 보기
            </button>
          </div>

          <div className={styles.kpiRow}>
            <div className={styles.kpiBox}>
              <span>7일 방문자 합계</span>
              <strong>{visitorSummary.totalVisitors.toLocaleString()}</strong>
            </div>
            <div className={styles.kpiBox}>
              <span>7일 페이지뷰 합계</span>
              <strong>{visitorSummary.totalPv.toLocaleString()}</strong>
            </div>
            <div className={styles.kpiBox}>
              <span>사용자 마지막 접속일자</span>
              <strong>{visitorSummary.latestDate}</strong>
            </div>
            <div className={styles.kpiBox}>
              <span>전일 대비</span>
              <strong className={visitorSummary.diff >= 0 ? styles.up : styles.down}>
                {visitorSummary.diff >= 0 ? `+${visitorSummary.diff}` : visitorSummary.diff}
              </strong>
            </div>
          </div>

          <div className={styles.miniTable}>
            <div className={styles.miniHead}>
              <span>날짜</span>
              <span>방문자수</span>
              <span>페이지뷰</span>
            </div>

            {visitors.length > 0 ? (
              visitors.map((item) => (
                <div key={item.date} className={styles.miniRow}>
                  <span>{item.date}</span>
                  <span>{Number(item.visitors || 0).toLocaleString()}</span>
                  <span>{Number(item.pv || 0).toLocaleString()}</span>
                </div>
              ))
            ) : (
              <div className={styles.emptyBox}>방문자 데이터가 없습니다.</div>
            )}
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h3>인프라 상태 요약</h3>
              <p>서비스 상태와 점검 필요 항목 확인</p>
            </div>
            <button
              className={styles.inlineBtn}
              onClick={() => router.push('/admin/analytics/infra')}
            >
              상세 보기
            </button>
          </div>

          <div className={styles.alertGrid}>
            <div className={styles.alertCard}>
              <span>정상 서비스</span>
              <strong>{infraSummary.activeCount}개</strong>
            </div>
            <div className={styles.alertCard}>
              <span>주의 상태</span>
              <strong>{infraSummary.warningCount}개</strong>
            </div>
            <div className={styles.alertCard}>
              <span>리소스 80% 이상</span>
              <strong>{infraSummary.highUsageCount}개</strong>
            </div>
            <div className={styles.alertCard}>
              <span>도메인 30일 이내</span>
              <strong>{infraSummary.domainDangerCount}개</strong>
            </div>
          </div>

          <div className={styles.infraList}>
            {infra.length > 0 ? (
              infra.slice(0, 5).map((item) => (
                <div key={item.id} className={styles.infraRow}>
                  <div className={styles.infraLeft}>
                    <b>{item.service_name}</b>
                    <small>{item.target_url || '-'}</small>
                  </div>

                  <div className={styles.infraRight}>
                    {item.usage_percent !== null && item.usage_percent !== undefined ? (
                      <span
                        className={`${styles.statusChip} ${
                          Number(item.usage_percent) >= 80 ? styles.chipDanger : styles.chipSafe
                        }`}
                      >
                        {item.usage_percent}%
                      </span>
                    ) : (
                      <span
                        className={`${styles.statusChip} ${
                          item.d_day !== null && Number(item.d_day) <= 30
                            ? styles.chipDanger
                            : styles.chipSafe
                        }`}
                      >
                        {item.d_day !== null && item.d_day !== undefined ? `D-${item.d_day}` : '-'}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyBox}>인프라 데이터가 없습니다.</div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.bottomGrid}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h3>빠른 이동</h3>
              <p>관리 페이지로 바로 이동</p>
            </div>
          </div>

          <div className={styles.quickGrid}>
            {quickMenus.map((menu) => (
              <button
                key={menu.title}
                className={styles.quickCard}
                onClick={() => router.push(menu.path)}
              >
                <div className={styles.quickIcon}>{menu.icon}</div>
                <div className={styles.quickText}>
                  <strong>{menu.title}</strong>
                  <span>{menu.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h3>최근 창업 문의</h3>
              <p>최신 접수 문의를 바로 확인</p>
            </div>
            <button
              className={styles.inlineBtn}
              onClick={() => router.push('/admin/inquiry')}
            >
              전체 보기
            </button>
          </div>

          <div className={styles.inquiryList}>
            {stats?.recentFranchise && stats.recentFranchise.length > 0 ? (
              stats.recentFranchise.map((item) => (
                <div key={item.id} className={styles.inquiryRow}>
                  <div className={styles.inquiryLeft}>
                    <strong>{item.customer_name}님</strong>
                    <span>{item.hope_region ? `[${item.hope_region}] 창업 문의` : '창업 문의'}</span>
                  </div>
                  <small>{new Date(item.created_at).toLocaleDateString()}</small>
                </div>
              ))
            ) : (
              <div className={styles.emptyBox}>접수된 문의가 없습니다.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;