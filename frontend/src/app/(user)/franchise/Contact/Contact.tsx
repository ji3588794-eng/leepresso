"use client";
import { useState } from "react";
import { X } from "lucide-react";
import "./Contact.scss";

const channels = ["웹검색", "매장방문", "인스타", "블로그", "유튜브", "지인추천", "기타"];
const regions = ["서울/경기", "인천", "충청/대전", "전라/광주", "경상/대구/부산", "강원/제주"];

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      customer_name: formData.get("customer_name"),
      phone_number: formData.get("phone_number"),
      email: formData.get("email"),
      hope_region: formData.get("hope_region"),
      has_store: formData.get("has_store") === "유" ? "Y" : "N",
      inquiry_channels: formData.getAll("inquiry_channels").join(","),
      inquiry_content: formData.get("inquiry_content") || "",
      user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/franchise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("가맹 상담 신청이 완료되었습니다.");
        form.reset();
      } else {
        alert(`서버 응답 오류 (코드: ${response.status})`);
      }
    } catch (error) {
      alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <>
      <section id="contact" className="contact">
        <div className="container">
          <div className="header">
            <span className="subTitle">Success with LEEPRESSO</span>
            <h2>가맹 상담 신청</h2>
          </div>

          <div className="grid">
            {/* 좌측: 창업 유도 카드 (완전 개편) */}
            <div className="infoCard promotional">
              <div className="dreamBox">
                <span className="small subTitle text-[#E8D5C4] dark:text-[#EAE3D9]">Why LEEPRESSO</span>
                
                {/* 메인 창업 유도 카피 */}
                <h4 className="mainTitle text-white">
                  막연한 창업의 꿈, <br />
                  <span className="text-[#8D7B68] dark:text-[#E8D5C4]">LEEPRESSO</span>와 함께<br />
                  현실로 만드세요.
                </h4>
                
                {/* 보내주신 이미지 문구를 재구성 */}
                <p className="desc text-[#A69689] dark:text-[#BBB]">
                  "언젠가는 카페 사장님이 되어야지.." <br />
                  그 막연한 <span className="font-bold text-[#E8D5C4] dark:text-[#EAE3D9]">‘언젠가’</span>를<br />
                  바로 <span className="font-bold text-[#E8D5C4] dark:text-[#EAE3D9]">‘오늘’</span>로 바꾸는 상담입니다.
                </p>
                
                <p className="subDesc text-white opacity-80">
                  성공적인 출점을 위해 가맹점주의 조건에 <br />
                  딱 맞춘 실행 가능한 방향을 검토합니다.
                </p>
              </div>

              {/* 하단 배경 아이콘 이미지 영역 */}
              <div className="bgImage"></div>

              <div className="contactInfo text-white">
                <div className="c_item">
                  <span>상담전화</span>
                  <strong>1522-0290</strong>
                </div>
                <div className="c_item">
                  <span>이메일</span>
                  <strong>leepresso24@naver.com</strong>
                </div>
                <div className="c_item">
                  <span>상담시간</span>
                  <strong>평일 09:00 - 18:00</strong>
                </div>
              </div>
            </div>

            {/* 우측: 신청 폼 (기존 유지) */}
            <form onSubmit={handleSubmit} className="formCard">
              <div className="inputGrid">
                <div className="field">
                  <label>성함</label>
                  <input name="customer_name" type="text" placeholder="성함 입력" required />
                </div>
                <div className="field">
                  <label>연락처 *</label>
                  <input name="phone_number" type="tel" placeholder="010-0000-0000" required />
                </div>
                <div className="field">
                  <label>이메일</label>
                  <input name="email" type="email" placeholder="example@email.com" />
                </div>
                <div className="field">
                  <label>창업 희망 지역</label>
                  <select name="hope_region">
                    <option value="">지역 선택</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="field full">
                  <label>점포 보유 여부</label>
                  <div className="radioGroup">
                    {["유", "무"].map((opt) => (
                      <label key={opt} className="radioLabel">
                        <input type="radio" name="has_store" value={opt} defaultChecked={opt === "무"} />
                        <span>점포 {opt === "유" ? "있음" : "없음"}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="field full">
                  <label>문의 경로 (중복 선택)</label>
                  <div className="checkGrid">
                    {channels.map((ch) => (
                      <label key={ch} className="checkLabel">
                        <input type="checkbox" name="inquiry_channels" value={ch} />
                        <span>{ch}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="field full">
                  <label>상세 문의 내용</label>
                  <textarea name="inquiry_content" placeholder="궁금하신 내용을 적어주세요." rows={3}></textarea>
                </div>
              </div>

              <div className="privacyBox">
                <div className="p_agree">
                  <input type="checkbox" id="privacy" required />
                  <label htmlFor="privacy"><strong>개인정보 수집 및 이용 동의 (필수)</strong></label>
                </div>
                <p className="p_text">상담 신청 접수를 위해 연락처를 수집하며, 1년 보관 후 파기됩니다.</p>
              </div>

              <button type="submit" className="submitBtn">가맹 상담 신청하기</button>
            </form>
          </div>
        </div>
      </section>

      {/* FIXED BOTTOM BAR */}
      <div className="fixedBar">
        <form onSubmit={handleSubmit} className="barContainer">
          <div className="phone">1522-0290</div>
          
          <div className="inputArea">
            <input name="customer_name" placeholder="성함" required />
            <input name="phone_number" placeholder="연락처" required />
            <select name="hope_region">
              <option value="">희망지역 선택</option>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="btnArea">
            <div className="f_agree_wrapper">
              <input type="checkbox" id="bar_agree" required />
              <label htmlFor="bar_agree" className="f_agree_label">
                <span className="underline_text" onClick={(e) => {
                  e.preventDefault(); 
                  setIsModalOpen(true);
                }}>개인정보처리동의</span>
              </label>
            </div>
            <button type="submit">빠른 창업상담</button>
          </div>
        </form>
      </div>

      {/* 개인정보처리방침 모달 */}
      {isModalOpen && (
        <div className="contactModal">
          <div className="modalOverlay" onClick={() => setIsModalOpen(false)} />
          <div className="modalContent">
            <div className="modalHeader">
              <h3>개인정보처리방침</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <div className="modalBody">
              <div className="policyBox">
                <p className="strong">리프레소는 예비 창업주의 정보를 안전하게 관리합니다.</p>
                <ul>
                  <li><b>수집항목:</b> 성함, 연락처, 희망지역</li>
                  <li><b>수집목적:</b> 가맹 창업 상담 및 안내</li>
                  <li><b>보유기간:</b> 상담 완료 후 1년 보관 (파기 요청 시 즉시 파기)</li>
                </ul>
              </div>
            </div>
            <button className="modalCloseBtn" onClick={() => setIsModalOpen(false)}>확인</button>
          </div>
        </div>
      )}
    </>
  );
}