"use client";

import { useEffect } from "react";
import Hero from "./Hero/Hero";
import Keyword from "./Keyword/Keyword";
import Graph from "./Graph/Graph";
import Interior from "./Interior/Interior";
import Process from "./Process/Process";
import Price from "./Price/Price";
import Contact from "./Contact/Contact";
import Review from "./review/review";
import FranchiseMenu from "./FranchiseMenu/FranchiseMenu";
import MachineFirst from "./Machine/MachineFirst";
import MachineSecond from "./Machine/MachineSecond";
import MachineThird from "./Machine/MachineThird";
import MachineFourth from "./Machine/MachineFourth";
import Machine from "./Machine/Machine";

export default function FranchisePage() {
  // 스크롤 로직(Hash 처리)은 페이지 전체에 영향을 주므로 여기에 남겨둡니다.
  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const id = hash.replace("#", "");
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
    window.addEventListener("hashchange", handleScroll);
    return () => window.removeEventListener("hashchange", handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden bg-white text-[#191919]">
      {/* 1. 메인 HERO */}
      <Hero />

      {/* 핵심 키워드 */}
      <Keyword />

      {/* 그래프 */}
      <Graph />

      {/* 매장사진 */}
      <Interior />

      {/* 메뉴 */}
      <FranchiseMenu />

      {/* 머신 */}
      <Machine />
      {/* <MachineThird />
      <MachineFourth /> */}

      {/* 8. 리뷰섹션 */}
      <Review />

      {/* 6. 가맹 비용 안내 */}
      <Price />

      {/* 5. 창업 실행 프로세스 */}
      <Process />

      {/* 7. 가맹 상담 신청 및 하단 고정 바 */}
      <Contact />
    </div>
  );
}
