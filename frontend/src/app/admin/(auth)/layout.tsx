import { cookies } from 'next/headers';

export default async function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 별도의 복잡한 로직 없이 하위 레이아웃으로 전달합니다.
  return <>{children}</>;
}