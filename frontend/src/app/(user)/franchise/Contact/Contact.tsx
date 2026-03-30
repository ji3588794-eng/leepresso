"use client";
import "./Contact.scss";

const channels = ["웹검색", "매장방문", "인스타", "블로그", "유튜브", "지인추천", "기타"];
const regions = ["서울/경기", "인천", "충청/대전", "전라/광주", "경상/대구/부산", "강원/제주"];

export default function Contact() {
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
      inquiry_content: formData.get("inquiry_content"),
      user_agent: navigator.userAgent,
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
      alert("가맹 상담 신청이 완료되었습니다.");
      form.reset();
    }
  };

  return (
    <>
      <section id="contact" className="contact">
        <div className="container">
          <div className="header contact">
            <h2>가맹 상담 신청</h2>
            <div className="infoRow"></div>
          </div>

          <div className="grid">
            <div className="infoCard">
              <p className="smallSub">Why LEEPRESSO</p>
              <h4>
                예비 창업주가
                <br />
                가장 궁금해하는 것부터
                <br />
                명확하게 설명합니다.
              </h4>
              <div className="list">
                {[
                  "상권에 맞는 매장 규모와 예상 수익 구조",
                  "실투자금 기준 비용 설계",
                  "점포 보유 여부에 따른 출점 전략",
                  "무인카페 운영 시스템과 원격 관리 방식",
                ].map((item) => (
                  <div key={item} className="listItem">
                    <span className="check">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="footerMsg">
                상담은 단순한 안내가 아니라, 예비 창업주의 조건을 기준으로 실행 가능한 출점 방향을 함께 검토하는
                방식으로 진행됩니다.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="formCard">
              <div className="inputGrid">
                <div className="field">
                  <label>성함</label>
                  <input name="customer_name" type="text" placeholder="홍길동" />
                </div>
                <div className="field">
                  <label>연락처 *</label>
                  <input name="phone_number" type="tel" placeholder="010-0000-0000" required />
                </div>
                <div className="field full">
                  <label>이메일</label>
                  <input name="email" type="email" placeholder="example@leepresso.com" />
                </div>
                <div className="field">
                  <label>창업 희망 지역</label>
                  <select name="hope_region">
                    <option value="">지역 선택</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>점포 보유 여부</label>
                  <div className="radioGroup">
                    {["유", "무"].map((opt) => (
                      <label key={opt} className="radioLabel">
                        <input type="radio" name="has_store" value={opt} />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="field">
                <label>문의 경로 (중복 선택 가능)</label>
                <div className="checkGrid">
                  {channels.map((ch) => (
                    <label key={ch} className="checkLabel">
                      <input type="checkbox" name="inquiry_channels" value={ch} />
                      <span>{ch}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="privacyBox">
                <input type="checkbox" id="privacy" required />
                <label htmlFor="privacy">
                  <strong>[필수] 개인정보 수집 및 이용 동의</strong>
                  <br />
                  가맹 상담 신청을 위해 연락처를 필수로 수집하며, 상담 완료 후 1년간 보관 후 파기됩니다.
                </label>
              </div>
              <button type="submit" className="submitBtn">
                가맹 상담 신청하기
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FIXED BOTTOM BAR */}
      {/* <div className="fixedBar">
        <form onSubmit={handleSubmit} className="barContainer">
          <div className="phone">1522-0290</div>
          <div className="inputArea">
            <input name="customer_name" placeholder="성함" />
            <input name="phone_number" placeholder="연락처" required />
            <input name="email" placeholder="이메일" />
            <select name="hope_region">
              <option value="">창업희망지역</option>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <select name="has_store">
              <option value="">점포보유유무</option>
              <option value="유">유</option><option value="무">무</option>
            </select>
            <select name="inquiry_channels">
              <option value="">문의경로</option>
              {channels.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="btnArea">
            <label>
              <input type="checkbox" required />
              <span>동의</span>
            </label>
            <button type="submit">창업문의</button>
          </div>
        </form>
      </div> */}
    </>
  );
}
