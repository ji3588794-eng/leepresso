import './globals.css';
import type { Metadata, Viewport } from 'next';

// 💡 하드코딩된 사이트 정보 설정
const SITE_INFO = {
  title: '리프레소(LEEPRESSO) | 본질에 집중한 프리미엄 무인카페',
  description: '20년 노하우의 무인카페 창업 파트너 리프레소. 최저 비용, 인건비 0원, 압도적 상권 분석으로 안정적인 수익을 제안합니다.',
  keywords: '리프레소, 무인카페, 무인카페창업, 카페창업, 커피프랜차이즈, 소자본창업, 무인매장관리',
  url: 'https://leepresso.com',
  ogImage: '/og-image.png',
};

// 💡 브라우저 테마 및 반응형 설정
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3E3232', // 리프레소 메인 브라운 컬러
};

// 💡 검색엔진 최적화(SEO) 상세 설정
export const metadata: Metadata = {
  // 1. 기본 텍스트 정보
  title: {
    default: SITE_INFO.title,
    template: `%s | ${SITE_INFO.title}`,
  },
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  
  // 2. 검색엔진 로봇 제어
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },

  // 3. 중복 주소 방지 (Canonical URL)
  alternates: {
    canonical: SITE_INFO.url,
  },

  // 4. 소셜 공유 메타데이터 (카톡, 페이스북 등)
  openGraph: {
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    url: SITE_INFO.url,
    siteName: '리프레소',
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: '리프레소 무인카페 창업 안내',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },

  // 5. 트위터(X) 공유 카드
  twitter: {
    card: 'summary_large_image',
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    images: [SITE_INFO.ogImage],
  },

  // 6. 파비콘 및 사과 아이콘 (public 폴더 기준)
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // 7. 기타 언어 및 형식 정보
  category: 'business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}