import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://leepresso.com';
  const lastModified = new Date().toISOString();

  // 중요도(priority)를 세밀하게 조정하여 구글이 서브메뉴를 판단하기 쉽게 합니다.
  return [
    { url: baseUrl, lastModified, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/brand`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/menu`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/franchise`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/store`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ];
}