'use client';

import { useEffect } from "react";
import Hero from "./Hero/Hero";
import Interior from "./Interior/Interior";
import Equipment from "./Equipment/Equipment";
import Competitiveness from "./Competitiveness/Competitiveness";
import Process from "./Process/Process";
import Price from "./Price/Price";
import Contact from "./Contact/Contact";

export default function FranchisePage() {
  // 스크롤 로직(Hash 처리)은 페이지 전체에 영향을 주므로 여기에 남겨둡니다.
  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (!element) return;

      const timer = setTimeout(() => {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const targetY = elementPosition - headerOffset;

        const startY = window.pageYOffset;
        const difference = targetY - startY;
        let startTime: number | null = null;
        const duration = 850;
        const easing = (t: number) => 1 - Math.pow(1 - t, 3);

        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          window.scrollTo(0, startY + difference * easing(progress));
          if (progress < 1) window.requestAnimationFrame(step);
        };

        window.requestAnimationFrame(step);
      }, 100);

      return () => clearTimeout(timer);
    };

    handleScroll();
    window.addEventListener('hashchange', handleScroll);
    return () => window.removeEventListener('hashchange', handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden bg-white text-[#191919]">
      {/* 1. 메인 HERO */}
      <Hero />

      {/* 2. 인테리어/매장 (기존 BEST 전략 기반) */}
      <Interior />

      {/* 3. 장비 설명 섹션 */}
      <Equipment />

      {/* 4. 브랜드 경쟁력 (Strengths/Value 기반) */}
      <Competitiveness />

      {/* 5. 창업 실행 프로세스 */}
      <Process />

      {/* 6. 가맹 비용 안내 */}
      <Price />

      {/* 7. 가맹 상담 신청 및 하단 고정 바 */}
      <Contact />
    </div>
  );
}