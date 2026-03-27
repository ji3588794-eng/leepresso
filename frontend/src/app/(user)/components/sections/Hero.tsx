'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import BrandPopup from '../common/Popup/BrandPopup';

export default function Hero() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const text1 = `매일의 휴식이 더 가벼워지도록,`;
  const text2 = `일상의 틈을 채우는 가장 편안한 커피, 리프레소`;
  const text3 = `일상의 모든 순간이 리프레소로 완성됩니다.`;
  
  const [line3, setLine3] = useState(text3); 
  const isScrolling = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- [배경 영상 자동재생] ---
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }, []);

  // --- [부드러운 스크롤] ---
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

  // --- [순차적 타이핑] ---
  useEffect(() => {
    let timers: (NodeJS.Timeout | string | number)[] = [];
    const typeEffect = (text: string, setter: (val: string) => void, speed: number, delay: number) => {
      const timer = setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
          if (i <= text.length) {
            setter(text.slice(0, i));
            i++;
          } else { clearInterval(interval); }
        }, speed);
        timers.push(interval);
      }, delay);
      timers.push(timer);
    };

    const startAnimation = () => {
      setLine1(''); setLine2(''); 
      typeEffect(text1, setLine1, 80, 500);   
      typeEffect(text2, setLine2, 70, 2500);  
    };

    startAnimation();
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

      {/* 💡 팝업 영역: 최상단 레이어로 분리 (z-index 경쟁 방지) */}
      <div className="fixed inset-0 z-[9999] pointer-events-none">
          <div className="relative w-full h-full">
              <BrandPopup />
          </div>
      </div>

      {/* 배경 영상 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }} className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay muted loop playsInline 
          webkit-playsinline="true"
          preload="auto"
          className="h-full w-full object-cover brightness-[0.6] contrast-[1.1]"
        >
          <source src="/roasting.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
      </motion.div>

      {/* 컨텐츠 영역 */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 pt-16">
        <div className="max-w-4xl space-y-5 sm:space-y-6" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
          <h2 className="text-white/70 text-[15px] sm:text-[18px] lg:text-[21px] font-extralight tracking-tight min-h-[1.5em] flex justify-center items-center break-keep">
            {line1}
            {line1.length > 0 && line1.length < text1.length && <span className="cursor" />}
          </h2>
          <div className="text-[#E8D5C4] text-[16px] sm:text-[20px] lg:text-[26px] font-normal tracking-tight min-h-[1.5em] flex justify-center items-center break-keep">
            <p className="drop-shadow-md">
              {line2}
              {line2.length > 0 && line2.length < text2.length && <span className="cursor" />}
            </p>
          </div>
          <div className="text-white/80 text-[15px] sm:text-[18px] lg:text-[20px] font-extralight tracking-tight min-h-[1.5em] flex justify-center items-center break-keep">
            <p>{line3}</p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => window.scrollTo({ top: window.innerHeight - 99, behavior: 'smooth' })}
        >
          {/* Scroll SVG 생략 (기본 로직 유지) */}
          <span className="text-white/20 text-[9px] tracking-[0.5em] uppercase font-light">Scroll</span>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none z-40 mix-blend-overlay" />
    </section>
  );
}