'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import BrandHeader from "@/app/(user)/components/layout/brand/BrandHeader";
import BrandFooter from "@/app/(user)/components/layout/brand/BrandFooter";
import api, { getImageUrl } from '@/app/lib/api';
import QuickMenu from "../components/common/QuickMenu";

type MenuItem = {
  idx: number;
  type: string;
  name: string;
  eng_name?: string | null;
  description?: string | null;
  thumbnail_url?: string | null;
  price?: number | string | null;
};

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeType, setActiveType] = useState('signature');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const fetchAllMenus = async () => {
      try {
        const res = await api.get('/user/menus?type=all');
        setMenuItems(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (err) {
        console.error("전체 메뉴 로딩 실패:", err);
        setMenuItems([]);
      }
    };

    fetchAllMenus();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 340);

      const sectionIds = ['signature', 'coffee', 'beverage'];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 220) {
            setActiveType(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });

      setActiveType(id);
    }
  };

  const sections = useMemo(
    () => [
      {
        id: 'signature',
        name: '시그니처',
        eng: 'SIGNATURE',
        num: '01',
        desc: '리프레소의 아이덴티티를 가장 선명하게 보여주는 대표 메뉴입니다.'
      },
      {
        id: 'coffee',
        name: '커피',
        eng: 'COFFEE',
        num: '02',
        desc: '엄선한 원두와 안정적인 추출 밸런스로 완성한 기본에 충실한 커피 라인입니다.'
      },
      {
        id: 'beverage',
        name: '음료',
        eng: 'BEVERAGE',
        num: '03',
        desc: '커피 외에도 부담 없이 즐길 수 있는 다양한 음료를 준비했습니다.'
      }
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#F5EFE8] font-suit text-[#2F241F] selection:bg-[#8D6E52] selection:text-white">
      <QuickMenu />
      <BrandHeader />

      <section className="relative overflow-hidden bg-[#2E241F] text-[#F8F4EF]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.16] bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1800&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,21,17,0.92)_0%,rgba(35,27,22,0.82)_45%,rgba(35,27,22,0.65)_100%)]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-20 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[650px]"
          >
            <p className="text-[11px] md:text-[12px] tracking-[0.35em] uppercase text-[#B99572] font-bold mb-6">
              MENU
            </p>

            <h1 className="text-[30px] md:text-[45px] leading-[1.14] md:leading-[1.08] font-black tracking-[-0.05em] break-keep">
              신선한 로스팅 커피부터 논커피,
              <br />
              블렌딩 티까지
            </h1>

            <div className="w-16 h-px bg-[#B99572]/70 mt-8 mb-8" />

            <p className="text-[14px] md:text-[16px] leading-[1.9] text-white/80 break-keep font-light">
              리프레소는 최고급 사양의 커피머신과 안정적인 추출 시스템을 기반으로
              에티오피아 100% 생두를 자체 로스터리에서 로스팅한 커피부터
              부담 없이 즐길 수 있는 논커피, 다양한 블렌딩 티까지 준비했습니다.
            </p>

            <p className="mt-4 text-[14px] md:text-[16px] leading-[1.9] text-white/80 break-keep font-light">
              무인카페의 편리함 속에서도 한 잔의 완성도를 위해 노력하며,
              클래식한 맛부터 개성 있는 조합까지 취향에 맞춰 선택하는 즐거움을 경험하실 수 있습니다.
            </p>

          </motion.div>
        </div>
      </section>

      {/* 서브탭 네비게이션 */}
      <nav className="sticky top-0 z-30 bg-[#F5EFE8]/95 backdrop-blur-md border-b border-[#2F241F]/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="h-[76px] flex items-center justify-center gap-6 md:gap-16">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="group relative flex items-center gap-3 h-full px-2 transition-all duration-300"
                aria-label={`${s.name} 섹션으로 이동`}
              >
                <span
                  className={`text-[15px] md:text-[17px] font-black tracking-[-0.02em] transition-all ${
                    activeType === s.id
                      ? 'text-[#4A3427] scale-105'
                      : 'text-[#2F241F]/40 group-hover:text-[#4A3427]'
                  }`}
                >
                  {s.name}
                </span>

                <motion.div
                  className={`absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#4A3427] transition-all duration-300 ${
                    activeType === s.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-30 group-hover:scale-x-75'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.25 }}
            className="fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
          >
            <div className="relative pl-6">
              <div className="absolute left-[7px] top-0 bottom-0 w-px bg-[#2F241F]/10" />

              <div className="flex flex-col gap-8">
                {sections.map((s) => {
                  const isActive = activeType === s.id;

                  return (
                    <button
                      key={`side-${s.id}`}
                      onClick={() => scrollToSection(s.id)}
                      className="group relative text-left"
                      aria-label={`${s.name} 섹션으로 이동`}
                    >
                      <span
                        className={`absolute left-[-24px] top-[8px] w-[15px] h-[15px] rounded-full border transition-all duration-300 ${
                          isActive
                            ? 'border-[#8D6E52] bg-[#F5EFE8]'
                            : 'border-[#2F241F]/12 bg-[#F5EFE8]'
                        }`}
                      >
                        <span
                          className={`absolute left-1/2 top-1/2 w-[5px] h-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                            isActive ? 'bg-[#8D6E52]' : 'bg-[#2F241F]/20'
                          }`}
                        />
                      </span>

                      <p
                        className={`text-[13px] font-bold leading-none transition-colors ${
                          isActive ? 'text-[#2F241F]' : 'text-[#2F241F]/45 group-hover:text-[#2F241F]/75'
                        }`}
                      >
                        {s.name}
                      </p>

                      <p
                        className={`mt-2 text-[10px] tracking-[0.22em] uppercase transition-colors ${
                          isActive ? 'text-[#8D6E52]' : 'text-[#8D6E52]/45'
                        }`}
                      >
                        {s.eng}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        {sections.map((section) => {
          const filteredItems = Array.isArray(menuItems)
            ? menuItems.filter((item) => item.type === section.id)
            : [];

          return (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-32 md:scroll-mt-36 mb-28 md:mb-36 last:mb-0"
            >
              <div className="mb-12 md:mb-14">
                <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
                  <div className="relative">
                    <span className="absolute -top-10 md:-top-14 left-0 text-[72px] md:text-[104px] font-black tracking-[-0.08em] text-[#2F241F]/[0.045] leading-none select-none">
                      {section.num}
                    </span>

                    <div className="relative z-10">
                      <p className="text-[11px] md:text-[12px] tracking-[0.28em] uppercase text-[#8D6E52] font-bold mb-3">
                        Brand Signature
                      </p>

                      <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
                        <h2 className="text-[34px] md:text-[52px] leading-none font-black tracking-[-0.05em] uppercase text-[#2F241F]">
                          {section.eng}
                        </h2>

                        <div className="pb-[6px] md:pb-[8px] text-[#2F241F]/38">
                          <span className="text-[11px] tracking-[0.24em] uppercase font-semibold">
                            총: {filteredItems.length}개 상품
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-[15px] md:text-[17px] leading-[1.85] text-[#2F241F]/65 break-keep max-w-[760px]">
                  {section.desc}
                </p>
              </div>

              {filteredItems.length === 0 ? (
                <div className="py-16 text-[#2F241F]/40 text-center border-t border-[#2F241F]/8">
                  등록된 메뉴가 없습니다.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-7 gap-y-14 md:gap-y-16">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={`menu-${section.id}-${item.idx}`}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: (index % 5) * 0.05 }}
                      className="group"
                    >
                      <div className="relative aspect-[4/4.6] rounded-[28px] bg-[linear-gradient(180deg,#EEE4DA_0%,#E6D9CC_100%)] overflow-hidden transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_18px_36px_rgba(47,36,31,0.08)]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_45%)]" />

                        <div className="absolute inset-0 flex items-center justify-center p-5 md:p-6">
                          <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-[1.05]">
                            <Image
                              src={getImageUrl(item.thumbnail_url)}
                              alt={item.name}
                              fill
                              className="object-contain drop-shadow-[0_16px_26px_rgba(0,0,0,0.12)]"
                              unoptimized
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 px-1">
                        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#8D6E52]/70 truncate">
                          {item.eng_name || 'LeePresso Menu'}
                        </p>

                        <h3 className="mt-2 text-[17px] md:text-[18px] leading-[1.35] font-extrabold tracking-[-0.03em] text-[#2F241F] line-clamp-1">
                          {item.name}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </main>

      <BrandFooter />
    </div>
  );
}