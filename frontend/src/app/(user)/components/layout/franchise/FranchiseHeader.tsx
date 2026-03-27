"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const FRANCHISE_MENU = [
  { name: "리프레소 무인카페", id: "leepresso" },
  { name: "브랜드 경쟁력", id: "value" },
  { name: "창업 비용", id: "price" },
  { name: "창업 절차", id: "process-info" },
  { name: "창업 설명회 일정", id: "schedule" },
  { name: "창업 문의", id: "contact" },
];

export default function FranchiseHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const targetPath = `/franchise#${id}`;

    if (pathname === "/franchise") {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: "smooth",
        });
        window.history.replaceState(null, "", targetPath);
      }
    } else {
      router.push(targetPath, { scroll: false });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 h-24 transition-all duration-500 flex items-center px-6 lg:px-12 justify-between ${
        isScrolled ? "bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-md shadow-xl" : "bg-transparent"
      }`}
    >
      {/* 1. 좌측 로고 영역: 두 줄로 삐딱한 디자인 */}
      <div className="flex items-center gap-6">
        <Link href="/franchise" className="relative group flex  hover:rotate-10 transition-transform duration-300">
          <div>
            <Image
              src="/header_logo.png"
              alt="LEEPRESSO FRANCHISE"
              width={0}
              height={0}
              sizes="100vw"
              className="h-[38px] lg:h-[46px] w-auto"
              priority
            />
          </div>
        </Link>

        {/* 브랜드 홈 버튼: 가시성 강화 */}
        <Link
          href="/brand"
          className="ml-4 px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-[11px] font-black rounded-full hover:bg-leepresso-point dark:hover:bg-leepresso-point transition-colors shadow-lg shadow-black/10 tracking-widest uppercase"
        >
          Brand Home →
        </Link>
      </div>

      {/* 2. 중앙/우측 네비게이션: 간격 및 폰트 조정 */}
      <div className="flex items-center gap-12">
        <nav className="hidden xl:flex gap-10 items-center">
          {FRANCHISE_MENU.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(item.id)}
              className="group relative text-[15px] font-bold text-leepresso-deep dark:text-white/70 hover:text-leepresso-point dark:hover:text-white transition-all"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-leepresso-point transition-all group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* 3. 우측 상담신청 버튼 */}
        <button
          onClick={() => handleNavClick("contact")}
          className="bg-leepresso-point text-white px-8 py-3 rounded-xl text-[15px] font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-leepresso-point/30"
        >
          상담신청
        </button>
      </div>
    </header>
  );
}
