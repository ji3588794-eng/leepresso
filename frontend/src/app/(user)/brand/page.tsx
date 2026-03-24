'use client';

import { useEffect } from "react";
import Hero from "@/app/(user)/components/sections/Hero";
import Concept from "@/app/(user)/components/sections/Concept";
import Identity from "@/app/(user)/components/sections/Identity"; // 신규 추가 예정
import History from "@/app/(user)/components/sections/History";
import Location from "@/app/(user)/components/sections/Location";
import Mood from "../components/sections/Mood";
import MainMenu from "../components/sections/MainMenu";
import MainSection from "../components/sections/MainSection";

export default function BrandPage() {
  useEffect(() => {
    const handleInitialScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        window.scrollTo(0, 0);
        const id = hash.replace('#', '');
        
        let attempts = 0;
        const scrollInterval = setInterval(() => {
          const element = document.getElementById(id);
          if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
              top: elementPosition - headerOffset,
              behavior: "smooth"
            });
            clearInterval(scrollInterval);
          }
          attempts++;
          if (attempts > 20) clearInterval(scrollInterval);
        }, 100);
      }
    };

    handleInitialScroll();
    window.addEventListener('hashchange', handleInitialScroll);
    return () => window.removeEventListener('hashchange', handleInitialScroll);
  }, []);

  return (
    <div className="bg-white">
      <main className="font-suit">
        <section id="hero">
          <Hero />
        </section>
        
        {/* 스토리 + 대표메뉴 */}
        <section id="concept" className="scroll-mt-20">
          <Concept />
        </section>

        <section id="concept" className="scroll-mt-20">
          <MainSection />
        </section>

        {/* BI(로고/컬러) + Vision(미래) */}
        <section id="identity" className="scroll-mt-20">
          <Identity />
        </section>

        <section id="mainmenu" className="scroll-mt-20">
          <MainMenu />
        </section>

        <section id="mood" className="scroll-mt-20">
          <Mood />
        </section>

        <section id="history" className="scroll-mt-20">
          <History />
        </section>
        
        <section id="location" className="scroll-mt-20">
          <Location />
        </section>
      </main>
    </div>
  );
}