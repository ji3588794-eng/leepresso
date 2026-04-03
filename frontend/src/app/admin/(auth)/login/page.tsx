'use client';

import { useState } from 'react';
import styles from './login.module.scss';
import api from '@/app/lib/api';

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. 로그인 API 호출 (여기서 서버가 쿠키를 구워줘야 함)
      const res = await api.post('/admin/login', formData);

      if (res.data.success) {
        // 💡 중요: 
        // 1) window.location.replace를 사용하면 뒤로가기로 다시 로그인 창에 오는 걸 방지합니다.
        // 2) 토큰이 쿠키에 저장된 직후 Next.js 서버 컴포넌트가 이를 인식할 수 있게 새로고침하며 이동합니다.
        window.location.assign('/admin/dashboard');
      } else {
        alert(res.data.message || '로그인 정보를 확인해주세요.');
      }

    } catch (err: any) {
      console.error('로그인 에러:', err);
      const errorMsg = err.response?.data?.message || '로그인 중 오류가 발생했습니다.';
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h1>LEEPRESSO ADMIN</h1>
        <p>관리자 계정으로 로그인하세요.</p>

        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="아이디"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}