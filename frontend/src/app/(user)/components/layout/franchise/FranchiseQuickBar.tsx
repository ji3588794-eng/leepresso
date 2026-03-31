// src/components/layout/franchise/FranchiseQuickBar.tsx
'use client';
import { useState, useEffect } from 'react';
import QuickMenu from '../../common/QuickMenu';

export default function FranchiseQuickBar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[110] flex flex-col gap-3">
      {/* <button 
        onClick={toggleDark}
        className="w-14 h-14 rounded-full bg-white dark:bg-[#333] shadow-2xl flex items-center justify-center border border-gray-100 dark:border-white/10 text-xl"
      >
        {isDark ? '☀️' : '🌙'}
      </button>
      <button className="w-14 h-14 rounded-full bg-leepresso-point text-white shadow-2xl flex items-center justify-center font-bold text-xs">
        CALL
      </button>*/}
      {/* <QuickMenu /> */}
    </div>
  );
}