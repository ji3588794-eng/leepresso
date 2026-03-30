import Script from 'next/script';
import ScrollToTop from './components/common/ScrollToTop';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 전역 스크롤 관리 */}
      <ScrollToTop />
      
      {/* 카카오맵 SDK */}
      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=8bd27324dc0941a38a2738016ea94e4b&libraries=services&autoload=false"
        strategy="beforeInteractive"
      />
      
      {children}
    </>
  );
}