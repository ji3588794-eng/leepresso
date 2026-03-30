import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'], // 관리자 및 API 경로는 수집 제외
    },
    sitemap: 'https://leepresso.com/sitemap.xml',
  };
}