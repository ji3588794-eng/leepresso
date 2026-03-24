'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import BrandPopup from '../common/Popup/BrandPopup';

export default function Hero() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  // text3은 타이핑 효과 없이 바로 보여주기 위해 초기값을 text3 상수로 설정합니다.
  const text1 = `매일의 휴식이 더 가벼워지도록,`;
  const text2 = `일상의 틈을 채우는 가장 편안한 커피, 리프레소`;
  const text3 = `일상의 모든 순간이 리프레소로 완성됩니다.`;
  
  const [line3, setLine3] = useState(text3); 
  const isScrolling = useRef(false); 

  // --- [부드러운 스크롤 로직 유지] ---
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY < 10) {
        if (isScrolling.current) return;
        if (e.deltaY > 0) { 
          e.preventDefault(); 
          isScrolling.current = true;
          const targetPosition = window.innerHeight - 96;
          const startPosition = window.scrollY;
          const distance = targetPosition - startPosition;
          let startTime: number | null = null;
          const duration = 1200;
          function animation(currentTime: number) {
            if (startTime === null) startTime = currentTime;
            const run = easeInOutCubic(currentTime - startTime, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (currentTime - startTime < duration) requestAnimationFrame(animation);
            else { window.scrollTo(0, targetPosition); isScrolling.current = false; }
          }
          function easeInOutCubic(t: number, b: number, c: number, d: number) {
            t /= d / 2; if (t < 1) return c / 2 * t * t * t + b;
            t -= 2; return c / 2 * (t * t * t + 2) + b;
          }
          requestAnimationFrame(animation);
        }
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // --- [순차적 타이핑 로직 수정] ---
  useEffect(() => {
    let timers: (NodeJS.Timeout | string | number)[] = [];

    const typeEffect = (text: string, setter: (val: string) => void, speed: number, delay: number) => {
      const timer = setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
          if (i <= text.length) {
            setter(text.slice(0, i));
            i++;
          } else {
            clearInterval(interval);
          }
        }, speed);
        timers.push(interval);
      }, delay);
      timers.push(timer);
    };

    const startAnimation = () => {
      // line1, line2만 초기화하여 다시 타이핑 시작
      setLine1(''); 
      setLine2(''); 
      
      // 1번 라인: 즉시 시작
      typeEffect(text1, setLine1, 80, 500);   
      
      // 2번 라인: 1번 라인이 어느 정도 진행된 후 시작
      typeEffect(text2, setLine2, 70, 2500);  
      
      // 3번 라인은 상태를 유지하므로 타이핑 로직에서 제외합니다.
    };

    startAnimation();
    
    // 전체 문장이 다 써진 후 반복 루프
    const loop = setInterval(startAnimation, 13000); 
    
    return () => {
      timers.forEach(t => {
        clearTimeout(t as NodeJS.Timeout);
        clearInterval(t as NodeJS.Timeout);
      });
      clearInterval(loop);
    };
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel&family=Noto+Sans+KR:wght@100;300;400&display=swap');
        .bg-grain { background-image: url("https://www.transparenttextures.com/patterns/p6-mini.png"); }
        .cursor::after { content: '|'; animation: blink 1s step-end infinite; color: #E8D5C4; margin-left: 2px; }
        @keyframes blink { from, to { opacity: 0; } 50% { opacity: 1; } }
      `}</style>

      {/* 배경 영상 및 오버레이 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }} className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="h-full w-full object-cover brightness-[0.4] contrast-[1.1]">
          <source src="/roasting.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
      </motion.div>

      {/* 컨텐츠 영역 */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 pt-16">
        <div className="max-w-4xl space-y-5 sm:space-y-6" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
          
          {/* 1번 라인 */}
          <h2 className="text-white/70 text-[15px] sm:text-[18px] lg:text-[21px] font-extralight tracking-tight min-h-[1.5em] flex justify-center items-center break-keep">
            {line1}
            {line1.length > 0 && line1.length < text1.length && <span className="cursor" />}
          </h2>

          {/* 2번 라인 (강조) */}
          <div className="text-[#E8D5C4] text-[16px] sm:text-[20px] lg:text-[26px] font-normal tracking-tight min-h-[1.5em] flex justify-center items-center break-keep">
            <p className="drop-shadow-md">
              {line2}
              {line2.length > 0 && line2.length < text2.length && <span className="cursor" />}
            </p>
          </div>
          
          {/* 3번 라인 (마무리) - 타이핑 커서 제거 */}
          <div className="text-white/80 text-[15px] sm:text-[18px] lg:text-[20px] font-extralight tracking-tight min-h-[1.5em] flex justify-center items-center break-keep">
            <p>
              {line3}
            </p>
          </div>

        </div>

        {/* 팝업 위치 */}
        <div className="absolute inset-x-0 bottom-24 sm:bottom-0 z-50">
            <BrandPopup />
        </div>

        {/* 스크롤 가이드 */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => window.scrollTo({ top: window.innerHeight - 99, behavior: 'smooth' })}
        >
          <svg width="40" height="60" viewBox="0 0 40 60" fill="none" className="opacity-60 transition-opacity group-hover:opacity-100">
            <rect x="12" y="5" width="16" height="3" rx="1.5" fill="white" opacity="0.3" />
            <motion.path 
              d="M20 8 V45" 
              stroke="#E8D5C4" 
              strokeWidth="2" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: [0, 1, 1],
                opacity: [0, 1, 0] 
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                times: [0, 0.6, 1] 
              }}
            />
            <path d="M10 40 H30 V50 C30 55.5 25.5 60 20 60 C14.5 60 10 55.5 10 50 V40 Z" stroke="white" strokeWidth="1" opacity="0.3" />
            <motion.path 
              d="M10 48 H30 V50 C30 55.5 25.5 60 20 60 C14.5 60 10 55.5 10 50 V48 Z" 
              fill="#E8D5C4"
              initial={{ scaleY: 0 }}
              animate={{ 
                scaleY: [0, 1, 0],
                originY: 1 
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.2,
                times: [0, 0.5, 1]
              }}
            />
          </svg>
          <span className="text-white/20 text-[9px] tracking-[0.5em] uppercase font-light">Scroll</span>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none z-40 mix-blend-overlay" />
    </section>
  );
}