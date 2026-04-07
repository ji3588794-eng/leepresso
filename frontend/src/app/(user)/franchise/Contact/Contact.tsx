"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import "./Contact.scss";

const channels = ["웹검색", "인스타", "블로그", "유튜브", "지인추천", "기타"];
const regions = ["서울/경기", "인천", "충청/대전", "전라/광주", "경상/대구/부산", "강원/제주", "기타"];

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [showFixedBar, setShowFixedBar] = useState(false); // 스크롤 감지 상태 추가
  const sectionRef = useRef<HTMLElement>(null);

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
        alert("성공 창업을 위한 첫 걸음, 리프레소 가맹 상담 신청이 완료되었습니다! \n보내주신 소중한 정보 확인 후, 빠르게 연락드려 상세히 안내해 드리겠습니다.");
        form.reset();
      } else {
        alert(`서버 응답 오류 (코드: ${response.status})`);
      }
    } catch (error) {
      alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    // 1. Footer 교차 감지
    const footer = document.querySelector("footer");
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtFooter(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footer) observer.observe(footer);

    // 2. 스크롤 감지
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowFixedBar(true);
      } else {
        setShowFixedBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section id="contact" className="contact" ref={sectionRef} style={{ position: 'relative' }}>
        <div className="container">
          <div className="header">
            <div className="title-txts5">
              <img src="/franchise-title5.png" alt="가맹상담 신청" />
            </div>
          </div>

          <div className="grid-centered">
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
                <div className="privacyScroll">
                  <p className="p_title">[개인정보 수집 및 이용 동의 내용]</p>
                  <div className="p_content">
                    <p><strong>1. 개인정보 수집항목:</strong> 성함, 연락처, 이메일, 창업 희망 지역, 점포 보유 여부 등 상담 신청 양식 내 기재 정보</p>
                    <p><strong>2. 개인정보 수집 및 이용목적:</strong> 가맹 창업 상담 신청에 따른 본인 확인, 상담 안내 및 자료 전달, 가맹 관련 최신 정보 제공</p>
                    <p><strong>3. 개인정보의 보유 및 이용기간:</strong> 수집된 정보는 상담 완료 및 목적 달성 후 1년 간 보관되며, 기간 경과 시 즉시 파기됩니다.</p>
                    <p><strong>4. 동의 거부 권리:</strong> 귀하는 개인정보 수집에 동의를 거부할 권리가 있으나, 거부 시 가맹 상담 및 서비스 이용이 제한될 수 있습니다.</p>
                  </div>
                </div>
                <div className="p_agree">
                  <input type="checkbox" id="privacy" required />
                  <label htmlFor="privacy" className="customCheck">
                    <span className="checkIcon"></span>
                    <strong>개인정보 수집 및 이용 동의 (필수)</strong>
                  </label>
                </div>
              </div>

              <button type="submit" className="submitBtn">가맹 상담 신청하기</button>
            </form>
          </div>
        </div>

        {/* 하단 고정 바 */}
        <div className={`fixedBar ${showFixedBar ? "visible" : ""} ${isAtFooter ? "atFooter" : ""}`}>
          <form onSubmit={handleSubmit} className="barContainer">
            <div className="phone">가맹문의 1522-0290</div>
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
      </section>

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
                <p className="policy_main_title">리프레소(LEEPRESSO)는 예비 창업주의 소중한 개인정보를 안전하게 관리합니다.</p>
                <div className="policy_content_scroll">
                  <section>
                    <h4>1. 개인정보 수집 및 이용 목적</h4>
                    <p>가맹 창업 상담 서비스 제공, 본인 확인, 상담 이력 관리 및 원활한 상담 안내를 위한 목적</p>
                  </section>
                  <section>
                    <h4>2. 수집하는 개인정보 항목</h4>
                    <p>성함, 연락처, 이메일, 창업 희망 지역, 점포 보유 여부, 문의 경로 등 상담 신청에 필요한 최소 정보</p>
                  </section>
                  <section>
                    <h4>3. 개인정보의 보유 및 이용 기간</h4>
                    <p className="highlight">상담 신청일로부터 1년 보관 후 즉시 파기 (단, 관계 법령에 따라 보존이 필요한 경우 해당 기간까지 보관)</p>
                  </section>
                  <section>
                    <h4>4. 동의를 거부할 권리 및 불이익</h4>
                    <p>개인정보 수집 및 이용에 대해 동의를 거부할 권리가 있으나, 거부 시 가맹 상담 및 안내 서비스 이용이 제한될 수 있습니다.</p>
                  </section>
                </div>
              </div>
            </div>
            <button className="modalCloseBtn" onClick={() => setIsModalOpen(false)}>내용을 확인했습니다</button>
          </div>
        </div>
      )}
    </>
  );
}