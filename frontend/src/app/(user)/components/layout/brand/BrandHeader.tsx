'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Instagram, MessageCircle } from "lucide-react";

const NAV_MENU = [
  {
    title: "리프레소",
    eng: "BRAND",
    path: "/brand",
    sub: [
      { name: "브랜드 스토리", id: "brand-story" },
      { name: "연혁", id: "history" },
      { name: "오시는 길", id: "location" }
    ]
  },
 {
  title: "메뉴",
  eng: "OUR MENU",
  path: "/menu",
  sub: [
    { name: "전체 메뉴", id: "all" },
    { name: "시그니처", id: "signature" },
    { name: "커피", id: "coffee" },
    { name: "논커피/음료", id: "beverage" }
  ]
},
  { 
    title: "창업문의", 
    eng: "FRANCHISE", 
    path: "/franchise", 
    sub: [
        { name: "리프레소 무인카페", id: "leepresso" },
         { name: "브랜드 경쟁력", id: "value" },
         { name: "창업 설명회 일정", id: "schedule" },
         { name: "창업 절차", id: "cost" },
         { name: "창업 비용", id: "price" },
         { name: "창업 문의", id: "contact" },
    ] 
  },
  { title: "매장안내", eng: "STORE INFO", path: "/store", sub: [{ name: "매장 찾기", id: "find" }] },
  { title: "커뮤니티", eng: "COMMUNITY", path: "/community", sub: [{ name: "공지사항", id: "notice" }, { name: "이벤트", id: "event" }, { name: "고객의 소리", id: "voc" }] },
];

export default function BrandHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // 이동 가능성이 높은 주요 페이지들을 미리 로드 (캐싱)
    router.prefetch('/brand');
    router.prefetch('/menu');
    router.prefetch('/franchise');
    router.prefetch('/store');
    router.prefetch('/community');
  }, [router]);

// [수정 로직] 페이지 이동 및 부드러운 스크롤 통합 처리
  const handleNavClick = (path: string, id?: string) => {
    // 1. 커뮤니티 페이지인 경우 (원페이지가 아니므로 예외 처리)
    if (path === '/community') {
      const targetPath = id ? `${path}#${id}` : path;
      
      // 현재 커뮤니티 페이지라면 해시만 바꿔서 useEffect가 감지하게 함
      if (pathname === '/community') {
        window.location.hash = id || '';
      } else {
        // 다른 페이지라면 해당 탭으로 이동
        router.push(targetPath);
      }
    } 
    // 2. 원페이지 스크롤이 필요한 페이지들 (Brand, Franchise 등)
    else if (pathname === path) {
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          const offset = 140;
          const targetY = element.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: targetY, behavior: "smooth" });
          window.history.replaceState(null, '', `${path}#${id}`);
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } 
    // 3. 완전히 다른 페이지로 이동
    else {
      const targetPath = id ? `${path}#${id}` : path;
      router.push(targetPath);
    }
    
    setIsMobileMenuOpen(false);
    setIsHovered(false);
  };

  const hasBg = !isMobileMenuOpen && (isScrolled || isHovered);

  return (
    <header className={`fixed w-full top-0 left-0 transition-all duration-500 ease-in-out ${
      isMobileMenuOpen ? "z-[150] bg-transparent" : "z-[100]"
    } ${hasBg ? "bg-leepresso-bg dark:bg-[#111] shadow-md" : "bg-transparent"}`}>

      <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-mini.png')] dark:invert ${
        isHovered ? "opacity-[0.04]" : "opacity-0"
      }`} />

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20 lg:h-24 relative z-[160]">

          {/* 로고 영역 */}
          <div className="w-[120px] lg:w-[150px] flex items-center">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="transition-transform duration-500 hover:scale-[1.03] inline-block">
              <Image src="/logo_white.png" alt="logo" width={110} height={40} priority className="object-contain transition-all duration-700 dark:block hidden" />
              <Image src={(hasBg || isMobileMenuOpen) ? "/logo_color.png" : "/logo_white.png"} alt="logo" width={110} height={40} priority className="object-contain transition-all duration-700 dark:hidden block" />
            </Link>
          </div>

          {/* PC 네비게이션 */}
          <nav onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="hidden lg:grid grid-cols-5 gap-10 flex-1 max-w-[750px] mx-auto text-center h-full items-center font-pretendard">
            {NAV_MENU.map((menu) => (
              <div key={menu.title} className="group py-4">
                <button
                  onClick={() => handleNavClick(menu.path, menu.sub[0]?.id)}
                  className={`relative font-black text-[16px] tracking-tight transition-colors duration-500 inline-block cursor-pointer ${
                    hasBg ? "text-leepresso-deep dark:text-gray-200" : "text-white"
                  }`}
                >
                  {menu.title}
                  <span className={`absolute -bottom-2 left-0 w-0 h-[2.5px] transition-all duration-500 group-hover:w-full ${
                    hasBg ? "bg-leepresso-point" : "bg-white/80"
                  }`} />
                </button>
              </div>
            ))}
          </nav>

          {/* 우측 아이콘 & 모바일 햄버거 */}
          <div className="w-[120px] lg:w-[150px] flex justify-end items-center gap-6">
            <div className={`hidden lg:flex items-center gap-6 ${hasBg ? "text-leepresso-deep dark:text-gray-200" : "text-white"}`}>
              {/* 카카오톡 / 메시지 아이콘 */}
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-all duration-300 hover:scale-115"
              >
                <MessageCircle 
                  size={23} 
                  fill="currentColor" 
                  strokeWidth={1.2} 
                  className={hasBg ? "dark:fill-none" : "fill-white"} 
                />
              </a>

              {/* 인스타그램 아이콘 */}
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-all duration-300 hover:scale-115"
              >
                <Instagram size={23} strokeWidth={1.5} />
              </a>

              {/* 네이버 블로그 아이콘 */}
              <a 
                href="https://blog.naver.com/mhkopi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group transition-all duration-300 hover:scale-115"
              >
                <div className={`w-[22px] h-[22px] flex items-center justify-center rounded-[3px] font-black text-[11px] border-[1.5px] leading-none ${hasBg ? "border-leepresso-deep dark:border-gray-400" : "border-white"}`}>
                  B
                </div>
              </a>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden relative w-8 h-8 flex items-center justify-center group cursor-pointer">
              <div className="relative w-6 h-5">
                <span className={`absolute block h-0.5 w-6 transition-all duration-300 ${isMobileMenuOpen || hasBg ? "bg-leepresso-deep dark:bg-white" : "bg-white"} ${isMobileMenuOpen ? "top-2 rotate-45" : "top-0"}`} />
                <span className={`absolute block h-0.5 w-4 right-0 transition-all duration-300 ${isMobileMenuOpen || hasBg ? "bg-leepresso-deep dark:bg-white" : "bg-white"} ${isMobileMenuOpen ? "opacity-0 invisible" : "top-[9px]"}`} />
                <span className={`absolute block h-0.5 w-6 transition-all duration-300 ${isMobileMenuOpen || hasBg ? "bg-leepresso-deep dark:bg-white" : "bg-white"} ${isMobileMenuOpen ? "top-2 -rotate-45" : "top-[18px]"}`} />
              </div>
            </button>
          </div>
        </div>

        {/* [PC] 메가 메뉴 커튼 */}
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`absolute top-full left-0 w-full bg-leepresso-bg dark:bg-[#111] border-t border-leepresso-base dark:border-white/5 hidden lg:block transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${isHovered ? "max-h-[480px] opacity-100 shadow-2xl" : "max-h-0 opacity-0"}`}>
          <div className="max-w-[1500px] mx-auto px-12 py-9 text-center font-pretendard">
            <div className="grid grid-cols-5 gap-10 max-w-[750px] mx-auto">
              {NAV_MENU.map((menu) => (
                <div key={menu.title} className="flex flex-col items-center">
                  <div className="mb-3">
                    <span className="block text-[10px] text-leepresso-point font-black tracking-[0.35em] opacity-60 uppercase">{menu.eng}</span>
                    <div className="w-8 h-[1.3px] bg-leepresso-point/30 mt-2.5 mx-auto" />
                  </div>
                  <ul className="flex flex-col space-y-4">
                    {menu.sub.map((subItem, idx) => (
                      <li key={idx}>
                        <button onClick={() => handleNavClick(menu.path, subItem.id)} className="text-leepresso-deep/80 dark:text-gray-400 text-[15px] font-medium tracking-tight hover:text-leepresso-point dark:hover:text-white transition-all cursor-pointer whitespace-nowrap">
                          {subItem.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* [모바일] 사이드 메뉴 */}
      <div className={`fixed inset-0 bg-leepresso-bg dark:bg-[#111] z-[140] lg:hidden transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="h-20" />
        <div className="px-8 py-10 h-[calc(100vh-80px)] flex flex-col overflow-y-auto font-pretendard font-bold">
          <div className="flex-1">
            {NAV_MENU.map((menu) => (
              <div key={menu.title} className="mb-9">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-leepresso-point text-[10px] font-black tracking-[0.25em]">{menu.eng}</span>
                  <div className="h-px flex-1 bg-leepresso-point/15" />
                </div>
                <ul className="grid grid-cols-2 gap-y-5 gap-x-5">
                  {menu.sub.map((subItem, idx) => (
                    <li key={idx}>
                      <button onClick={() => handleNavClick(menu.path, subItem.id)} className="text-leepresso-deep dark:text-gray-200 text-[15.5px] font-bold tracking-tight active:text-leepresso-point transition-colors cursor-pointer text-left">
                        {subItem.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}