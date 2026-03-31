'use client';

import { useState, useEffect } from "react";
import { X, Phone, Mail } from "lucide-react";

export default function FranchiseFooter() {
  const [openModal, setOpenModal] = useState<"terms" | "privacy" | null>(null);

  useEffect(() => {
    if (!openModal) return;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenModal(null);
    };
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [openModal]);

  const modalTitle = openModal === "terms" ? "이용약관" : "개인정보처리방침";

  return (
    <>
      {/* 최상단에 border-top 추가 (리프레소 베이스 컬러 사용) */}
      <footer className="w-full border-t border-[#E8D5C4] bg-[#F9F5F0] pt-15 pb-30 font-suit dark:border-[#3E3232] dark:bg-[#0D0C0B]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
          
         {/* 상단: 컨택트 정보 */}
          <div className="mb-10 flex flex-col items-center justify-center gap-12 border-b border-[#EEE5DE] pb-10 md:flex-row md:gap-20 dark:border-[#241E1A]">
            <div className="text-center md:text-left">
              <span className="block text-[12px] font-black uppercase tracking-[0.4em] text-[#A69689] mb-2.5">전화문의</span>
              <a href="tel:1522-0290" className="flex items-center gap-3 text-[22px] font-black tracking-tight text-[#3E3232] transition-colors hover:text-[#8D7B68] dark:text-[#EAE3D9]">
                <Phone size={20} strokeWidth={2.5} />
                1522-0290
              </a>
            </div>
            
            <div className="text-center md:text-left">
              <span className="block text-[12px] font-black uppercase tracking-[0.4em] text-[#A69689] mb-2.5">이메일문의</span>
              <a href="mailto:leepresso24@naver.com" className="flex items-center gap-3 text-[22px] font-black tracking-tight text-[#3E3232] transition-colors hover:text-[#8D7B68] dark:text-[#EAE3D9]">
                <Mail size={20} strokeWidth={2.5} />
                leepresso24@naver.com
              </a>
            </div>
          </div>

          {/* 하단: 푸터 정보 */}
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-end">
            <div className="text-center lg:text-left">
              <h2 className="mb-6 text-[11px] font-black uppercase tracking-[0.5em] text-[#3E3232] dark:text-white">
                LEEPRESSO FRANCHISE
              </h2>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] font-medium text-[#888] lg:justify-start">
                <p>상호명: (주)리프레소</p>
                <p>사업자번호: 254-88-03655</p>
                <p>대표자: 이정원</p>
                <p className="w-full lg:w-auto">주소: 충남 천안시 서북구 차암동 13 룩소르비즈타워 B107호</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 lg:items-end">
              {/* 약관 링크 */}
              <div className="flex gap-8 text-[12px] font-bold">
                <button
                  type="button"
                  onClick={() => setOpenModal("terms")}
                  className="text-[#888] transition-colors hover:text-[#3E3232] dark:hover:text-white"
                >
                  이용약관
                </button>
                <button
                  type="button"
                  onClick={() => setOpenModal("privacy")}
                  className="relative text-[#3E3232] dark:text-white after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:bg-[#3E3232] dark:after:bg-white"
                >
                  개인정보처리방침
                </button>
              </div>
              <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-[#CCC]">
                © 2026 LEEPRESSO. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#241E1A]/90 backdrop-blur-md" onClick={() => setOpenModal(null)} />

          <div className="relative w-full max-w-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F4EEE7] px-8 py-6">
              <h3 className="text-lg font-black tracking-tighter text-[#3E3232]">{modalTitle}</h3>
              <button onClick={() => setOpenModal(null)} className="transition-opacity text-[#3E3232] hover:opacity-50">
                <X size={24} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-8 font-suit text-[13px] leading-7 text-[#666]">
              {openModal === "terms" ? (
                <div className="space-y-6">
                  <p>본 사이트는 (주)리프레소에서 제공하는 무인카페 프랜차이즈 상담 서비스입니다. 이용자는 별도의 가입 없이 정보를 열람하고 상담을 신청할 수 있습니다.</p>
                  <p className="font-bold text-[#3E3232]">상담 신청 시 수집된 정보는 정확한 창업 안내를 위해서만 사용됩니다.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="border-l-2 border-[#3E3232] bg-[#FBF9F7] p-6">
                    <p className="mb-1 font-bold text-[#3E3232]">개인정보 수집 및 이용 동의</p>
                    <p>리프레소는 예비 창업주의 소중한 정보를 안전하게 관리합니다.</p>
                  </div>
                  <ul className="space-y-3">
                    <li><b className="text-[#3E3232]">수집항목:</b> 성함, 연락처, 지역, 문의내용</li>
                    <li><b className="text-[#3E3232]">수집목적:</b> 가맹 창업 상담 및 관련 정보 제공</li>
                    <li><b className="text-[#3E3232]">보유기간:</b> <span className="font-bold text-[#A69689] underline underline-offset-4">상담 신청 후 1년 (목적 달성 시 즉시 파기)</span></li>
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-[#FBF9F7] px-8 py-5">
              <button
                onClick={() => setOpenModal(null)}
                className="w-full bg-[#3E3232] py-4 text-[14px] font-black text-white transition-colors hover:bg-[#241E1A]"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}