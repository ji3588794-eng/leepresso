import "./Price.scss";

const priceRows = [
  { name: "가맹비", desc: "입지분석, 상권분석, 브랜드 사용권", cost: "0원", old: "500만원", badge: "한시적 면제" },
  { name: "가맹 교육비", desc: "본사 운영 교육 및 매장 오픈 지원", cost: "0원", old: "300만원", badge: "한시적 면제" },
  { name: "계약이행보증금", desc: "계약이행 및 물류이행 보증", cost: "0원", old: "200만원", badge: "한시적 면제" },
  {
    name: "커피머신장비",
    desc: "커피머신, 컵 디스펜서, 제빙기 등(30% 계약금, 36개월 리스)",
    old: "2200만원",
    cost: "726만원",
    badge: "월 550,280원",
  },
  {
    name: "인테리어/간판",
    desc: "내외관 시공 (8평 기준), 간판 시공",
    cost: "1,200만원",
    old: null,
    badge: "자체시공가능",
  },
  {
    name: "기타/초도물품(지원)",
    desc: "가구, 오브제, 소품, 스타일링, 개점 홍보, (테이블/의자 별도)",
    cost: "200만원~",
    old: null,
    badge: "오픈패키지",
  },
];

export default function Price() {
  return (
    <section id="price" className="price">
      <div className="container">
        <div className="header">
          <h2>리프레소 창업 비용</h2>
          <div className="infoRow">
            <span>* 가맹점매장 8평 기준</span>
            <span>* 단위:원 / VAT 별도</span>
          </div>
        </div>

        <div className="tableWrapper">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "15%" }}>구 분</th>
                <th style={{ width: "18%" }}>금 액</th>
                <th>상세내용</th>
                <th style={{ width: "18%" }}>비 고</th>
              </tr>
            </thead>
            <tbody>
              {priceRows.map((item, i) => (
                <tr key={i} className={i % 2 === 1 ? "even" : ""}>
                  <td className="name">{item.name}</td>
                  <td className="costCol">
                    <span className="old">{item.old}</span>
                    <span className="cost">{item.cost}</span>
                  </td>
                  <td className="desc">{item.desc}</td>
                  <td className="badge">{item.badge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="totalBox">
          <h3>
            실투자비용 합계 <span>(프로모션 적용 시)</span>
          </h3>
          <span className="totalPrice">21,600,000원~</span>
        </div>
      </div>
    </section>
  );
}
