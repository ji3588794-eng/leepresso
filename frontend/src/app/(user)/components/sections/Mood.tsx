'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Mood() {
  const dynamicKeywords = [
    '취향대로',
    '감각있게',
    '자유롭게',
    '당신답게',
    '유연하게',
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % dynamicKeywords.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [dynamicKeywords.length]);

  const cardsPart3 = useMemo(
    () => [
      { id: 1, title: '천안두정점', img: '/store-1.png' },
      { id: 2, title: '브랜드 공간', img: '/store-2.jpg' },
      { id: 3, title: '무인 운영 공간', img: '/store-3.jpg' },
      { id: 4, title: '브랜드 무드', img: '/store-4.png' },
      { id: 5, title: '리프레소 스토어', img: '/store-5.jpg' },
    ],
    []
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#F9F5F0] font-suit">
      <section className="relative w-full overflow-hidden bg-[#F6F0E3] py-20 sm:py-24 lg:py-28">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: "url('/lb-back.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* 상단 텍스트 영역 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto mb-16 w-full px-4 text-center sm:mb-20"
        >
          <div className="break-keep text-[18px] font-extrabold leading-[1.8] text-[#2F2523] sm:text-[22px] md:text-[28px]">
            <span className="relative inline-block">
              따뜻한 우드톤
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
                className="absolute bottom-1 left-0 -z-10 h-3 rounded-sm bg-[#E8D5C4]"
              />
            </span>
            과 깔끔함이 어우러진 베이스 디자인,
            <br />
            점주님의 취향을 자유롭게 더할 수 있는{' '}
            <span className="relative inline-block whitespace-nowrap">
              유연하고 실용적인 공간
              <svg
                className="absolute -bottom-0 left-0 h-3 w-full"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8, ease: 'easeInOut' }}
                  d="M0 8 Q 50 0, 100 8"
                  stroke="#8D7B68"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            입니다.
          </div>
        </motion.div>

        <div className="relative z-10 mx-auto w-full py-10 lg:py-16">
          {/* PC 박스 영역 */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-full max-w-[1400px] -translate-x-1/2 md:block">
            {/* 박스 본체: 좌/우/하단 border 유지 */}
            <div className="absolute inset-0 border-b border-l border-r border-[#A19A91]/40" />

            {/* 상단 border 좌/우 분리 */}
            <div className="absolute left-0 top-0 h-px w-[calc(50%-320px)] bg-[#A19A91]/40 lg:w-[calc(50%-360px)]" />
            <div className="absolute right-0 top-0 h-px w-[calc(50%-320px)] bg-[#A19A91]/40 lg:w-[calc(50%-360px)]" />

            {/* 상단 타이틀 */}
            <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden px-6 py-2 sm:px-8 ">
              <h3 className="flex items-center justify-center whitespace-nowrap text-center text-[28px] font-black leading-none tracking-[-0.05em] text-[#3E3232] sm:text-[40px] md:text-[46px] lg:text-[54px]">
                리프레소의 무드는
                <div className="relative mx-3 inline-flex h-[1.3em] min-w-[5.6em] items-center justify-center overflow-hidden rounded-sm bg-[#8D7B68] px-4 py-1 text-white sm:px-6">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentIdx}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="absolute"
                    >
                      {dynamicKeywords[currentIdx]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </h3>
            </div>
          </div>

          {/* 모바일용 타이틀 */}
          <div className="relative z-20 mb-10 flex items-center justify-center px-4 md:hidden">
            <div className="h-px w-full bg-[#3E3232]/65"></div>
            <div className="flex shrink-0 items-center justify-center bg-[#F6F0E3] px-4">
              <h3 className="flex items-center whitespace-nowrap text-center text-[20px] font-black leading-none tracking-[-0.05em] text-[#3E3232] sm:text-[24px]">
                리프레소의 무드는
                <div className="relative mx-2 inline-flex h-[1.3em] min-w-[5.8em] items-center justify-center overflow-hidden rounded-sm bg-[#8D7B68] px-3 py-1 align-middle text-white">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentIdx}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute"
                    >
                      {dynamicKeywords[currentIdx]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </h3>
            </div>
            <div className="h-px w-full bg-[#3E3232]/65"></div>
          </div>

          {/* 무한 슬라이드 */}
          <div className="relative z-10 flex w-full overflow-hidden">
            <div className="flex w-max animate-infinite-slider hover:[animation-play-state:paused]">
              {[1, 2].map((setIndex) => (
                <div
                  key={setIndex}
                  className="flex gap-3 pr-3 sm:gap-4 sm:pr-4 lg:gap-5 lg:pr-5"
                >
                  {cardsPart3.map((card, idx) => (
                    <div key={`${card.id}-${idx}`} className="shrink-0">
                      <div className="relative h-[250px] w-[350px] overflow-hidden bg-[#e0dcd3] sm:h-[300px] sm:w-[420px] md:h-[350px] md:w-[480px] lg:h-[400px] lg:w-[550px]">
                        <Image
                          src={card.img}
                          alt={card.title}
                          fill
                          className="object-cover"
                          priority={setIndex === 1 && idx < 4}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes infiniteSlider {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-infinite-slider {
                animation: infiniteSlider 30s linear infinite;
              }
            `,
          }}
        />
      </section>
    </section>
  );
}