import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

// 💡 함수 이름을 AdminRootLayout으로 변경!
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-base-wrapper">
      {/* 여기엔 사이드바 넣지 마라. 로그인 화면에서도 나오면 안 되니까. */}
      {children}
    </div>
  );
}