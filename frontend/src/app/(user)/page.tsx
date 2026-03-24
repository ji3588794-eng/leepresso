'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GatePage() {
  const router = useRouter();

  return (
    <div className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden bg-[#F9F5F0] font-sans">
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .bg-grain {
          background-image: url("https://www.transparenttextures.com/patterns/p6-mini.png");
        }
        /* 배경 이미지 가독성을 위한 유틸리티 */
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
      `}</style>

      {/* 전체 배경 종이 질감 레이어 */}
      <div className="absolute inset-0 bg-grain opacity-[0.1] pointer-events-none z-50" />
      
      {/* 1. BRAND SIDE (좌측) */}
      <div 
        onClick={() => router.push('/brand')}
        className="relative flex-1 group cursor-pointer overflow-hidden transition-all duration-700 ease-in-out hover:flex-[1.2] bg-gate-brand"
      >
        {/* 전체 오버레이: 밝기 추가 향상 (bg-black/15) */}
        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-700" />
        
        {/* 하단 그라데이션: 어두운 정도를 크게 완화 (to-black/70 -> to-black/40) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/40 pointer-events-none" />

        <div className="relative h-full flex flex-col items-center justify-center p-12 text-center z-20">
          <span className="text-white font-bold tracking-[0.4em] mb-2 text-[13px] uppercase drop-shadow-md">
            Since 2026
          </span>
          
          <h2 className="inline-block text-5xl md:text-6xl font-black text-white mb-10 leading-tight border-b-1 border-white/30 pb-3 transition-colors group-hover:border-white drop-shadow-lg">
            브랜드 소개
          </h2>

          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <defs>
                <path id="circlePath1" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-white text-[5.4px] font-bold uppercase" style={{ letterSpacing: '0.24em' }}>
                <textPath href="#circlePath1">
                  LEEPRESSO COFFEE • LEEPRESSO COFFEE • LEEPRESSO COFFEE •
                </textPath>
              </text>
            </svg>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-500 hover:bg-[#3E3232] hover:scale-110 z-30">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8D7B68" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12H19M19 12L13 6M19 12L13 18"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FRANCHISE SIDE (우측) */}
      <div 
        onClick={() => router.push('/franchise')}
        className="relative flex-1 group cursor-pointer overflow-hidden transition-all duration-700 ease-in-out hover:flex-[1.2] border-t md:border-t-0 md:border-l border-[#3E3232]/5 bg-gate-franchise"
      >
        {/* 전체 오버레이: 밝기 추가 향상 (bg-black/15) */}
        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-700" />
        
        {/* 하단 그라데이션: 어두운 정도를 크게 완화 (to-black/70 -> to-black/40) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/40 pointer-events-none" />
        
        <div className="relative h-full flex flex-col items-center justify-center p-12 text-center z-20">
          <span className="text-white font-bold tracking-[0.4em] mb-2 text-[13px] uppercase drop-shadow-md">FRANCHISE</span>
          
          <h2 className="inline-block text-5xl md:text-6xl font-black text-white mb-10 leading-tight border-b-1 border-white/30 pb-3 transition-colors group-hover:border-white drop-shadow-lg">
            창업 문의
          </h2>

          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <defs>
                <path id="circlePath2" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-white text-[5.4px] font-bold uppercase" style={{ letterSpacing: '0.24em' }}>
                <textPath href="#circlePath2">
                  LEEPRESSO COFFEE • LEEPRESSO COFFEE • LEEPRESSO COFFEE •
                </textPath>
              </text>
            </svg>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-500 hover:bg-[#8D7B68] hover:scale-110 z-30">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3E3232" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12H19M19 12L13 6M19 12L13 18"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}