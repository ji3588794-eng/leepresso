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
      <footer className="relative w-full overflow-hidden border-t border-[#544646] bg-[#3e3232] pt-16 pb-12 font-suit dark:border-[#3E3232] dark:bg-[#0D0C0B]">
        
        {/* 배경 이미지 컨테이너: 
          - right를 [5vw]로 설정하여 이미지를 더 좌측으로 이동
          - linear-gradient의 마지막 세그먼트를 추가하여 우측 끝부분을 완전히 어둡게 처리
        */}
        <div 
          className="absolute top-0 right-[5vw] h-full w-[50vw] pointer-events-none select-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #3e3232 0%, rgba(62, 50, 50, 0.8) 15%, transparent 35%),
              linear-gradient(to left, #3e3232 0%, rgba(62, 50, 50, 0.7) 20%, transparent 50%),
              linear-gradient(to bottom, #3e3232 0%, transparent 15%),
              linear-gradient(to top, #3e3232 0%, transparent 15%),
              url('/franchise-footer-back.png')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.2, // 가독성을 위해 투명도 소폭 하향 조정
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1420px] px-6 lg:px-6">
          
          {/* 상단: 로고 및 간단 설명 */}
          <div className="mb-10 border-b border-[#544646]/50 pb-8">
            <h1 className="mb-1 text-[30px] font-black tracking-tighter text-white">
              LEE<span className="text-[#A69689]">PRESSO</span>
            </h1>
            <p className="mt-2 text-[16px] font-bold tracking-tight text-[#A69689]">
              무인카페 창업의 정석, 일상이 수익이 되는 실속 있는 파트너 리프레소
            </p>
            <p className="text-[16px] font-medium text-[#888]">
              가성비로 완성하는 스마트한 창업의 시작
            </p>
          </div>

          {/* 하단 메인 정보 영역 */}
          <div className="flex flex-col justify-between gap-12 lg:flex-row">
            
            {/* 좌측: 기업 상세 정보 */}
            <div className="flex flex-col gap-8">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] font-semibold text-white">
                  <p>상호명: (주)리프레소</p>
                  <span className="hidden h-3 w-[1px] bg-[#544646] lg:block" />
                  <p>대표자: 이정원</p>
                  <span className="hidden h-3 w-[1px] bg-[#544646] lg:block" />
                  <p>사업자번호: 254-88-03655</p>
                </div>
                <p className="text-[14px] text-[#CCC]">
                  주소: 충남 천안시 서북구 차암동 13 룩소르비즈타워 B107호
                </p>
              </div>

              {/* 연락처 섹션 */}
              <div className="flex flex-wrap gap-4">
                <a href="tel:1522-0290" className="flex items-center gap-3 bg-[#4e4141]/60 backdrop-blur-md px-5 py-3 text-[15px] font-bold text-white transition-all hover:bg-[#5a4d4d] border border-white/5">
                  <Phone size={16} className="text-[#A69689]" />
                  TEL | &nbsp;1522-0290
                </a>
                <a href="mailto:leepresso24@naver.com" className="flex items-center gap-3 bg-[#4e4141]/60 backdrop-blur-md px-5 py-3 text-[15px] font-bold text-white transition-all hover:bg-[#5a4d4d] border border-white/5">
                  <Mail size={16} className="text-[#A69689]" />
                  E-MAIL | &nbsp;leepresso24@naver.com
                </a>
              </div>
            </div>

            {/* 우측: 약관 및 카피라이트 */}
            <div className="flex flex-col justify-between items-center lg:items-end">
              {/* 약관 버튼 영역: 가독성을 위해 그림자(drop-shadow) 또는 폰트 가중치 확인 */}
              <div className="flex gap-8 text-[13px] font-bold drop-shadow-md">
                <button
                  type="button"
                  onClick={() => setOpenModal("terms")}
                  className="text-[#bbb] transition-colors hover:text-white"
                >
                  이용약관
                </button>
                <button
                  type="button"
                  onClick={() => setOpenModal("privacy")}
                  className="text-white underline underline-offset-8 decoration-[#A69689]"
                >
                  개인정보처리방침
                </button>
              </div>
              
              <div className="mt-10 text-center lg:mt-0 lg:text-right">
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#888] drop-shadow-sm">
                  © 2026 LEEPRESSO. ALL RIGHTS RESERVED.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODAL ================= (로직 동일) */}
      {openModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#241E1A]/95 backdrop-blur-md" onClick={() => setOpenModal(null)} />
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
                  <p>본 사이트는 (주)리프레소에서 제공하는 무인카페 프랜차이즈 상담 서비스입니다.</p>
                  <p className="font-bold text-[#3E3232]">상담 신청 시 수집된 정보는 정확한 창업 안내를 위해서만 사용됩니다.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="border-l-2 border-[#3E3232] bg-[#FBF9F7] p-6">
                    <p className="mb-1 font-bold text-[#3E3232]">개인정보 수집 및 이용 동의</p>
                  </div>
                  <ul className="space-y-3">
                    <li><b className="text-[#3E3232]">수집항목:</b> 성함, 연락처, 지역, 문의내용</li>
                    <li><b className="text-[#3E3232]">보유기간:</b> <span className="font-bold text-[#A69689] underline underline-offset-4">상담 신청 후 1년</span></li>
                  </ul>
                </div>
              )}
            </div>
            <div className="bg-[#FBF9F7] px-8 py-5">
              <button onClick={() => setOpenModal(null)} className="w-full bg-[#3E3232] py-4 text-[14px] font-black text-white">닫기</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}