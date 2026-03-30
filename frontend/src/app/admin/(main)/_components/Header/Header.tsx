'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api, { getImageUrl } from '@/app/lib/api';
import styles from './Header.module.scss';
import { Clock, ExternalLink, LogOut, User } from 'lucide-react'; 

// 💡 AdminMainShell에서 던져주는 title을 받기 위한 인터페이스 추가
interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // 로그인한 유저 정보 상태
  const [adminInfo, setAdminInfo] = useState({
    name: '관리자',
  });

  useEffect(() => {
    // 1. 시계 타이머
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 2. 접속자 정보 가져오기 (localStorage나 API 활용)
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setAdminInfo({
          name: parsed.name || '관리자',
        });
      } catch (e) {
        console.error("유저 정보 파싱 에러", e);
      }
    }

    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await api.post('/admin/logout');
      if (res.data.success) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/admin/login';
      }
    } catch (err) {
      console.error('로그아웃 실패:', err);
      window.location.href = '/admin/login';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    const ymd = date.toLocaleDateString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
    }).replace(/\. /g, '-').replace(/\./g, '');
    const dayName = date.toLocaleDateString('ko-KR', { weekday: 'short' });
    return `${ymd} (${dayName})`;
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {/* 💡 여기에 TITLE_MAP에서 번역된 한글 타이틀이 찍힙니다 */}
        <div className={styles.pageTitle}>
          <h2>{title}</h2>
        </div>
        
        <div className={styles.clockWrapper}>
          <Clock size={16} className={styles.icon} />
          <span className={styles.dateText}>{formatDate(currentTime)}</span>
          <span className={styles.timeText}>{formatTime(currentTime)}</span>
        </div>
      </div>

      <div className={styles.userMenu}>
        <a href="/" target="_blank" rel="noopener noreferrer" className={styles.serviceBtn}>
          <ExternalLink size={15} />
          <span>서비스 바로가기</span>
        </a>

        <div className={styles.verticalDivider} />

        <div className={styles.userInfo}>
          <div className={styles.avatarCircle}>
            <User size={16} />
          </div>
          <div className={styles.adminDetails}>
            <span className={styles.adminName}>{adminInfo.name}님</span>
          </div>
        </div>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={15} />
          <span>로그아웃</span>
        </button>
      </div>
    </header>
  );
}