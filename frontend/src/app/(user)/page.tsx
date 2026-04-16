'use client';

import { useRouter } from 'next/navigation';

const gateItems = [
  {
    key: 'brand',
    eyebrow: 'Brand',
    title: ['LEEPRESSO', '브랜드 소개'],
    subtitle: '브랜드 스토리',
    desc: '리프레소의 브랜드 철학과 시그니처 메뉴,\n매장 소식과 다양한 콘텐츠를 만나보세요.',
    button: '브랜드 보기',
    href: '/brand',
    bgClass: 'bg-gate-brand',
    align: 'left',
  },
  {
    key: 'franchise',
    eyebrow: 'Franchise',
    title: ['LEEPRESSO', '프랜차이즈'],
    subtitle: '창업 안내',
    desc: '안정적인 운영 구조와 체계적인 개설 프로세스,\n리프레소만의 창업 경쟁력을 확인해보세요.',
    button: '창업 안내 보기',
    href: '/franchise',
    bgClass: 'bg-gate-franchise',
    align: 'right',
  },
];

export default function GatePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#0b0b0b] text-white" style={{ fontFamily: '"GmarketSans", sans-serif' }}>
      <style jsx global>{`
        @font-face {
          font-family: 'GmarketSans';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff') format('woff');
          font-weight: 300;
          font-style: normal;
        }
        @font-face {
          font-family: 'GmarketSans';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
          font-weight: 500;
          font-style: normal;
        }
        @font-face {
          font-family: 'GmarketSans';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff') format('woff');
          font-weight: 700;
          font-style: normal;
        }

        .bg-gate-brand {
          background-image: url('/gate-brand.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .bg-gate-franchise {
          background-image: url('/gate-franchise.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate-slow {
          animation: rotate-slow 25s linear infinite;
        }
      `}</style>

      {/* 상단 조명 효과 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_50%)] pointer-events-none z-20" />

      <div className="relative grid min-h-[100dvh] grid-cols-1 md:grid-cols-2 z-10">
        {gateItems.map((item, idx) => (
          <section
            key={item.key}
            onClick={() => router.push(item.href)}
            className={[
              'group relative isolate cursor-pointer overflow-hidden transition-all duration-700',
              'min-h-[50dvh] md:min-h-[100dvh] flex flex-col justify-center', // 모바일에서 중앙 정렬 보장
              idx === 1 ? 'border-t border-white/10 md:border-t-0 md:border-l' : '',
              'border-white/10',
            ].join(' ')}
          >
            {/* 배경 이미지 Zoom */}
            <div className={[
                'absolute inset-0 scale-[1.01] transition-transform duration-[2000ms] ease-out group-hover:scale-[1.05] -z-30',
                item.bgClass
            ].join(' ')} />

            {/* 오버레이 필터 (모바일에서는 가독성을 위해 불투명도 약간 상향) */}
            {item.key === 'brand' ? (
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,9,5,0.96)_0%,rgba(12,9,5,0.85)_35%,rgba(12,9,5,0.3)_70%,rgba(12,9,5,0.15)_100%)] md:opacity-100 opacity-90 transition-opacity duration-700 group-hover:opacity-75 -z-20" />
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.92)_0%,rgba(8,8,8,0.7)_35%,rgba(8,8,8,0.7)_70%,rgba(8,8,8,0.98)_100%)] md:opacity-100 opacity-90 transition-opacity duration-700 group-hover:opacity-85 -z-20" />
            )}
            
            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_25%)] -z-20" />

            {/* 메인 텍스트 영역 */}
            <div className="relative h-full flex items-center z-10">
              <div
                className={[
                  'w-full px-6 py-12 sm:px-12 md:px-16 lg:px-28', // 모바일 여백 최적화
                  item.align === 'right' ? 'md:pl-24 lg:pl-32' : '',
                ].join(' ')}
              >
                <div className="max-w-[560px]">
                  {/* Eyebrow */}
                  <div className="mb-6 md:mb-10 flex items-center gap-3 md:gap-4">
                    <span className="h-[1px] md:h-[2px] w-8 md:w-13 bg-[#c9a46a]" />
                    <span className="text-[10px] md:text-[12px] font-medium uppercase tracking-[0.35em] text-[#e7d5b5]">
                      {item.eyebrow}
                    </span>
                  </div>

                  {/* Title (반응형 폰트 크기 대폭 수정) */}
                  <h1 className="text-[32px] xs:text-[38px] sm:text-[48px] md:text-[60px] lg:text-[63px] font-bold leading-[1.2] md:leading-[1.1] tracking-[0.02em] text-white mb-6 md:mb-10">
                    {item.title[0]}
                    <br />
                    <span className="text-[#d7b07a]">{item.title[1]}</span>
                  </h1>

                  {/* Subtitle & Desc */}
                  <div className="space-y-4 md:space-y-6">
                    <h2 className="text-[20px] md:text-[34px] font-bold tracking-[-0.02em] text-white">
                      {item.subtitle}
                    </h2>
                    <p className="whitespace-pre-line break-keep text-[14px] xs:text-[15px] md:text-[19px] leading-[1.6] md:leading-[1.8] font-light text-white/80">
                      {item.desc}
                    </p>
                  </div>

                  {/* 버튼 영역 */}
                  <div className="mt-8 md:mt-14">
                    <div className="inline-flex items-center justify-center rounded-full border-2 border-[#d7b07a]/60 bg-[linear-gradient(180deg,rgba(215,176,122,0.25)_0%,rgba(215,176,122,0.12)_100%)] px-8 md:px-12 py-2.5 md:py-3 backdrop-blur-[4px]">
                      <span className="flex items-center text-[14px] md:text-[16px] font-bold tracking-[0.05em] text-[#f7ead5] leading-none mt-0.5">
                        {item.button}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 md:h-48 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_100%)] -z-10" />

            {/* 회전 엠블럼 (모바일에서 크기 축소 및 위치 조정) */}
            <div className="absolute right-6 bottom-6 md:right-12 md:bottom-12 z-20 scale-75 md:scale-100">
              <div className="relative flex items-center justify-center h-24 w-24 md:h-36 md:w-36 rounded-full backdrop-blur-md border border-white/10 bg-black/20 shadow-2xl">
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full animate-rotate-slow opacity-60"
                >
                  <defs>
                    <path
                      id="textCircle"
                      d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    />
                  </defs>
                  <text
                    className="text-[4.5px] font-bold uppercase tracking-[0.25em] fill-white"
                  >
                    <textPath xlinkHref="#textCircle" startOffset="0%">
                      LEEPRESSO COFFEE • LEEPRESSO COFFEE • LEEPRESSO COFFEE •
                    </textPath>
                  </text>
                </svg>
                <div className="relative flex items-center justify-center h-10 w-10 md:h-14 md:w-14 rounded-full border-2 border-[#d7b07a]/30 bg-black/40 shadow-inner">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-[#d7b07a] md:w-[22px] md:h-[22px]"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* 중앙 구분선 (모바일 hidden 처리 유지) */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.2)_20%,rgba(255,255,255,0.2)_80%,rgba(255,255,255,0)_100%)] z-20" />

      {/* 상단 로고 (모바일에서 크기 살짝 조정) */}
      <div className="pointer-events-none absolute left-6 top-6 md:left-8 md:top-8 z-30 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full border-2 border-white/20 bg-black/40 text-[14px] md:text-[18px] font-bold text-white backdrop-blur-xl shadow-2xl">
        N
      </div>
    </div>
  );
}