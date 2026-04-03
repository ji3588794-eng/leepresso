import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminMainShell from './AdminMainShell';

// 💡 실서버 쿠키 캐싱 방지
export const dynamic = 'force-dynamic';

export default async function AdminMainAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  // 토큰 없으면 로그인 페이지로 튕겨내기
  if (!token || !token.value) {
    redirect('/admin/login');
  }

  // 로그인 성공했을 때만 사이드바(AdminMainShell) 보여주기
  return <AdminMainShell>{children}</AdminMainShell>;
}