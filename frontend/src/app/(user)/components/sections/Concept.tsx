'use client';

import React from 'react';
import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section
      id="brand-story"
      className="relative w-full overflow-hidden bg-black"
      /* 헤더 높이를 제외한 화면 높이 설정 */
      style={{ height: 'calc(100vh - 70px)' }}
    >
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/roasting2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 z-10 bg-[rgba(20,12,10,0.70)]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/20 to-black/45" />

      {/* CONTENT */}
      <div className="relative z-20 mx-auto flex h-full max-w-[1500px] flex-col items-center justify-center px-6 text-center sm:px-8 mt-[-30px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-4"
        >
          <span className="mb-5 text-[14px] font-black uppercase italic tracking-[0.5em] text-[#E8D5C4] opacity-70 lg:text-[20px]">
            Brand Story
          </span>
        </motion.div>

        <div className="mx-auto flex max-w-4xl flex-col items-center">
          {/* 메인 헤드라인 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 lg:mb-12"
          >
            <h2 className="break-keep text-xl font-light leading-tight tracking-[-0.03em] text-[#F9F5F0] drop-shadow-md lg:text-[32px]">
              "돌아오는 길엔, 언제나
              <span className="relative ml-2 inline-block font-normal">
                불이 켜져 있습니다.
                <svg className="absolute -bottom-2 left-0 h-3 w-full opacity-80" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                  <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.2 }} d="M2 6C40 4.5 120 4.5 198 7" stroke="#E8D5C4" strokeWidth="1.5" strokeLinecap="round" />
                  <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 1.4 }} d="M5 10C50 8.5 140 9 195 11" stroke="#E8D5C4" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
                </svg>
              </span>
              "
            </h2>
          </motion.div>

          {/* 본문 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="break-keep text-sm font-light leading-[1.8] tracking-normal text-[#F9F5F0]/90 lg:text-[19px]">
              <p>리프레소는 묻지 않습니다. 오늘 하루가 어땠는지, 얼마나 힘들었는지.</p>
              <div className="pt-4">그저 당신의 발걸음이 닿는 자리에서 조용히, 따뜻하게 기다립니다.</div>
              <p className="font-normal text-[#E8D5C4] opacity-95 pt-4">사람은 없지만 온기가 있는 곳. 기계지만 마음을 담은 곳.</p>
            </div>
            <div className="break-keep text-sm font-light leading-[1.8] tracking-normal text-[#F9F5F0]/90 lg:text-[19px] pt-4">
              <p>하루의 시작에도, 돌아오는 길에도 리프레소의 한 잔은 말합니다.</p>
            </div>
          </motion.div>

          {/* 마무리 문구 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="w-full max-w-md pt-5 lg:pt-5"
          >
            <h3 className="relative flex flex-col gap-3 text-lg font-medium leading-tight tracking-[-0.03em] text-[#F9F5F0] drop-shadow-sm lg:gap-5 lg:text-[27px]">
              <span className="break-keep opacity-80">언제나 그 자리에서, 변함없는 온도로</span>
              <span className="break-keep text-[#E8D5C4] font-semibold">
                리프레소는 오늘도 당신의 안녕을 내립니다.
                <svg className="absolute -bottom-2 left-0 h-3 w-full opacity-80" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                  <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.2 }} d="M2 6C40 4.5 120 4.5 198 7" stroke="#E8D5C4" strokeWidth="1.5" strokeLinecap="round" />
                  <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 1.4 }} d="M5 10C50 8.5 140 9 195 11" stroke="#E8D5C4" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
                </svg>
              </span>
            </h3>
          </motion.div>
        </div>

        {/* 스크롤 가이드: 에스프레소 추출 애니메이션 */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group z-30"
          onClick={() => {
            const target = document.getElementById('concept');
            if(target) target.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <svg width="40" height="60" viewBox="0 0 40 60" fill="none" className="opacity-60 transition-opacity group-hover:opacity-100">
            <rect x="12" y="5" width="16" height="3" rx="1.5" fill="white" opacity="0.3" />
            <motion.path 
              d="M20 8 V45" 
              stroke="#E8D5C4" 
              strokeWidth="2" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.6, 1] }}
            />
            <path d="M10 40 H30 V50 C30 55.5 25.5 60 20 60 C14.5 60 10 55.5 10 50 V40 Z" stroke="white" strokeWidth="1" opacity="0.3" />
            <motion.path 
              d="M10 48 H30 V50 C30 55.5 25.5 60 20 60 C14.5 60 10 55.5 10 50 V48 Z" 
              fill="#E8D5C4"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: [0, 1, 0], originY: 1 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.2, times: [0, 0.5, 1] }}
            />
          </svg>
          <span className="text-white/20 text-[9px] tracking-[0.5em] uppercase font-light">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}