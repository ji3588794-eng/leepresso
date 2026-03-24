import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 살려둬야 할 메뉴 (유저용)
  const allowedPaths = [
    '/',
    '/menu',
    '/brand',
    '/franchise',
    '/store',
    '/community',
  ];

  // 2. 통과 조건 (리다이렉트 안 함)
  if (
    pathname.startsWith('/_next') ||   // Next.js 빌드 자원
    pathname.startsWith('/api') ||     // API
    pathname.startsWith('/admin') ||   // 관리자 (기존 요청대로 제외)
    pathname.includes('.') ||          // 이미지/파비콘 등 파일
    allowedPaths.includes(pathname)    // 정의된 메뉴
  ) {
    return NextResponse.next();
  }

  // 3. 나머지 모든 엉뚱한 경로는 메인('/')으로 301 영구 이동
  return NextResponse.redirect(new URL('/', request.url), 301);
}

export const config = {
  matcher: [
    /*
     * 아래 경로들을 제외한 모든 요청에 미들웨어 적용:
     * - api, _next/static, _next/image, favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};