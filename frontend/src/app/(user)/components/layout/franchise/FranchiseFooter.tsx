'use client';

import { useState, useEffect } from "react";
import { X } from "lucide-react";

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

  return (
    <>
      <footer className="bg-gray-50 dark:bg-[#0f0f0f] py-16 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 text-center">
          <h2 className="text-xl font-black text-leepresso-deep dark:text-white mb-6 uppercase">
            LEEPRESSO Franchise Center
          </h2>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-500 dark:text-gray-400 mb-8 font-medium">
            <p>상호: (주)리프레소</p>
            <p>사업자번호: 254-88-03655</p>
            <p>대표자: 이정원</p>
            <p>주소: 충남 천안시 서북구 차암동 13 룩소르비즈타워 B107호</p>
          </div>

          {/* 버튼 영역 수정 */}
          <div className="flex justify-center gap-6 mb-8 text-xs font-bold text-gray-400">
            <button
              onClick={() => setOpenModal("terms")}
              className="hover:text-leepresso-point"
            >
              이용약관
            </button>

            <button
              onClick={() => setOpenModal("privacy")}
              className="hover:text-leepresso-point text-leepresso-deep dark:text-white"
            >
              개인정보처리방침
            </button>

            <a href="#contact" className="hover:text-leepresso-point">
              가맹문의
            </a>
          </div>

          <p className="text-[10px] text-gray-400 uppercase tracking-widest opacity-50">
            © 2026 LEEPRESSO STARTUP. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ================= MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center px-4">
          <div className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-2xl bg-white p-8 shadow-2xl">

            {/* 닫기 버튼 */}
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            {/* 내용 */}
            <div className="overflow-y-auto pr-2 max-h-[70vh] text-[13px] leading-6 text-gray-700">

              {openModal === "terms" && (
                <>
                  <h2 className="text-xl font-black mb-4">이용약관</h2>

                  <p className="mb-3">
                    본 사이트는 주식회사 리프레소가 운영하는 무인카페 프랜차이즈 상담 서비스입니다.
                  </p>

                  <p className="mb-3">
                    본 서비스는 회원가입 없이 이용 가능하며, 가맹 상담 신청 및 정보 제공을 목적으로 합니다.
                  </p>

                  <p className="mb-3">
                    이용자는 상담 신청 시 정확한 정보를 입력해야 하며, 허위 정보 입력으로 발생하는 문제에 대한 책임은 이용자에게 있습니다.
                  </p>

                  <p className="mb-3">
                    본 사이트는 별도의 결제 기능이 없으며, 모든 상담은 무료로 진행됩니다.
                  </p>

                  <p>
                    회사는 서비스 운영을 위해 필요한 범위 내에서 내용을 변경할 수 있습니다.
                  </p>
                </>
              )}

              {openModal === "privacy" && (
                <>
                  <h2 className="text-xl font-black mb-4">개인정보처리방침</h2>

                  <p className="mb-3">
                    주식회사 리프레소는 가맹 상담 서비스를 위해 최소한의 개인정보를 수집합니다.
                  </p>

                  <p className="mb-3">
                    <b>수집 항목</b><br />
                    연락처(필수), 성함, 이메일, 창업희망지역, 점포보유여부, 문의경로, 문의내용
                  </p>

                  <p className="mb-3">
                    <b>수집 목적</b><br />
                    가맹 상담 접수 및 상담 진행, 문의 응대
                  </p>

                  <p className="mb-3">
                    <b>보유 기간</b><br />
                    상담 완료 후 1년 보관 후 파기
                  </p>

                  <p className="mb-3">
                    <b>제3자 제공</b><br />
                    없음 (모든 데이터는 리프레소 내부에서 관리)
                  </p>

                  <p className="mb-3">
                    <b>외부 위탁</b><br />
                    카카오톡 채널, 향후 SMS/이메일 발송 시스템
                  </p>

                  <p>
                    <b>개인정보 보호책임자</b><br />
                    유기홍 (개발팀)<br />
                    이메일: horus97alas@gmail.com
                  </p>
                </>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}