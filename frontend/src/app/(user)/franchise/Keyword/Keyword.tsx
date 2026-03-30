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
    },
    {
      no: 2,
      point: "E",
      title: "conomic",
      sub: "인건비 0원",
      text: "인력 리스크 없는 100% 무인 운영. 하루 30분 관리로 완성되는 비즈니스 자유.",
    },
    {
      no: 3,
      point: "S",
      title: "mart",
      sub: "상권분석",
      text: "성공의 80%를 결정짓는 압도적 입지 전략. 데이터가 말해주는 이길 수밖에 없는 자리를 리프레소가 선점합니다.",
    },
    {
      no: 4,
      point: "T",
      title: "enacious",
      sub: "안정적 롱런",
      text: "반짝 유행이 아닌 지속 가능한 수익 구조. 유행을 타지 않는 본질적 가치로 흔들림 없는 평생 사업을 제안합니다.",
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
    }, 2000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <section id="keyword" className="keyword">
      <div className="container">
        <div className="int_title_box">
          <div className="int_title">리프레소를 완성하는</div>
          <div className="int_title_bottom">핵심 키워드</div>
        </div>

        <div className="int_content_box" onMouseLeave={startAutoSlide}>
          {rowData.map((item, i) => (
            <div
              key={i}
              className={`int_content_row ${activeRow === i ? "active" : ""}`}
              onMouseEnter={() => {
                stopAutoSlide();
                setActiveRow(i);
              }}
              onClick={() => {
                stopAutoSlide();
                setActiveRow(i);
              }}
            >
              <div className={`int_row_image row${item.no}`}></div>

              <div className="int_row_text_box">
                <div className="int_row_title">
                  <span className="int_title_point">{item.point}</span>
                  <span className="int_title">{item.title}</span>
                </div>
                <div className="int_row_sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="int_bottom_box">
          <div className="int_bottom_deco deco_1"></div>
          <div className={`int_bottom_text active_${rowData[activeRow]?.no}`}>{rowData[activeRow]?.text}</div>
          <div className="int_bottom_deco deco_2"></div>
        </div>
      </div>
    </section>
  );
};

export default Keyword;
