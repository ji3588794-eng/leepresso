import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) 무조건 통과시킬 경로
  if (
    pathname === '/' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname === '/favicon.ico' ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2) 사용자 페이지 허용 prefix
  const allowedPrefixes = [
    '/brand',
    '/menu',
    '/franchise',
    '/store',
    '/community',
  ];

  const isAllowed = allowedPrefixes.some((prefix) => {
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });

  if (isAllowed) {
    return NextResponse.next();
  }

  // 3) 나머지는 홈으로 임시 이동
  const url = request.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};