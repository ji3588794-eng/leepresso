import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) 무조건 통과시킬 경로 (정적 파일, API, 실제 존재하는 유효한 페이지들)
  // /admin을 여기에 두면 관리자 페이지는 리다이렉트 대상에서 제외되어 정상 접속됩니다.
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

  // 2) 새로 만든 홈페이지의 정상적인 메뉴 prefix
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

  /**
   * 3) 해킹된 페이지 등 정의되지 않은 모든 경로는 홈으로 영구 이동(301)
   * SEO 점수를 메인으로 넘기고 검색 결과에서 구 페이지를 제거하기 위함입니다.
   */
  const url = request.nextUrl.clone();
  url.pathname = '/';
  
  // { status: 301 }을 추가하여 영구 이동임을 명시합니다.
  return NextResponse.redirect(url, 301);
}

export const config = {
  // 미들웨어가 실행될 경로 설정 (정적 리소스 제외)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};