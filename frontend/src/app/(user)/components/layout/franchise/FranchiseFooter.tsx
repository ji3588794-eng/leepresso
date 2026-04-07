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
        
        {/* 배경 이미지 컨테이너 */}
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
            opacity: 0.2,
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1420px] px-6 lg:px-6">
          
          {/* 상단: 로고 및 간단 설명 */}
          <div className="mb-10 border-b border-[#544646]/50 pb-8">
            <div className="mb-3 h-10 w-auto">
              <img 
                src="/logo_white.png" 
                alt="LEEPRESSO 로고" 
                className="h-full w-auto object-contain object-left block"
              />
            </div>
            <p className="mt-2 text-[16px] font-bold tracking-tight text-[#A69689]">
              무인카페 창업의 정석, 일상이 수익이 되는 실속 있는 파트너 리프레소
            </p>
            <p className="text-[16px] font-medium text-[#CCC]">
              가성비로 완성하는 스마트한 창업의 시작
            </p>
          </div>

          {/* 하단 메인 정보 영역 */}
          <div className="flex flex-col justify-between gap-12 lg:flex-row">
            
            {/* 좌측: 기업 상세 정보 */}
            <div className="flex flex-col gap-8">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] font-semibold text-white">
                  <p className="text-[#CCC]">상호명: (주)리프레소</p>
                  <span className="hidden h-3 w-[1px] bg-[#544646] lg:block" />
                  <p className="text-[#CCC]">대표자: 이정원</p>
                  <span className="hidden h-3 w-[1px] bg-[#544646] lg:block" />
                  <p className="text-[#CCC]">사업자번호: 254-88-03655</p>
                </div>
                <p className="text-[14px] text-[#CCC]">
                  주소: 충남 천안시 서북구 차암동 13 룩소르비즈타워 B107호
                </p>
              </div>

              {/* 연락처 섹션 */}
              <div className="flex flex-wrap gap-4">
                <a href="tel:1522-0290" className="flex items-center gap-3 bg-[#4e4141]/60 backdrop-blur-md px-5 py-3 text-[15px] font-bold text-white transition-all hover:bg-[#5a4d4d] border border-white/5 cursor-pointer">
                  <Phone size={16} className="text-[#A69689]" />
                  TEL | &nbsp;1522-0290
                </a>
                <a href="mailto:leepresso24@naver.com" className="flex items-center gap-3 bg-[#4e4141]/60 backdrop-blur-md px-5 py-3 text-[15px] font-bold text-white transition-all hover:bg-[#5a4d4d] border border-white/5 cursor-pointer">
                  <Mail size={16} className="text-[#A69689]" />
                  E-MAIL | &nbsp;leepresso24@naver.com
                </a>
              </div>
            </div>

            {/* 우측 하단 배치: 약관이 카피라이트 위로 오도록 수정 */}
            <div className="flex flex-col items-center lg:items-end justify-end">
              {/* 약관 버튼 영역 (카피라이트 바로 위) */}
              <div className="mb-4 flex gap-8 text-[13px] font-bold drop-shadow-md">
                <button
                  type="button"
                  onClick={() => setOpenModal("terms")}
                  className="text-[#bbb] transition-colors hover:text-white cursor-pointer"
                >
                  이용약관
                </button>
                <button
                  type="button"
                  onClick={() => setOpenModal("privacy")}
                  className="text-[#bbb] cursor-pointer"
                >
                  개인정보처리방침
                </button>
              </div>
              
              {/* 최하단 카피라이트 */}
              <div className="text-center lg:text-right">
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#888] drop-shadow-sm">
                  © 2026 LEEPRESSO. ALL RIGHTS RESERVED.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= 통합 디자인 모달 ================= */}
      {openModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#000]/80 backdrop-blur-sm cursor-pointer" onClick={() => setOpenModal(null)} />
          <div className="relative flex h-full max-h-[85vh] w-full max-w-2xl flex-col bg-white shadow-2xl overflow-hidden rounded-2xl">
            
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between border-b border-[#F4EEE7] bg-[#FBF9F7] px-6 py-5 sm:px-8">
              <h3 className="text-xl font-black tracking-tight text-[#3E3232]">{modalTitle}</h3>
              <button 
                onClick={() => setOpenModal(null)} 
                className="rounded-full p-1 transition-colors hover:bg-[#3E3232]/10 text-[#3E3232] cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* 모달 본문 */}
            <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8 font-suit text-[14px] leading-relaxed text-[#555]">
              {openModal === "terms" ? (
                <div className="space-y-8">
                  <section>
                    <h4 className="mb-3 text-[16px] font-black text-[#3E3232]">제 1 조 (목적)</h4>
                    <p>본 약관은 (주)리프레소(이하 "회사")가 운영하는 웹사이트에서 제공하는 창업 상담 및 관련 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                  </section>
                  <section>
                    <h4 className="mb-3 text-[16px] font-black text-[#3E3232]">제 2 조 (용어의 정의)</h4>
                    <p>1. "이용자"란 본 사이트에 접속하여 회사가 제공하는 서식을 통해 상담을 신청하는 모든 사용자를 말합니다.</p>
                    <p>2. "서비스"란 회사가 이용자에게 제공하는 가맹 상담, 정보 제공 및 관련 일체의 부대 서비스를 의미합니다.</p>
                  </section>
                  <section>
                    <h4 className="mb-3 text-[16px] font-black text-[#3E3232]">제 3 조 (약관의 효력 및 변경)</h4>
                    <p>회사는 관련 법령을 위배하지 않는 범위 내에서 본 약관을 개정할 수 있으며, 이용자가 상담을 신청함과 동시에 본 약관에 동의한 것으로 간주합니다.</p>
                  </section>
                  <section>
                    <h4 className="mb-3 text-[16px] font-black text-[#3E3232]">제 4 조 (서비스 이용 및 제한)</h4>
                    <p>1. 이용자는 회사가 정한 상담 양식에 정확한 정보를 기입해야 합니다.</p>
                    <p>2. 타인의 정보를 도용하거나 허위 사실을 기재할 경우 서비스 이용이 제한되거나 법적 책임을 질 수 있습니다.</p>
                  </section>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="border-l-4 border-[#3E3232] bg-[#FBF9F7] p-5">
                    <p className="font-bold text-[#3E3232] leading-snug">회사는 이용자의 개인정보를 소중하게 처리하며, 관련 법령을 준수합니다.</p>
                  </div>
                  <section>
                    <h4 className="mb-3 text-[16px] font-black text-[#3E3232]">1. 개인정보의 수집 및 이용 목적</h4>
                    <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>가맹 창업 상담 신청에 따른 본인 확인 및 안내</li>
                      <li>희망 지역 상권 분석 및 맞춤형 창업 정보 전달</li>
                      <li>상담 이력 관리 및 불만 처리 등 민원 처리</li>
                    </ul>
                  </section>
                  <section>
                    <h4 className="mb-3 text-[16px] font-black text-[#3E3232]">2. 수집하는 개인정보 항목</h4>
                    <p>성함, 연락처, 이메일, 희망 창업 지역, 점포 보유 여부, 문의 경로 등 상담 신청 양식에 기재된 일체의 정보</p>
                  </section>
                  <section>
                    <h4 className="mb-3 text-[16px] font-black text-[#3E3232]">3. 개인정보의 보유 및 이용기간</h4>
                    <p className="font-bold text-[#3E3232] underline underline-offset-4 decoration-[#A69689]">이용자의 개인정보는 상담 신청일로부터 1년 동안 보관되며, 기간 경과 시 즉시 파기됩니다.</p>
                    <p className="mt-2 text-[13px] text-[#888]">* 단, 이용자의 요청이 있을 경우 즉시 파기 처리합니다.</p>
                  </section>
                  <section>
                    <h4 className="mb-3 text-[16px] font-black text-[#3E3232]">4. 동의 거부 권리 및 불이익</h4>
                    <p>이용자는 개인정보 수집에 대해 동의를 거부할 권리가 있습니다. 다만, 필수 항목에 대한 동의 거부 시 정확한 창업 상담 서비스 제공이 불가능할 수 있습니다.</p>
                  </section>
                </div>
              )}
            </div>

            {/* 모달 하단 버튼 */}
            <div className="border-t border-[#F4EEE7] bg-[#FBF9F7] px-6 py-5 sm:px-8">
              <button 
                onClick={() => setOpenModal(null)} 
                className="w-full bg-[#3E3232] py-4 text-[15px] font-black text-white shadow-lg transition-transform active:scale-[0.98] rounded-xl cursor-pointer"
              >
                내용을 확인했습니다
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}