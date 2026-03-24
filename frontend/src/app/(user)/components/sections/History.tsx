'use client';

import React, { useState, useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useSpring } from 'framer-motion';
import { Play, Pause, ArrowLeft, ArrowRight } from 'lucide-react';

const HISTORY_DATA = [
  {
    year: '2026',
    items: [
      { m: '·', t: '가맹사업설명회 개최 예정', d: '무인카페 프랜차이즈 비전 제시' },
      { m: '·', t: '천안두정점 OPEN', d: '점포개발 본격화 및 시스템 안착' },
      { m: '·', t: '브랜드/로고 리뉴얼', d: '상표·특허 출원 및 ID 확립' },
    ],
  },
  {
    year: '2025',
    items: [
      { m: '·', t: 'LEEPRESSO 런칭', d: '하이엔드 무인+유인 통합 브랜드' },
      { m: '·', t: '아산 직영점 OPEN', d: '브랜드 경험 플래그십 스토어' },
    ],
  },
  {
    year: '2024',
    items: [{ m: '·', t: '스마트 무인 인프라', d: '지자체 및 관공서 최적화 시스템' }],
  },
  {
    year: '2023',
    items: [{ m: '·', t: '원격 관리 솔루션', d: '무인 시스템 독점 공급' }],
  },
  {
    year: '2022',
    items: [{ m: '·', t: '품질 관리 시스템', d: '운영연구 시스템 완성' }],
  },
  {
    year: '2021',
    items: [{ m: '·', t: '디디커피 런칭', d: '가성비 모델 가맹 전개' }],
  },
  {
    year: '2020',
    items: [{ m: '·', t: '(주)맛있는향기 설립', d: '시장 가치 창출 법인' }],
  },
];

export default function History() {
  const [isPlaying, setIsPlaying] = useState(true);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const scrollRef = useRef<HTMLDivElement>(null);

  const duplicatedData = [...HISTORY_DATA, ...HISTORY_DATA, ...HISTORY_DATA];
  const cardWidth = 320;

  useAnimationFrame(() => {
    if (!isPlaying || !scrollRef.current) return;

    const moveBy = -0.6;
    let newX = x.get() + moveBy;
    const setWidth = scrollRef.current.scrollWidth / 3;

    if (newX <= -setWidth) newX = 0;
    x.set(newX);
  });

  const handleManualScroll = (direction: 'left' | 'right') => {
    setIsPlaying(false);

    const setWidth = (scrollRef.current?.scrollWidth || 0) / 3;
    let newX = x.get() + (direction === 'left' ? cardWidth : -cardWidth);

    if (newX > 0) newX = -setWidth;
    if (newX < -setWidth) newX = 0;

    x.set(newX);
  };

  return (
    <section
      id="history"
      className="relative overflow-hidden border-b border-[#3E3232]/10 bg-[#F9F5F0] font-suit"
    >
      {/* 배경 장식 (워터마크) */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none">
        <h2 className="text-[18vw] font-black uppercase italic tracking-tighter text-[#3E3232]/[0.04] sm:text-[15vw] lg:text-[11vw]">
          HISTORY
        </h2>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row">
        {/* [SIDEBAR] 수정된 중앙 정렬 사이드바 */}
        <div className="relative z-30 flex min-h-[400px] w-full shrink-0 flex-col items-center justify-center px-8 py-12 text-center lg:h-auto lg:w-[450px] lg:px-16">
          {/* 이미지 배경 */}
          <div className="absolute inset-0 z-[-1]">
            <img 
              src="/history-left-back.jpeg" 
              alt="Brand Heritage"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1.5px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#3E3232]/80" />
          </div>

          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                className="text-[12px] font-bold uppercase tracking-[0.5em] text-[#D4C3B3]"
              >
                Since 2020
              </motion.span>
              <h3 className="text-4xl font-black leading-[1.1] tracking-tighter text-white lg:text-6xl">
                BRAND<br />
                History
              </h3>
              <p className="mx-auto max-w-[350px] text-[15px] leading-relaxed text-white/60">
                커피 한 잔에 담긴 수많은 고민과 시도들,<br />리프레소는 오늘도 더 맛있는 내일을 향해 달립니다.
              </p>
            </div>

            {/* [CONTROLS] */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 border border-white/20 bg-black/20 p-2 backdrop-blur-xl">
                <button onClick={() => handleManualScroll('left')} className="p-2 text-white hover:text-[#D4C3B3] transition-colors">
                  <ArrowLeft size={20} />
                </button>
                <button onClick={() => setIsPlaying(!isPlaying)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4C3B3] text-[#3E3232] transition-transform active:scale-90">
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                </button>
                <button onClick={() => handleManualScroll('right')} className="p-2 text-white hover:text-[#D4C3B3] transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 우측 히스토리 카드 영역 */}
        <div className="relative flex min-w-0 flex-1 items-stretch overflow-hidden py-0 border-t border-[#3E3232]/10">
          <motion.div
            ref={scrollRef}
            style={{ x: springX }}
            className="flex items-stretch"
          >
            {duplicatedData.map((group, idx) => (
              <div
                key={idx}
                className="group flex min-h-[340px] w-[290px] shrink-0 flex-col justify-between border-r border-[#3E3232]/10 px-5 py-8 transition-all duration-500 hover:bg-white/60 sm:min-h-[360px] sm:w-[320px] sm:px-6 sm:py-9 md:w-[350px] md:px-8 lg:min-h-[400px] lg:w-[380px] lg:px-9 lg:py-12"
              >
                <div className="mb-8 text-left sm:mb-10">
                  <span className="block text-5xl font-black leading-none tracking-tighter text-[#3E3232]/20 sm:text-6xl md:text-7xl lg:text-8xl">
                    {group.year}
                  </span>
                  <div className="mt-3 h-[4px] w-10 bg-[#8D7B68] sm:mt-4 sm:w-12" />
                </div>

                <div className="flex flex-1 flex-col justify-start space-y-6 text-left sm:space-y-7 md:space-y-8 lg:space-y-10">
                  {group.items.map((item, iIdx) => (
                    <div key={iIdx} className="group/item relative">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="text-lg font-black tracking-tighter text-[#8D7B68] transition-all group-hover/item:scale-110 sm:text-xl">
                          {item.m}
                        </span>
                        <div className="relative h-[1.5px] flex-1 overflow-hidden bg-[#3E3232]/10">
                          <motion.div
                            className="absolute inset-0 origin-left bg-[#8D7B68]"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                          />
                        </div>
                      </div>

                      <h4 className="mb-2 break-keep text-[17px] font-black leading-tight text-[#3E3232] transition-colors group-hover/item:text-[#8D7B68] sm:text-[18px] md:text-[19px] lg:text-[20px]">
                        {item.t}
                      </h4>

                      <p className="break-keep text-[12px] font-bold leading-relaxed text-[#3E3232]/60 sm:text-[13px] md:text-[14px]">
                        {item.d}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#F9F5F0] via-[#F9F5F0]/80 to-transparent sm:w-16 lg:w-24" />
        </div>
      </div>
    </section>
  );
}