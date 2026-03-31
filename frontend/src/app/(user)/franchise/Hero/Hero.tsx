import './Hero.scss';

export default function Hero() {
  return (
    <section id="leepresso" className="hero">
      <div className="container">
        {/* 상단 태그라인: 브랜드의 지향점 */}
        <p className="upperTitle">Beyond Unmanned, Hybrid Cafe Solution</p>
        
        {/* 메인 타이틀: 창업주의 가장 큰 고민인 '수익'과 '지속성'을 직관적으로 타격 */}
        <h1 className="mainTitle">
          실패 없는 창업은 <br />
          <span className="point">수익의 '격'이 다릅니다.</span>
        </h1>
        
        <div className="contentGrid">
          <div className="leftCol">
            {/* 핵심 차별화 포인트: 유인/무인 전환 가능성과 기술력 강조 */}
            <p className="leadText">
              유인부터 무인까지, <span className="point">상황에 따라 변신하는 하이브리드 운영.</span> <br />
              하이엔드 머신이 구현하는 프리미엄 맛과 <br />
              스마트 원격 제어로 완성되는 30분의 자유.
            </p>
          </div>
          <div className="rightCol">
            {/* 구체적인 신뢰 지표와 베네핏 제안 */}
            <p className="sideDesc">
              반짝이는 유행이 아닌, 오래 가는 매장을 만듭니다. <br />
              점주 직접 인테리어로 초기 비용은 낮추고, <br />
              데이터 기반 상권 분석으로 성공의 확률을 높이십시오. <br />
              리프레소가 당신의 <span className="bold">안정적인 롱런(Long-run)</span>을 약속합니다.
            </p>
          </div>
        </div>

        {/* 하단 퀵 요약 배너: 하위 섹션의 핵심 키워드를 미리 노출 */}
        <div className="featureTags">
          <span>#유무인 하이브리드</span>
          <span>#하이엔드 추출 기술</span>
          <span>#인건비 0원</span>
          <span>#원격 스마트 케어</span>
        </div>
        
        <div className="divider" />
      </div>
    </section>
  );
}