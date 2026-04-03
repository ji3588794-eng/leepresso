import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminMainShell from './AdminMainShell';

// 💡 실서버 캐시 쌩까고 매번 새로 읽기
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminMainAuthLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  // 💡 실서버 로그 확인용 (터미널에 찍힘)
  console.log('--- Auth Check ---');
  console.log('Token object:', token);
  console.log('Token value:', token?.value);
  
  // 토큰 없으면 컷
  if (!token || !token.value) {
    redirect('/admin/login');
  }

  return <AdminMainShell>{children}</AdminMainShell>;
}