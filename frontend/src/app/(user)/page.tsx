'use client';

import { useRouter } from "next/navigation";

export default function GatePage() {
  const router = useRouter();

  return (
    <div className="relative w-full h-[100dvh] flex flex-col md:flex-row overflow-hidden bg-[#0A0A0A] font-sans">
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .bg-gate-brand {
          background-image: url('/gate-brand.png');
          background-size: cover;
          background-position: center;
        }
        .bg-gate-franchise {
          background-image: url('/gate-franchise.png');
          background-size: cover;
          background-position: center;
        }
        .paper-texture {
          background-image: url("https://www.transparenttextures.com/patterns/stardust.png");
        }
      `}</style>
      
      {/* 1. BRAND SIDE */}
      <div 
        onClick={() => router.push('/brand')}
        className="relative flex-1 group cursor-pointer overflow-hidden transition-all duration-1000 bg-gate-brand"
      >
        {/* 왼쪽: 확실히 더 밝게 */}
        <div className="absolute inset-0 group-hover:bg-black/18 transition-all duration-700 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45 z-10" />
        
        <div className="relative h-full flex items-center justify-center p-8 z-20">
          <div className="relative flex flex-col items-center max-w-[320px] w-full pt-16 pb-20 px-8 transition-transform duration-700 group-hover:scale-[1.02]">
            
            <div className="w-12 h-[1px] bg-white/70 mb-10" />
            
            <span className="block text-white/85 font-medium tracking-[0.5em] mb-4 text-[10px] uppercase drop-shadow-md">
              BRAND STORY
            </span>
            
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 tracking-tight font-medium drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
              브랜드 소개.
            </h2>

            <p className="text-white/90 text-[13px] leading-relaxed text-center font-normal tracking-wide break-keep drop-shadow-md">
              리프레소만의 깊은 철학과<br/>
              시간이 빚어낸 공간의 기록.
            </p>

            <div className="absolute -bottom-6 -right-6 flex items-center justify-center">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="absolute w-full h-full animate-spin-slow opacity-65" viewBox="0 0 100 100">
                  <path id="circlePath1" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                  <text className="fill-white text-[5.2px] font-light uppercase tracking-[0.3em]">
                    <textPath href="#circlePath1">LEEPRESSO COFFEE • LEEPRESSO COFFEE • LEEPRESSO COFFEE •</textPath>
                  </text>
                </svg>
                <div className="w-11 h-11 bg-white/24 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/35 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-2xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white group-hover:text-black transition-colors duration-500">
                    <path d="M5 12h14m-4-4 4 4-4 4"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* 왼쪽 글라스박스도 조금 더 또렷하게 */}
            <div className="absolute inset-0 bg-black/12 backdrop-blur-[10px] border border-white/30 -z-10 paper-texture shadow-[0_0_50px_rgba(0,0,0,0.35)]" />
          </div>
        </div>
      </div>

      {/* 2. FRANCHISE SIDE */}
      <div 
        onClick={() => router.push('/franchise')}
        className="relative flex-1 group cursor-pointer overflow-hidden transition-all duration-1000 border-t md:border-t-0 md:border-l border-white/10 bg-gate-franchise"
      >
        {/* 오른쪽: 조금만 덜 어둡게 */}
        <div className="absolute inset-0 bg-black/32 group-hover:bg-black/18 transition-all duration-700 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/42 via-transparent to-black/52 z-10" />
        
        <div className="relative h-full flex items-center justify-center p-8 z-20">
          <div className="relative flex flex-col items-center max-w-[320px] w-full pt-16 pb-20 px-8 transition-transform duration-700 group-hover:scale-[1.02]">
            
            <div className="w-12 h-[1px] bg-white/50 mb-10" />
            
            <span className="block text-white/72 font-light tracking-[0.5em] mb-4 text-[10px] uppercase">
              Partnership
            </span>
            
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 tracking-tight font-medium">
              창업 문의
            </h2>

            <p className="text-white/78 text-[13px] leading-relaxed text-center font-light tracking-wide break-keep">
              함께 성장하는 비즈니스를 위한<br/>
              리프레소의 성공 파트너십.
            </p>

            <div className="absolute -bottom-6 -right-6 flex items-center justify-center">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="absolute w-full h-full animate-spin-slow opacity-45" viewBox="0 0 100 100">
                  <path id="circlePath2" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                  <text className="fill-white text-[5.2px] font-light uppercase tracking-[0.3em]">
                    <textPath href="#circlePath2">LEEPRESSO COFFEE • LEEPRESSO COFFEE • LEEPRESSO COFFEE •</textPath>
                  </text>
                </svg>
                <div className="w-11 h-11 bg-white/12 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/22 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-2xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white group-hover:text-black transition-colors duration-500">
                    <path d="M5 12h14m-4-4 4 4-4 4"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-white/[0.05] backdrop-blur-[5px] border border-white/12 -z-10 paper-texture shadow-[0_0_40px_rgba(0,0,0,0.25)]" />
          </div>
        </div>
      </div>
    </div>
  );
}