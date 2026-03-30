import "./globals.css";
import type { Metadata, Viewport } from "next";

// 💡 하드코딩된 사이트 정보 설정
const SITE_INFO = {
  // 💡 제목을 40자 이내로 줄여 네이버 경고 해결 및 가독성 확보
  title: "리프레소 | 본질에 집중한 프리미엄 무인카페 창업",
  description:
    "20년 노하우의 무인카페 창업 파트너 리프레소. 최저 비용, 인건비 0원, 압도적 상권 분석으로 안정적인 수익을 제안합니다.",
  keywords: "리프레소, 무인카페, 무인카페창업, 카페창업, 커피프랜차이즈, 소자본창업, 무인매장관리",
  url: "https://leepresso.com",
  ogImage: "/og-image.png",
};

// 💡 브라우저 테마 및 반응형 설정
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3E3232", // 리프레소 메인 브라운 컬러
};

// 💡 검색엔진 최적화(SEO) 상세 설정
export const metadata: Metadata = {
  // 💡 metadataBase 추가: sitemap 및 OG 이미지의 절대 경로를 보장합니다.
  metadataBase: new URL(SITE_INFO.url),
  title: {
    default: SITE_INFO.title,
    template: `%s | 리프레소`,
  },
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  alternates: {
    canonical: "/", // 중복 주소 방지
  },

  openGraph: {
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    url: SITE_INFO.url,
    siteName: "리프레소",
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: "리프레소 무인카페 창업 안내",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    images: [SITE_INFO.ogImage],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  verification: {
    google: "UID2R0MPFk0L-ub0jkyLBTG_k6blaXLOiAWBZROnaIY",
    // 💡 네이버 서치어드바이저용 (필요시 아래 주석 해제 후 코드 삽입)
    // other: {
    //   "naver-site-verification": "여기에_네이버_인증코드_입력",
    // },
  },

  category: "business",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 💡 구글 서브메뉴(Sitelinks) 노출을 위한 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "리프레소(LEEPRESSO)",
    "url": SITE_INFO.url,
    "logo": "https://leepresso.com/images/common/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "1522-0290",
      "contactType": "customer service"
    },
    "hasPart": [
      { "@type": "WebPage", "name": "브랜드 스토리", "url": `${SITE_INFO.url}/brand` },
      { "@type": "WebPage", "name": "메뉴 소개", "url": `${SITE_INFO.url}/menu` },
      { "@type": "WebPage", "name": "창업 안내", "url": `${SITE_INFO.url}/franchise` },
      { "@type": "WebPage", "name": "매장 찾기", "url": `${SITE_INFO.url}/store` },
      { "@type": "WebPage", "name": "창업 문의", "url": `${SITE_INFO.url}/contact` }
    ]
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}