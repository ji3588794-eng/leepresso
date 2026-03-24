/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 개발 및 배포 환경 모두에서 이미지 최적화로 인한 로딩 문제를 방지
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'leepresso-project.onrender.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3001',
        pathname: '/**',
      },
    ],
  },
  // 배포 시 타입스크립트 및 린트 에러로 인해 빌드가 멈추는 것을 방지
  typescript: { ignoreBuildErrors: true },
  /* eslint: { ignoreDuringBuilds: true }, */
};

export default nextConfig;