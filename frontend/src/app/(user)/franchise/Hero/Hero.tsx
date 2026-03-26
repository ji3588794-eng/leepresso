import './Hero.scss';

export default function Hero() {
  return (
    <section id="leepresso" className="hero">
      <div className="container">
        <p className="upperTitle">Low Cost, High Efficiency Business Strategy</p>
        <h1 className="mainTitle">
          창업은 낮게, <br />
          <span className="point">수익은 길게.</span>
        </h1>
        
        <div className="contentGrid">
          <div className="leftCol">
            <p className="leadText">
              압도적 저비용, 인건비 0원. <br />
              무인카페의 본질은 <span className="point">고정 지출 최소화</span>와 <br />
              안정적인 수익 창출입니다.
            </p>
          </div>
          <div className="rightCol">
            <p className="sideDesc">
              리프레소는 거품을 걷어냈습니다. <br />
              점주 직접 인테리어 허용부터 <br />
              하루 30분 관리의 혁신적인 시스템까지, <br />
              가장 실속 있는 비즈니스를 제안합니다.
            </p>
          </div>
        </div>
        <div className="divider" />
      </div>
    </section>
  );
}