import './Competitiveness.scss';

const strengths = [
  { num: "01", label: "KNOW-HOW", title: "가맹사업 전문가", desc: "20년 이상 축적된 프랜차이즈 운영 노하우를 바탕으로 예비 창업자의 시행착오를 줄이고, 안정적인 출점을 위한 표준 시스템을 제공합니다." },
  { num: "02", label: "BIG DATA", title: "상권분석 핵심역량", desc: "배후수요, 유동인구, 경쟁 점포, 시간대별 소비 흐름까지 세밀하게 분석하여 실제 운영 가능성이 높은 입지를 선별합니다." },
  { num: "03", label: "SOLUTION", title: "최적입지 점포소싱", desc: "가시성, 접근성, 임대조건, 예상 매출 효율을 종합적으로 검토해 투자 대비 수익성이 높은 출점 전략을 제안합니다." },
];

const valueItems = [
  "가맹점주 상황에 맞춘 맞춤형 창업 설계",
  "효율적인 공간 구성과 비용 최적화",
  "장기 운영을 고려한 안정적인 수익 구조",
];

export default function Competitiveness() {
  return (
    <section id="value" className="value">
      <div className="container">
        <div className="topRow">
          <div>
            <p className="sub">Strategic Value</p>
            <h2>20년의 분석력과 <br /> <span className="point">출점 전략의 디테일.</span></h2>
          </div>
          <div className="box">
            <p>리프레소는 무인카페 시장을 단순히 “저비용 창업”으로 접근하지 않습니다. 상권 데이터, 점포 접근성, 수익 구조, 운영 효율을 함께 검토해 <span>오래 갈 수 있는 매장</span>을 만드는 데 집중합니다.</p>
          </div>
        </div>

        <div className="strengthsGrid">
          {strengths.map((item) => (
            <div key={item.num} className="sCard">
              <div className="circle" />
              <p className="label">{item.label}</p>
              <p className="num">{item.num}</p>
              <h3>{item.title}</h3>
              <p className="desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="investmentBox">
          <div className="iGrid">
            <div>
              <p className="sub">Value Investment</p>
              <h3>최소 비용이 아니라, <br /> <span className="point">가치 있는 비용 구조.</span></h3>
            </div>
            <div className="checkList">
              {valueItems.map((text, i) => (
                <div key={i} className="checkItem">
                  <span className="icon">✓</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}