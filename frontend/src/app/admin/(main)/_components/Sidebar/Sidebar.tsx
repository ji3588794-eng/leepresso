'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Sidebar.module.scss';
import { ChevronDown } from 'lucide-react';
import api, { getImageUrl } from '@/app/lib/api';

const MENU_ITEMS = [
  { name: '대시보드', path: '/admin/dashboard' },
  { name: '팝업 관리', path: '/admin/popup' },
  { name: '메뉴 관리', path: '/admin/menu' },
  { name: '매장 관리', path: '/admin/stores' },
  {
    name: '커뮤니티 관리',
    path: '/admin/community',
    sub: [
      { name: '공지사항', path: '/admin/community/notice' },
      { name: '이벤트', path: '/admin/community/event' },
      { name: '고객의 소리', path: '/admin/community/voice' },
    ],
  },
  { name: '창업 문의', path: '/admin/inquiry' },
  {
    name: '시스템 통계',
    path: '/admin/analytics',
    sub: [
      { name: '방문자 통계', path: '/admin/analytics/visitors' }, 
      { name: '인프라/서버 관리', path: '/admin/analytics/infra' }, 
    ],
  },
  { 
    name: '전체 설정', 
    path: '/admin/settings',
    sub: [
      { name: '관리자페이지 설정', path: '/admin/settings/admin' },
      { name: 'SEO 설정', path: '/admin/settings/seo' },
    ]
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  
  // 로고 및 사이트명 상태 관리
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [siteName, setSiteName] = useState<string>(''); 

  // 마운트 시 설정(settings)을 불러와 로고와 사이트명 세팅
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/admin/settings');
        if (res.data.success) {
          const { site_logo, site_name } = res.data.data;
          
          // ✅ 수정: getImageUrl을 사용하여 Cloudinary/로컬 경로 자동 판별
          if (site_logo) {
            setLogoUrl(getImageUrl(site_logo));
          }
          
          // site_name 세팅 (없으면 기본값 'ADMIN')
          setSiteName(site_name || 'ADMIN');
        }
      } catch (err) {
        console.error('사이드바 설정 로딩 실패', err);
      }
    };
    fetchSettings();
  }, []);

  const isActiveMenu = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <aside className={styles.sidebar}>
      {/* 로고 영역: 로고 이미지 우선, 없을 시 siteName 텍스트 출력 */}
      <div
        className={styles.logo}
        onClick={() => router.push('/admin/dashboard')}
      >
        {logoUrl ? (
          <img src={logoUrl} alt={`${siteName} LOGO`} className={styles.logoImg} />
        ) : (
          <>
            {siteName} <span>ADMIN</span>
          </>
        )}
      </div>

      <nav className={styles.nav}>
        <ul>
          {MENU_ITEMS.map((item) => {
            const isActive = isActiveMenu(item.path);
            const hasSub = item.sub && item.sub.length > 0;

            return (
              <li key={item.path} className={styles.menuItemWrap}>
                <div
                  className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
                  onClick={() => {
                    if (hasSub) {
                      router.push(item.sub![0].path);
                    } else {
                      router.push(item.path);
                    }
                  }}
                >
                  <span>{item.name}</span>
                  {hasSub && (
                    <ChevronDown 
                      size={16} 
                      className={`${styles.arrow} ${isActive ? styles.rotated : ''}`} 
                    />
                  )}
                </div>

                {hasSub && isActive && (
                  <ul className={styles.subMenu}>
                    {item.sub!.map((sub) => {
                      const isSubActive = pathname === sub.path;

                      return (
                        <li
                          key={sub.path}
                          className={`${styles.subMenuItem} ${
                            isSubActive ? styles.subActive : ''
                          }`}
                          onClick={(e) => {
                            e.stopPropagation(); 
                            router.push(sub.path);
                          }}
                        >
                          {sub.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}