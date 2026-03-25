'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Next.js Link 컴포넌트 추가

// --- 애니메이션 사전 설정 ---
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: 'easeOut' },
} as const;

const imageRevealLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.9, ease: 'easeOut' },
} as const;

const imageRevealRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.9, ease: 'easeOut' },
} as const;


// --- 재사용 가능한 UI 컴포넌트 ---

// onClick 또는 href를 받을 수 있도록 수정
const InteractiveCTA = ({ text, href, onClick }: { text: string; href?: string; onClick?: () => void }) => {
  const content = (
    <motion.div
      whileHover="hover"
      className="group relative flex items-center gap-4 md:gap-5 cursor-pointer outline-none"
    >
      <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          variants={{ hover: { rotate: 180 } }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <circle cx="50" cy="50" r="48" stroke="#A9443D" strokeWidth="1" fill="none" strokeDasharray="4 4" className="opacity-30" />
        </motion.svg>
        <motion.span className="text-[#A9443D]" variants={{ hover: { x: 3 } }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </motion.span>
      </div>
      <span className="text-[14px] md:text-[15px] font-bold tracking-tight text-[#3e3232] group-hover:text-[#A9443D] transition-colors duration-300">
        {text}
      </span>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return <button onClick={onClick} className="block">{content}</button>;
};

const SectionIndex = ({ number }: { number: string }) => (
  <div className="flex items-center gap-3 md:gap-4">
    <span className="text-[10px] md:text-[11px] tracking-[0.3em] text-[#A9443D] font-bold">{number}</span>
    <span className="w-8 md:w-12 h-px bg-[#A9443D]/20" />
  </div>
);

const SteamingCoffeeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6">
    <path d="M18 8H6C4.89543 8 4 8.89543 4 10V17C4 18.6569 5.34315 20 7 20H15C16.6569 20 18 18.6569 18 17V10C18 8.89543 17.1046 8 16 8Z" stroke="#3e3232" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50" />
    <path d="M18 11H19C20.1046 11 21 11.8954 21 13V15C21 16.1046 20.1046 17 19 17H18" stroke="#3e3232" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50" />
    <path d="M3 22H19" stroke="#3e3232" strokeWidth="1.2" strokeLinecap="round" className="opacity-50" />
    <path d="M9 2V5" stroke="#A9443D" strokeWidth="1.5" strokeLinecap="round">
      <animate attributeName="d" values="M9 2V5;M9 1V4;M9 2V5" dur="1.5s" repeatCount="indefinite" />
    </path>
    <path d="M12 1V4" stroke="#A9443D" strokeWidth="1.5" strokeLinecap="round">
      <animate attributeName="d" values="M12 1V4;M12 0V3;M12 1V4" dur="1.5s" begin="0.2s" repeatCount="indefinite" />
    </path>
  </svg>
);

const VerticalTextAccent = ({ align = 'right' }: { align?: 'left' | 'right' }) => (
  <div className={`pointer-events-none absolute ${align === 'left' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 z-0 hidden xl:flex flex-col items-center gap-5 opacity-40`}>
    <div className="w-px h-24 bg-[#8d7b68]/30" />
    <div className="text-[10px] tracking-[0.3em] text-[#8d7b68] font-medium" style={{ writingMode: 'vertical-rl' }}>PREMIUM UNMANNED CAFE</div>
    <div className="w-px h-24 bg-[#A9443D]/20" />
  </div>
);

const WaveWithCoffeeDecoration = () => (
  <div className="pointer-events-none absolute left-0 bottom-8 md:bottom-12 z-0 flex items-end gap-3 px-6 lg:px-10 opacity-60">
    <svg viewBox="0 0 520 90" className="w-[140px] md:w-[240px] lg:w-[320px] h-auto" fill="none">
      <path d="M-20 50C30 50 30 58 80 58C130 58 130 50 180 50C230 50 230 58 280 58C330 58 330 50 380 50C430 50 430 58 480 58C530 58 530 50 580 50" stroke="#8d7b68" strokeWidth="1" />
      <path d="M-20 65C30 65 30 73 80 73C130 73 130 65 180 65C230 65 230 73 280 73C330 73 330 65 380 65C430 65 430 73 480 73C530 73 530 65 580 65" stroke="#A9443D" strokeOpacity="0.2" strokeWidth="1" />
    </svg>
    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }}>
      <SteamingCoffeeIcon />
    </motion.div>
  </div>
);

// --- 메인 섹션 컴포넌트 ---

export default function MainSection() {
  // 스크롤 함수
  const scrollToConcept = () => {
    const element = document.getElementById('concept');
    if (element) {
      const headerOffset = 80; // 헤더 높이만큼 오차 수정
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full font-suit bg-[#f9f5f0] text-[#3e3232] overflow-x-hidden">
      
      {/* SECTION 01: Image on Right */}
      <section className="relative min-h-screen lg:min-h-[90vh] flex items-center py-16 sm:py-24 lg:py-0 overflow-hidden">
        <VerticalTextAccent align="left" />
        <WaveWithCoffeeDecoration />

        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          
          <motion.div {...reveal} className="max-w-[540px] z-20 lg:pr-10">
            <SectionIndex number="01" />
            <div className="mt-6 md:mt-8">
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[1.25] tracking-[-0.04em] font-semibold break-keep">
                당신의 일상에 따뜻한 <br />
                <span className="text-[#A9443D]">쉼표</span>를 더하는 리프레소
              </h2>
              <div className="mt-6 md:mt-8 space-y-5 md:space-y-6 text-[15px] md:text-[17px] leading-[1.8] text-[#3e3232]/70 break-keep font-normal">
                <p>
                  리프레소는 누구나 언제든 편히 들러 여유를 즐길 수 있는 공간입니다. 
                  돌아오는 길엔 언제나 불이 켜져 있는 곳, 사람은 없지만 24시간 변함없는 온기를 담아 여러분을 반깁니다.
                </p>
                <p>
                  합리적인 가격의 리프레소 커피는 <span className="text-[#A9443D] font-bold">최상급 커피머신</span>과 100% 프리미엄 아라비카 원두로 완성되어 전문 카페 이상의 풍미를 선사합니다.
                </p>
              </div>
            </div>
            <div className="mt-10 md:mt-12">
              {/* 내부 스크롤 이벤트 */}
              <InteractiveCTA text="브랜드 스토리 보기" onClick={scrollToConcept} />
            </div>
          </motion.div>

          {/* Right Bleeding Image */}
          <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] z-10">
            <motion.div 
              {...imageRevealRight}
              className="absolute inset-0 lg:-right-[10vw] xl:-right-[15vw]"
            >
              <div className="w-full h-full bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden rounded-sm">
                <img 
                  src="/main-section-back.png" 
                  alt="Brand Image 1" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 02: Image on Left */}
      <section className="relative min-h-screen lg:min-h-[90vh] flex items-center py-16 sm:py-24 lg:py-0 bg-[#f4f0ea] overflow-hidden">
        <VerticalTextAccent align="right" />

        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          
          {/* Left Bleeding Image */}
          <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] z-10 order-2 lg:order-1">
            <motion.div 
              {...imageRevealLeft}
              className="absolute inset-0 lg:-left-[10vw] xl:-left-[15vw]"
            >
              <div className="w-full h-full bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden rounded-sm">
                <img 
                  src="/main-section-back2.png" 
                  alt="Brand Image 2" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>
          </div>

          <motion.div {...reveal} className="max-w-[540px] lg:ml-auto z-20 order-1 lg:order-2 lg:pl-10">
            <SectionIndex number="02" />
            <div className="mt-6 md:mt-8">
              <h2 className="text-[26px] sm:text-[34px] md:text-[38px] lg:text-[42px] leading-[1.3] tracking-[-0.04em] font-semibold break-keep">
                최고의 가성비 무인카페 <br />
                <span className="text-[#A9443D]">리프레소</span>와 함께하세요.
              </h2>
              <p className="mt-5 md:mt-6 text-[15px] md:text-[17px] leading-[1.8] text-[#3e3232]/70 font-normal break-keep">
                리프레소는 단순한 매장을 넘어 점주님의 지속 가능한 성공을 위한 확실한 파트너가 되어드립니다.
              </p>
            </div>

            <div className="mt-8 md:mt-10 space-y-6 md:space-y-8">
              {[
                { title: "본사의 집요한 연구", desc: "완벽한 한 잔을 위해 끊임없이 신메뉴와 레시피를 개발합니다." },
                { title: "소자본 창업 솔루션", desc: "초기 부담을 덜고 실질적인 수익 창출을 돕습니다." },
                { title: "통합 관리 시스템", desc: "스마트 원격 제어와 신속한 A/S로 멈추지 않는 매장을 만듭니다." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] md:text-[13px] font-black text-[#A9443D]">0{idx + 1}</span>
                    <h4 className="text-[16px] md:text-[17px] font-bold text-[#3e3232]">{item.title}</h4>
                  </div>
                  <p className="text-[15px] text-[#3e3232]/60 pl-7">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 md:mt-12">
              {/* 외부 페이지 이동 (Next.js Link 활용) */}
              <InteractiveCTA text="창업 상담 바로가기" href="/franchise#contact" />
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}