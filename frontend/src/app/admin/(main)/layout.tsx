import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminMainShell from './AdminMainShell';

export default async function AdminMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 💡 [복구] 인증 체크 활성화
  // 관리자 페이지에 접근할 때 'admin_token' 쿠키가 있는지 확인합니다.
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  // 토큰이 없으면(로그아웃 상태 등) 로그인 페이지로 리다이렉트
  if (!token) {
    redirect('/admin/login');
  }

  // 토큰이 있을 때만 관리자 쉘(사이드바, 헤더 등)을 렌더링합니다.
  return <AdminMainShell>{children}</AdminMainShell>;
}