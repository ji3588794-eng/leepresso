"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const FRANCHISE_MENU = [
  { name: "리프레소 무인카페", id: "leepresso" },
  { name: "브랜드 경쟁력", id: "keyword" },
  { name: "창업 비용", id: "price" },
  { name: "창업 절차", id: "process-info" },
  { name: "창업 문의", id: "contact" },
];

export default function FranchiseHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 메뉴 클릭 시 이동 및 모바일 메뉴 닫기
  const handleNavClick = (id: string) => {
    const targetPath = `/franchise#${id}`;
    setIsMobileMenuOpen(false); // 메뉴 닫기

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
    <>
      <header
        className={`fixed top-0 w-full z-[60] h-20 lg:h-24 transition-all duration-500 flex items-center px-4 lg:px-12 justify-between ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-md shadow-xl"
            : "bg-transparent"
        }`}
      >
        {/* 1. 좌측 로고 영역 */}
        <div className="flex items-center gap-3 lg:gap-6">
          <Link href="/franchise" className="relative transition-transform duration-300 hover:scale-105">
            <Image
              src="/header_logo.png"
              alt="LEEPRESSO FRANCHISE"
              width={160}
              height={40}
              className="h-[30px] lg:h-[46px] w-auto object-contain"
              priority
            />
          </Link>

          {/* 브랜드 홈 버튼: 모바일에서는 텍스트 축소/제거 고민 가능 */}
          <Link
            href="/brand"
            className="hidden sm:inline-block px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black text-[10px] lg:text-[11px] font-black rounded-full hover:bg-leepresso-point transition-colors tracking-widest uppercase"
          >
            Brand Home →
          </Link>
        </div>

        {/* 2. 중앙/우측 네비게이션 & 액션 버튼 */}
        <div className="flex items-center gap-3 lg:gap-12">
          {/* 데스크탑 메뉴 */}
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

          {/* 상담신청 버튼: 모바일 사이즈 최적화 */}
          <button
            onClick={() => handleNavClick("contact")}
            className="bg-leepresso-point text-white px-4 lg:px-8 py-1.5 lg:py-3 rounded-lg lg:rounded-xl text-[13px] lg:text-[15px] font-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-leepresso-point/20"
          >
            상담신청
          </button>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <button
            className="flex xl:hidden flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* 3. 모바일 풀스크린 오버레이 메뉴 */}
      <div
        className={`fixed inset-0 z-50 bg-white dark:bg-[#0f0f0f] transition-transform duration-500 xl:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 pt-20">
          {FRANCHISE_MENU.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(item.id)}
              className="text-2xl font-black text-leepresso-deep dark:text-white hover:text-leepresso-point"
            >
              {item.name}
            </button>
          ))}
          <Link
            href="/brand"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 px-6 py-2 bg-gray-100 dark:bg-white/10 rounded-full text-sm font-bold"
          >
            Brand Home →
          </Link>
        </nav>
      </div>
    </>
  );
}