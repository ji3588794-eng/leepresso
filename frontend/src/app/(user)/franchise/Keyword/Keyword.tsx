import { useState, useEffect, useRef } from "react";
import "./Keyword.scss";

const Keyword = () => {
  const [activeRow, setActiveRow] = useState(0);
  const intervalRef = useRef(null);

  const rowData = [
    {
      no: 1,
      point: "B",
      title: "udget",
      sub: "최저비용",
      text: "예비 창업주를 생각한 최적의 예산 설계. 불필요한 거품을 걷어내고 실질적 수익 구간을 앞당깁니다.",
      descTitle: "예산은 낮추고 회수 속도는 높이는 설계",
      descText:
        "리프레소는 보여주기식 구성이 아닌 실운영 기준의 창업 구조를 제안합니다. 꼭 필요한 요소만 남기고 불필요한 거품을 줄여 초반 부담을 낮추고, 빠르게 안정권에 진입할 수 있도록 방향을 설계합니다.",
    },
    {
      no: 2,
      point: "E",
      title: "conomic",
      sub: "인건비 0원",
      text: "인력 리스크 없는 100% 무인 운영. 하루 30분 관리로 완성되는 비즈니스 자유.",
      descTitle: "운영 피로도를 줄이는 무인 시스템",
      descText:
        "상주 인력 없이도 매장을 안정적으로 유지할 수 있도록 설계된 무인 운영 구조입니다. 반복적인 인건비 부담과 고정비 스트레스를 줄이고, 점주는 더 적은 시간으로 효율적인 운영에 집중할 수 있습니다.",
    },
    {
      no: 3,
      point: "S",
      title: "mart",
      sub: "상권분석",
      text: "성공의 80%를 결정짓는 압도적 입지 전략. 데이터가 말해주는 이길 수밖에 없는 자리를 리프레소가 선점합니다.",
      descTitle: "감이 아닌 데이터로 보는 입지 분석",
      descText:
        "출점의 핵심은 좋은 자리를 먼저 읽는 것입니다. 유동, 소비 패턴, 접근성, 업종 밀집도까지 다각도로 검토하여 수익 가능성이 높은 위치를 판단하고 실제 운영 확률을 높이는 방향으로 제안합니다.",
    },
    {
      no: 4,
      point: "T",
      title: "enacious",
      sub: "안정적 롱런",
      text: "반짝 유행이 아닌 지속 가능한 수익 구조. 유행을 타지 않는 본질적 가치로 흔들림 없는 평생 사업을 제안합니다.",
      descTitle: "짧은 유행보다 오래 가는 수익 구조",
      descText:
        "브랜드는 순간의 주목보다 꾸준히 유지되는 운영력이 중요합니다. 리프레소는 일시적인 유행 요소보다 장기적인 유지 가능성과 반복 매출 구조를 중심으로 안정적인 운영 기반을 만듭니다.",
    },
  ];

  useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();

    intervalRef.current = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % rowData.length);
    }, 3200);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <section id="keyword" className="keyword">
      <div className="keyword_bg_orb orb_1"></div>
      <div className="keyword_bg_orb orb_2"></div>
      <div className="keyword_bg_orb orb_3"></div>

      <div className="keyword_spark spark_1"></div>
      <div className="keyword_spark spark_2"></div>
      <div className="keyword_spark spark_3"></div>
      <div className="keyword_spark spark_4"></div>
      <div className="keyword_grid_line grid_line_1"></div>
      <div className="keyword_grid_line grid_line_2"></div>

      <div className="container">
        <div className="int_title_box">
          <span className="int_kicker">BRAND KEYWORD</span>
          <h2 className="int_title">리프레소를 완성하는 핵심 기준</h2>
          <p className="int_desc">
            단순한 장점 나열이 아니라, 실제 창업 결과를 만드는 기준만 강하게 보여주는 섹션입니다.
          </p>
        </div>

        <div className="keyword_stage" onMouseLeave={startAutoSlide}>
          <div className="stage_visual">
            <div className="stage_ring ring_1"></div>
            <div className="stage_ring ring_2"></div>
            <div className="stage_glow"></div>

            <div className={`stage_main_card active_${rowData[activeRow]?.no}`}>
              <div className="stage_main_top">
                <span className="stage_main_no">0{rowData[activeRow]?.no}</span>
                <span className="stage_main_badge">LEEPRESSO KEYWORD</span>
              </div>

              <div className={`stage_main_image row${rowData[activeRow]?.no}`}></div>

              <div className="stage_main_text">
                <div className="stage_main_title">
                  <span className="stage_title_point">{rowData[activeRow]?.point}</span>
                  <span className="stage_title_text">{rowData[activeRow]?.title}</span>
                </div>
                <div className="stage_main_sub">{rowData[activeRow]?.sub}</div>
                <p className="stage_main_summary">{rowData[activeRow]?.text}</p>
              </div>
            </div>

            <div className="floating_cards">
              {rowData.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  className={`floating_card fc_${item.no} ${activeRow === i ? "active" : ""}`}
                  onMouseEnter={() => {
                    stopAutoSlide();
                    setActiveRow(i);
                  }}
                  onClick={() => {
                    stopAutoSlide();
                    setActiveRow(i);
                  }}
                >
                  <div className="floating_card_no">0{item.no}</div>
                  <div className={`floating_card_icon row${item.no}`}></div>
                  <div className="floating_card_title">
                    <span>{item.point}</span>
                    {item.title}
                  </div>
                  <div className="floating_card_sub">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="stage_detail">
            <div className="stage_detail_inner">
              <div className="stage_detail_label">DETAIL MESSAGE</div>
              <h3 className="stage_detail_title">{rowData[activeRow]?.descTitle}</h3>
              <p className="stage_detail_text">{rowData[activeRow]?.descText}</p>

              <div className="stage_detail_nav">
                {rowData.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`detail_nav_btn ${activeRow === i ? "active" : ""}`}
                    onClick={() => {
                      stopAutoSlide();
                      setActiveRow(i);
                    }}
                  >
                    <span className="detail_nav_num">0{item.no}</span>
                    <span className="detail_nav_name">
                      {item.point}
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Keyword;