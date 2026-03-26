import './Interior.scss';

const bestValues = [
  { alpha: "B", keyword: "Budget-friendly", title: "최저비용", desc: "예비 창업주를 생각한 최적의 예산 설계. 불필요한 거품을 걷어내고 실질적 수익 구간을 앞당깁니다." },
  { alpha: "E", keyword: "Economic", title: "인건비 무풍", desc: "인력 리스크가 없는 100% 무인 운영. 인건비 0원, 하루 30분 관리로 완성되는 비즈니스 자유를 누리세요." },
  { alpha: "S", keyword: "Smart Location", title: "상권분석", desc: "성공의 80%를 결정짓는 압도적 입지 전략. 데이터가 말해주는 이길 수밖에 없는 자리를 리프레소가 선점합니다." },
  { alpha: "T", keyword: "Tenacious", title: "안정적인 롱런", desc: "반짝 유행이 아닌 지속 가능한 수익 구조. 유행을 타지 않는 본질적 가치로 흔들림 없는 평생 사업을 제안합니다." }
];

export default function Interior() {
  return (
    <section id="strength" className="interior">
      <div className="container">
        <div className="header">
          <p className="sub">Success Strategy</p>
          <h2>THE <span className="point">B.E.S.T</span> CHOICE.</h2>
        </div>

        <div className="grid">
          {bestValues.map((item, idx) => (
            <div 
              key={item.alpha} 
              className={`card ${idx % 2 === 0 ? 'light' : 'dark'}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="bgAlpha">{item.alpha}</div>
              <div className="content">
                <div className="badge">{idx === 1 ? 'ZERO LABOR' : item.keyword}</div>
                <h3 className="title">
                  <span className="point">{item.alpha}</span>
                  {idx === 0 && <>udget<br/>최저비용</>}
                  {idx === 1 && <>conomic<br/>인건비 0원</>}
                  {idx === 2 && <>mart<br/>상권분석</>}
                  {idx === 3 && <>enacious<br/>안정적 롱런</>}
                </h3>
                <div className="hoverContent">
                  <div className="line" />
                  <p>{idx === 1 ? '인력 리스크 없는 100% 무인 운영. 하루 30분 관리로 완성되는 비즈니스 자유.' : item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}