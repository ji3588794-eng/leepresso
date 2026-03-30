import "./globals.css";
import type { Metadata, Viewport } from "next";

// 💡 하드코딩된 사이트 정보 설정
const SITE_INFO = {
  title: "리프레소(LEEPRESSO) | 본질에 집중한 프리미엄 무인카페",
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
  title: {
    default: SITE_INFO.title,
    template: `%s | ${SITE_INFO.title}`,
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
    canonical: SITE_INFO.url,
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
    "logo": "https://leepresso.com/images/common/logo.png", // 💡 원래 있던 로고 경로입니다.
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "1522-0290", // 💡 리프레소 공식 대표번호입니다.
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