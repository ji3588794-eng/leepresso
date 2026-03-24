'use client';

import { useState, useEffect } from "react";

export default function QuickBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    // 초기 로드 시 다크모드 상태 확인
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <div className="fixed bottom-10 right-6 md:right-10 z-[100] flex flex-col gap-3">
      
      {/* 다크모드 토글 버튼 */}
      <button 
        onClick={toggleDarkMode}
        className="w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-[#333] border-2 border-leepresso-point rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 transition-all group"
      >
        <span className="text-xl group-hover:rotate-12 transition-transform">
          {isDark ? '☀️' : '☕'}
        </span>
      </button>

      {/* TOP 버튼 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`w-12 h-12 md:w-14 md:h-14 bg-leepresso-deep dark:bg-leepresso-point text-white rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <span className="text-xl font-bold">↑</span>
      </button>
    </div>
  );
}