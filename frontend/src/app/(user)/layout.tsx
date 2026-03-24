import type { Metadata } from 'next';
import Script from 'next/script';
import ScrollToTop from './components/common/ScrollToTop';

export const metadata: Metadata = {
  title: '리프레소(LEEPRESSO)',
  description: '본질에 집중한, 가장 깊은 한 잔',
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 전역 스크롤 관리 컴포넌트 */}
      <ScrollToTop />
      
      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=8bd27324dc0941a38a2738016ea94e4b&libraries=services&autoload=false"
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}