'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminMainShell from './AdminMainShell';
import api from '../../lib/api';

export default function AdminMainAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 서버 쿠키 기반 로그인 확인
        await api.get('/admin/me');
        setReady(true);
      } catch (error) {
        router.replace('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  if (!ready) return null;

  return <AdminMainShell>{children}</AdminMainShell>;
}