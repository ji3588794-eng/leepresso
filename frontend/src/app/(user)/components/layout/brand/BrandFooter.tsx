'use client';

import Image from "next/image";
import { Instagram, MessageCircle, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function BrandFooter() {
  const [openModal, setOpenModal] = useState<"terms" | "privacy" | null>(null);

useEffect(() => {
    if (!openModal) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenModal(null);
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [openModal]);

  const termsContent = useMemo(() => `
제1조 (목적)
본 약관은 주식회사 리프레소(이하 "회사")가 운영하는 웹사이트에서 제공하는 브랜드 정보 제공, 무인카페 프랜차이즈 창업 상담 신청, 고객의 소리 게시판 서비스의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (운영자 정보)
1. 상호명 : 주식회사 리프레소
2. 대표자 : 이정원
3. 사업자등록번호 : 254-88-03655
4. 주소 : 충남 천안시 서북구 차암동 13 룩소르비즈타워 B107호
5. 대표번호 : 1522-0290
6. 이메일 : leepresso24@naver.com

제3조 (제공 서비스)
회사는 다음 각 호의 서비스를 제공합니다.
1. 리프레소 브랜드 소개 및 정보 제공
2. 무인카페 프랜차이즈 창업 상담 신청 접수
3. 고객의 소리 게시판 운영
4. 기타 회사가 정하는 서비스

제4조 (회원가입 없음)
1. 회사 사이트는 별도 회원가입 없이 이용할 수 있습니다.
2. 이용자는 비로그인 상태로 문의 접수 및 고객의 소리 게시판 작성이 가능합니다.
3. 고객의 소리 게시판은 작성 시 입력한 비밀번호를 통해 본인 확인 절차를 진행할 수 있습니다.

제5조 (상담 신청 및 문의)
1. 이용자는 회사가 제공하는 양식에 따라 창업 상담을 신청할 수 있습니다.
2. 문의 접수 시 필수 입력 항목은 연락처이며, 그 외 항목은 선택 입력입니다.
3. 회사는 접수된 문의 내용을 검토한 후 전화, 이메일 등으로 답변할 수 있습니다.

제6조 (게시판 이용)
1. 이용자는 고객의 소리 게시판에 타인의 권리를 침해하거나 법령에 위반되는 내용을 게시해서는 안 됩니다.
2. 다음 각 호에 해당하는 경우 회사는 사전 통지 없이 게시물을 제한, 수정 또는 삭제할 수 있습니다.
   가. 타인에 대한 비방, 명예훼손, 욕설, 혐오표현이 포함된 경우
   나. 허위 사실 또는 불법 정보가 포함된 경우
   다. 광고, 홍보, 스팸성 게시물인 경우
   라. 타인의 개인정보를 무단으로 포함한 경우
   마. 기타 관련 법령 또는 공서양속에 반하는 경우

제7조 (지식재산권)
1. 사이트 내 디자인, 문구, 이미지, 상표, 로고 등 일체의 콘텐츠에 대한 권리는 회사 또는 정당한 권리자에게 있습니다.
2. 이용자는 회사의 사전 동의 없이 이를 복제, 배포, 전송, 수정, 상업적으로 이용할 수 없습니다.

제8조 (서비스 변경 및 중단)
회사는 운영상, 기술상 필요에 따라 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다.

제9조 (회사의 책임 제한)
1. 회사는 천재지변, 통신 장애, 시스템 점검 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.
2. 회사는 이용자가 게시한 정보의 정확성, 신뢰성에 대하여 보증하지 않습니다.
3. 회사는 이용자의 귀책사유로 발생한 손해에 대해서는 책임을 지지 않습니다.

제10조 (준거법 및 관할)
본 약관은 대한민국 법령에 따르며, 서비스 이용과 관련하여 분쟁이 발생할 경우 회사 본점 소재지를 관할하는 법원을 전속 관할법원으로 합니다.

부칙
본 약관은 2026년 3월 19일부터 시행합니다.
  `.trim(), []);

  const privacyContent = useMemo(() => `
주식회사 리프레소(이하 "회사")는 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를 보호하기 위하여 다음과 같이 개인정보처리방침을 수립·공개합니다.

1. 개인정보의 처리 목적
회사는 다음 목적 범위 내에서 개인정보를 처리합니다.
1) 프랜차이즈 창업 상담 신청 접수 및 응대
2) 고객의 소리 게시판 운영 및 문의 응대
3) 답변, 안내, 공지, 민원 처리
4) 서비스 운영 및 보안 관리

2. 처리하는 개인정보 항목
회사는 다음 개인정보를 처리할 수 있습니다.

가. 가맹 상담 신청
- 필수항목 : 연락처
- 선택항목 : 성함, 이메일, 창업희망지역, 점포보유여부, 문의경로, 문의내용

나. 고객의 소리 게시판
- 작성 시 입력 정보 : 성함(또는 작성자명), 비밀번호, 연락처 또는 이메일, 게시글 내용
※ 실제 게시판 운영 항목은 서비스 화면 기준으로 달라질 수 있습니다.

다. 서비스 이용 과정에서 자동으로 생성될 수 있는 정보
- 접속 로그, IP 주소, 브라우저 정보, 쿠키, 접속 일시, 이용기록

3. 개인정보의 보유 및 이용기간
회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 다만 다음의 경우 일정 기간 보관할 수 있습니다.
1) 가맹 상담 문의 정보 : 상담 완료 후 1년
2) 고객의 소리 게시글 및 답변 이력 : 작성일로부터 1년 또는 이용자 삭제 요청 시까지
3) 관계 법령에 따라 보관이 필요한 경우 해당 법령에서 정한 기간

4. 개인정보의 제3자 제공
회사는 이용자의 개인정보를 외부에 제3자 제공하지 않습니다.

5. 개인정보 처리의 위탁
회사는 원활한 서비스 제공을 위하여 아래와 같이 일부 업무를 위탁할 수 있습니다.
1) 카카오톡 채널 : 상담 및 문의 응대
2) SMS 또는 이메일 발송 서비스 제공업체 : 고객의 소리 게시판 답변 또는 문의 응대 알림 발송
※ 관련 수탁업체가 확정되거나 변경되는 경우 본 방침을 통하여 고지합니다.

6. 이용자의 권리와 행사 방법
이용자는 언제든지 자신의 개인정보에 대하여 열람, 정정, 삭제, 처리정지를 요청할 수 있습니다.
회사는 관련 법령에 특별한 규정이 없는 한 지체 없이 조치하겠습니다.

7. 개인정보의 파기 절차 및 방법
1) 파기 절차
회사는 개인정보 보유기간의 경과, 처리 목적 달성 등으로 개인정보가 불필요하게 되었을 때에는 지체 없이 파기합니다.
2) 파기 방법
- 전자적 파일 형태 : 복구 또는 재생되지 않도록 안전하게 삭제
- 종이 문서 형태 : 분쇄 또는 소각

8. 개인정보의 안전성 확보조치
회사는 개인정보의 안전성 확보를 위하여 다음과 같은 조치를 취하고 있습니다.
1) 개인정보 접근 권한 최소화
2) 접근 통제 및 관리
3) 비밀번호 등 중요정보의 안전한 저장 노력
4) 보안 프로그램 및 시스템 점검
5) 개인정보 취급자에 대한 관리

9. 쿠키의 이용
회사는 서비스 이용 과정에서 쿠키를 사용할 수 있습니다. 이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 일부 기능 이용에 제한이 있을 수 있습니다.

10. 개인정보 보호책임자
회사는 개인정보 처리에 관한 업무를 총괄하여 책임지고, 개인정보 관련 문의 및 불만처리 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

- 성명 : 유기홍
- 부서 : 개발팀
- 직위 : 대리
- 이메일 : horus97alas@gmail.com

11. 개인정보 관련 문의
개인정보 보호와 관련한 문의는 아래 연락처로 하실 수 있습니다.
- 대표번호 : 1522-0290
- 이메일 : leepresso24@naver.com
- 개인정보 보호책임자 이메일 : horus97alas@gmail.com

12. 방침 변경
본 개인정보처리방침은 법령, 서비스 내용 또는 내부 운영방침 변경에 따라 수정될 수 있으며, 변경 시 웹사이트를 통해 공지합니다.

부칙
본 방침은 2026년 3월 19일부터 시행합니다.
  `.trim(), []);

  const modalTitle =
    openModal === "terms"
      ? "이용약관"
      : openModal === "privacy"
      ? "개인정보처리방침"
      : "";

  const modalContent =
    openModal === "terms"
      ? termsContent
      : openModal === "privacy"
      ? privacyContent
      : "";

  return (
    <>
      <footer className="relative w-full overflow-hidden border-t border-white/5 bg-[#241E1A] pt-12 pb-8 font-suit text-[#EAE3D9] transition-colors duration-500 dark:bg-[#0D0C0B]">
        <div
          className="absolute bottom-30 right-10 translate-x-0 transform select-none opacity-10 transition-all duration-700 ease-in-out pointer-events-none
          lg:top-5 lg:right-22 lg:bottom-auto lg:translate-x-1/4 lg:-translate-y-2"
        >
          <Image
            src="/footer_icon.png"
            alt="Brand Symbol"
            width={280}
            height={80}
            className="w-[160px] object-contain lg:w-[280px]"
            priority
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="mb-10 grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-8">
            <div className="space-y-5 lg:col-span-4">
              <div className="relative ml-[-6px] h-[40px] w-[100px] opacity-100">
                <Image
                  src="/logo_white.png"
                  alt="LEEPRESSO Logo"
                  fill
                  className="object-contain"
                />
              </div>

              <p className="break-keep text-[14px] leading-relaxed font-bold tracking-tight text-[#EAE3D9]/80 md:text-[15px]">
                가맹점주와 고객 모두를 위한 <br />
                <span className="font-black text-leepresso-point">
                  최고의 가성비 무인카페 브랜드
                </span>
              </p>

              <div className="-mt-[10px] flex items-center gap-3">
                <a
                  href="https://pf.kakao.com/_unsxbn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-all hover:border-leepresso-point hover:bg-leepresso-point"
                >
                  <MessageCircle
                    size={15}
                    fill="currentColor"
                    className="text-white/80 transition-colors group-hover:text-white"
                  />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-all hover:border-leepresso-point hover:bg-leepresso-point"
                >
                  <Instagram
                    size={15}
                    className="text-white/80 transition-colors group-hover:text-white"
                  />
                </a>

                <a
                  href="https://blog.naver.com/mhkopi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-all hover:border-leepresso-point hover:bg-leepresso-point"
                >
                  <span className="text-[11px] font-black text-white/80 transition-colors group-hover:text-white">
                    B
                  </span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <h3 className="mb-6 text-[11px] font-black uppercase tracking-[0.3em] text-leepresso-point opacity-90">
                Company Info
              </h3>

              <ul className="space-y-2.5 text-[13px] text-[#EAE3D9]/70 md:text-[14px]">
                <li className="flex gap-4">
                  <span className="w-14 shrink-0 text-[11px] font-bold opacity-50">상호명</span>
                  <span className="font-semibold text-[#EAE3D9]">(주)리프레소</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-14 shrink-0 text-[11px] font-bold opacity-50">대표자</span>
                  <span className="font-semibold text-[#EAE3D9]">이정원</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-14 shrink-0 text-[11px] font-bold opacity-50">사업자번호</span>
                  <span className="font-semibold tracking-tighter text-[#EAE3D9]">254-88-03655</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-14 shrink-0 text-[11px] font-bold opacity-50">주소</span>
                  <span className="text-[13px] font-medium leading-snug break-keep text-[#EAE3D9]/90">
                    충남 천안시 서북구 차암동 13 룩소르비즈타워 B107호
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h3 className="mb-6 text-[11px] font-black uppercase tracking-[0.3em] text-leepresso-point opacity-90">
                Contact Us
              </h3>

              <div className="space-y-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold opacity-50">가맹 문의</span>
                  <span className="text-2xl font-black tracking-tighter text-white">1522-0290</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold opacity-50">이메일 문의</span>
                  <span className="text-[14px] font-bold tracking-tight text-[#EAE3D9]">
                    leepresso24@naver.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
            <div className="flex flex-col items-center gap-4 text-center md:flex-row md:gap-6 md:text-left">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] opacity-40">
                <p>© 2026 LEEPRESSO</p>
                <div className="h-0.5 w-0.5 rounded-full bg-current" />
                <p>All rights reserved</p>
              </div>

              <div className="flex gap-4 text-[12px] font-bold opacity-80">
                <button
                  type="button"
                  onClick={() => setOpenModal("terms")}
                  className="font-black text-white transition-colors hover:text-leepresso-point"
                >
                  이용약관
                </button>

                <button
                  type="button"
                  onClick={() => setOpenModal("privacy")}
                  className="font-black text-white transition-colors hover:text-leepresso-point"
                >
                  개인정보처리방침
                </button>
              </div>
            </div>

            <p className="hidden text-[11px] font-medium tracking-tight opacity-40 lg:block">
              본 사이트의 무단 복제를 금합니다.
            </p>
          </div>
        </div>
      </footer>

      {openModal && (
        <div className="fixed inset-0 z-[9999]">
          <button
            type="button"
            aria-label="모달 닫기"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={() => setOpenModal(null)}
          />

          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
            <div className="relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] border border-[#E8D5C4] bg-[#F9F5F0] shadow-[0_20px_80px_rgba(0,0,0,0.28)]">
              <div className="relative border-b border-[#E8D5C4] bg-white/75 px-5 py-4 backdrop-blur md:px-7 md:py-5">
                <div className="pr-10">
                  <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[#8D7B68]">
                    LEEPRESSO POLICY
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-[#3E3232] md:text-3xl">
                    {modalTitle}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenModal(null)}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#E8D5C4] bg-white text-[#3E3232] transition-all hover:bg-[#3E3232] hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-y-auto px-5 py-5 md:px-7 md:py-6">
                <div className="rounded-[22px] border border-[#E8D5C4] bg-white px-4 py-4 md:px-6 md:py-6">
                  <pre className="whitespace-pre-wrap break-keep font-suit text-[13px] leading-7 text-[#3E3232]/88 md:text-[14px] md:leading-8">
                    {modalContent}
                  </pre>
                </div>
              </div>

              <div className="border-t border-[#E8D5C4] bg-[#F4EEE7] px-5 py-4 md:px-7">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <p className="text-[12px] font-bold text-[#3E3232]/60">
                    문의: 1522-0290 · mhddcoffee@naver.com
                  </p>

                  <button
                    type="button"
                    onClick={() => setOpenModal(null)}
                    className="inline-flex items-center justify-center rounded-xl bg-[#3E3232] px-5 py-3 text-sm font-black text-white transition-all hover:bg-[#8D7B68]"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}