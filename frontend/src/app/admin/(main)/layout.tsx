import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminMainShell from './AdminMainShell';

// 💡 [필수] Vercel이 쿠키 상태를 캐싱하지 못하게 강제함
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminMainAuthLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  // 로그 확인용 (Vercel 로그에 찍힘)
  console.log('ADMIN_TOKEN_CHECK:', token?.value ? '존재함' : '없음');

  if (!token || !token.value) {
    // 쿠키가 없으면 로그인 페이지로 멱살 잡고 끌고 감
    redirect('/admin/login');
  }

  return <AdminMainShell>{children}</AdminMainShell>;
}