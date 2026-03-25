'use client';

import { usePathname } from 'next/navigation';
import styles from './layout.module.scss';
import Sidebar from '@/app/admin/(main)/_components/Sidebar/Sidebar';
import Header from '@/app/admin/(main)/_components/Header/Header';

// 💡 관리자 페이지 경로별 타이틀 매핑 (유지보수 효율화)
const TITLE_MAP: Record<string, string> = {
  '/admin/dashboard': '대시보드',
  '/admin/popup': '팝업 관리',
  '/admin/menu': '메뉴 관리',
  '/admin/stores': '매장 관리',
  '/admin/community/notice': '공지사항 관리',
  '/admin/community/event': '이벤트 관리',
  '/admin/community/voice': '고객의 소리 관리',
  '/admin/inquiry': '창업 문의 관리',
  '/admin/analytics/visitors': '방문자 통계 분석',
  '/admin/analytics/infra': '인프라 및 서버 상태',
  '/admin/settings/admin': '관리자 페이지 설정',
  '/admin/settings/seo': 'SEO 및 검색 최적화',
  '/admin/settings': '전체 설정',
};

export default function AdminMainShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  /**
   * @description 현재 경로에 맞는 타이틀을 반환하는 로직
   */
  const getTitle = (currentPath: string) => {
    // 1. 완전 일치하는 경우 (예: /admin/dashboard)
    if (TITLE_MAP[currentPath]) return TITLE_MAP[currentPath];

    // 2. 부분 일치 확인 (하위 경로가 있는 경우 긴 경로 우선 매칭)
    const sortedKeys = Object.keys(TITLE_MAP).sort((a, b) => b.length - a.length);
    const matchedKey = sortedKeys.find((key) => currentPath.startsWith(key));

    return matchedKey ? TITLE_MAP[matchedKey] : '관리자 센터';
  };

  return (
    <div className={styles.adminWrapper}>
      {/* 1. 좌측 고정 사이드바 (통계/인프라 메뉴 포함됨) */}
      <Sidebar />
      
      <div className={styles.mainContainer}>
        {/* 2. 상단 헤더 (title props 전달 필수) */}
        <Header title={getTitle(pathname)} />
        
        {/* 3. 실제 페이지 내용 (children) */}
        <main className={styles.content}>
          {children}
        </main>
        
        {/* 4. 하단 정보 */}
        <footer className={styles.footer}>
          <p>&copy; 2026 LEEPRESSO Admin Project. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}