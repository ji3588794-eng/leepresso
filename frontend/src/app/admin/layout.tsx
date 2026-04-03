import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-base-wrapper">
      {/* 로그인 페이지도 이 레이아웃을 타니까 사이드바는 절대 넣지 마라 */}
      {children}
    </div>
  );
}