import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminMainShell from './AdminMainShell';

// 💡 함수 이름을 AdminMainAuthLayout으로 변경!
export default async function AdminMainAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  // 토큰 없으면 로그인으로 튕겨내기
  if (!token) {
    redirect('/admin/login');
  }

  // 로그인 성공했을 때만 사이드바(AdminMainShell) 보여주기
  return <AdminMainShell>{children}</AdminMainShell>;
}