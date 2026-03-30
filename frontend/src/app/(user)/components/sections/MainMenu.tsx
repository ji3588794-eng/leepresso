'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Play, Pause } from "lucide-react";
import api, { getImageUrl } from '@/app/lib/api';

interface MenuItem {
  id?: string | number;
  idx: string | number;
  name: string;
  eng_name?: string;
  description?: string;
  thumbnail_url?: string;
  type?: string;
}

export default function MainMenu() {
  const [activeTab, setActiveTab] = useState<'NON-COFFEE' | 'COFFEE' | 'SIGNATURE'>('NON-COFFEE');
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const categoryMap = {
    'COFFEE': 'coffee',
    'NON-COFFEE': 'beverage',
    'SIGNATURE': 'signature'
  } as const;

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const type = categoryMap[activeTab];
        const res = await api.get(`/user/menus?type=${type}`);
        const data = Array.isArray(res.data?.data) ? res.data.data : [];

        if (data.length > 0) {
          setMenus(data);
          setSelectedMenu((prev) => {
            if (!prev) return data[0];
            const matched = data.find((item: MenuItem) => String(item.idx) === String(prev.idx));
            return matched || data[0];
          });
        } else {
          setMenus([]);
          setSelectedMenu(null);
        }
      } catch (error) {
        console.error('❌ 메뉴 로딩 실패:', error);
        setMenus([]);
        setSelectedMenu(null);
      }
    };
    fetchMenus();
  }, [activeTab]);

  const desktopRowCount = useMemo(() => {
    const len = menus.length;
    if (len <= 5) return 1;
    if (len <= 9) return 2;
    return 3;
  }, [menus]);

  const mobileRowData = useMemo(() => {
    if (menus.length === 0) return [];
    const minRepeatCount = 12;
    let result = [...menus];
    while (result.length < minRepeatCount) {
      result = [...result, ...menus];
    }
    return result;
  }, [menus]);

  const rowData = useMemo(() => {
    if (menus.length === 0) return [] as MenuItem[][];
    const makeShiftedRow = (arr: MenuItem[], shift: number, minLength: number) => {
      const safeShift = arr.length === 0 ? 0 : shift % arr.length;
      const shifted = [...arr.slice(safeShift), ...arr.slice(0, safeShift)];
      let result = [...shifted];
      while (result.length < minLength) {
        result = [...result, ...shifted];
      }
      return result;
    };

    const rowConfigs =
      desktopRowCount === 1
        ? [{ shift: 0, minLength: 8 }]
        : desktopRowCount === 2
        ? [
            { shift: 0, minLength: 8 },
            { shift: Math.floor(menus.length / 2), minLength: 8 },
          ]
        : [
            { shift: 0, minLength: 10 },
            { shift: Math.floor(menus.length / 3), minLength: 10 },
            { shift: Math.floor((menus.length * 2) / 3), minLength: 10 },
          ];

    return rowConfigs.map((config) =>
      makeShiftedRow(menus, config.shift, config.minLength)
    );
  }, [menus, desktopRowCount]);

  const marqueeVariants: Variants = {
    animate: (direction: number) => ({
      x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"],
      transition: {
        x: {
          repeat: Infinity,
          duration: 60, 
          ease: "linear"
        }
      }
    }),
    stop: (direction: number) => ({
      x: direction > 0 ? "0%" : "-50%",
      transition: { duration: 0 }
    })
  };

  const currentTitle =
    activeTab === 'NON-COFFEE'
      ? '논커피 / 에이드'
      : activeTab === 'COFFEE'
      ? '프리미엄 커피'
      : '리프레소 시그니처';

  return (
    <section id="concept" className="w-full bg-[#F9F5F0] lg:py-25 overflow-hidden border-b border-[#E8D5C4]">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 mb-6 lg:mb-4 text-left">
        <div className="space-y-1 lg:space-y-0.5">
          <span className="text-[#8D7B68] font-black tracking-[0.2em] text-[9px] lg:text-[11px]">PREMIUM SELECTION</span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-[#3E3232] tracking-tighter leading-tight flex items-start">
            <span className="relative inline-block z-10">
              리프레소 대표메뉴
              <div
                className="absolute bottom-0.5 lg:bottom-2 left-[-2%] w-[108%] h-3 lg:h-7 bg-[#E8D5C4]/80 -z-[1] pointer-events-none"
                style={{
                  borderRadius: '30% 70% 40% 60% / 50% 30% 70% 50%',
                  transform: 'rotate(-1.2deg)',
                  clipPath: 'polygon(0% 20%, 100% 0%, 98% 80%, 2% 100%)',
                  filter: 'blur(0.3px)'
                }}
              />
            </span>
          </h2>
        </div>
      </div>

      <div className="w-full max-w-[1500px] mx-auto flex flex-col lg:flex-row items-start lg:min-h-[550px] px-6 lg:px-10 lg:pt-10 gap-4 lg:gap-6">
        <div className="w-full lg:w-[130px] flex lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-6 sm:gap-8 lg:gap-12 border-b lg:border-b-0 lg:border-r border-[#E8D5C4] pb-4 lg:pb-0 lg:pt-16 h-auto lg:h-full flex-shrink-0 text-left">
          {['NON-COFFEE', 'COFFEE', 'SIGNATURE'].map((id) => (
            <button key={id} onClick={() => setActiveTab(id as any)} className="flex lg:flex-col items-start gap-1 flex-shrink-0 outline-none group relative cursor-pointer active:scale-95 transition-transform pb-2 lg:pb-0">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeTab === id ? 'bg-[#3E3232] scale-125' : 'bg-[#E8D5C4]'}`} />
                <div className={`hidden lg:block h-[2px] transition-all duration-500 origin-left ${activeTab === id ? 'w-14 bg-[#3E3232]' : 'w-6 bg-[#E8D5C4]/60'}`} />
              </div>
              <span className={`text-[11px] lg:text-[13px] font-[900] tracking-[0.15em] transition-colors ${activeTab === id ? 'text-[#3E3232]' : 'text-[#3E3232]/30'}`}>{id}</span>
              {activeTab === id && (
                <motion.div 
                  layoutId="mobileTabUnderline" 
                  className="absolute bottom-[-1.5px] left-0 w-full h-[2.5px] bg-[#3E3232] lg:hidden" 
                />
              )}
            </button>
          ))}
        </div>

        <div className="w-full lg:w-[500px] flex flex-col items-center justify-center flex-shrink-0 py-4 lg:py-0">
          <AnimatePresence mode="wait">
            <motion.div key={selectedMenu?.idx || activeTab} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col items-center w-full">
              <div className="relative w-[220px] sm:w-[260px] lg:w-[385px] h-[220px] sm:h-[300px] lg:h-[385px] mb-4 lg:mb-2">
                {/* ✅ getImageUrl 적용 */}
                <Image src={getImageUrl(selectedMenu?.thumbnail_url)} alt={selectedMenu?.name || ""} fill className="object-contain" priority unoptimized />
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="px-3 py-0.5 md:px-4 md:py-1 border border-[#E8D5C4] rounded-full bg-white/30">
                  <span className="text-[9px] lg:text-[11px] font-black text-[#8D7B68] uppercase tracking-wider">{selectedMenu?.eng_name || 'LEEPRESSO'}</span>
                </div>
                <h3 className="text-2xl lg:text-4xl font-black text-[#3E3232] tracking-tighter leading-tight">{selectedMenu?.name || '메뉴 준비중'}</h3>
                <p className="text-[#3E3232]/50 text-[11px] lg:text-[13px] font-bold max-w-[280px] lg:max-w-[300px] mt-1 text-center break-keep leading-relaxed">{selectedMenu?.description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full lg:flex-1 h-full flex flex-col relative overflow-hidden mt-4 lg:mt-0">
          <div className="w-full relative z-30 pr-0 lg:pr-4 border-b-[1.5px] border-[#3E3232] pb-3 lg:pb-4 flex justify-between items-end">
            <h1 className="text-xl lg:text-3xl font-[900] text-[#3E3232] tracking-tighter uppercase leading-none">{currentTitle}</h1>
            <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 lg:w-10 lg:h-10 bg-[#3E3232] rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90">
              {isPlaying ? <Pause size={12} className="text-white" fill="white" /> : <Play size={12} className="text-white translate-x-0.5" fill="white" />}
            </button>
          </div>

          <div className="flex flex-col flex-1 relative z-10 justify-center gap-4 py-6 lg:py-8 min-h-[140px] lg:min-h-auto">
            {menus.length === 0 ? (
              <div className="text-[#3E3232]/35 font-bold text-center w-full py-10">등록된 메뉴가 없습니다.</div>
            ) : (
              <>
                <div className="lg:hidden relative w-full overflow-hidden">
                  <motion.div variants={marqueeVariants} animate={isPlaying ? "animate" : "stop"} custom={1} className="flex gap-4 w-fit px-4">
                    {mobileRowData.map((item, i) => (
                      <div key={`mob-${i}`} onClick={() => setSelectedMenu(item)} className="w-20 aspect-square cursor-pointer flex-shrink-0 relative">
                        {/* ✅ getImageUrl 적용 */}
                        <Image src={getImageUrl(item.thumbnail_url)} fill className="object-contain" alt={item.name} unoptimized />
                      </div>
                    ))}
                  </motion.div>
                </div>
                <div className="hidden lg:flex flex-col gap-2">
                  {rowData.map((row, idx) => (
                    <div key={`pc-r-${idx}`} className="relative w-full overflow-hidden">
                      <motion.div variants={marqueeVariants} animate={isPlaying ? "animate" : "stop"} custom={idx % 2 === 0 ? 1 : -1} className="flex gap-6 w-fit">
                        {row.map((item, i) => (
                          <div key={`pc-i-${idx}-${i}`} onClick={() => setSelectedMenu(item)} className="w-32 aspect-square cursor-pointer transition-transform hover:scale-110 flex-shrink-0 relative">
                            {/* ✅ getImageUrl 적용 */}
                            <Image src={getImageUrl(item.thumbnail_url)} fill className="object-contain" alt={item.name} unoptimized />
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="absolute inset-y-0 left-0 w-8 lg:hidden bg-gradient-to-r from-[#F9F5F0] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 lg:w-24 bg-gradient-to-l from-[#F9F5F0] via-[#F9F5F0]/80 to-transparent z-20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}