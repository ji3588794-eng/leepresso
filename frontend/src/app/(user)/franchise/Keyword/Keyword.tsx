"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Keyword.scss";

interface KeywordItem {
  no: number;
  point: string;
  title: string;
  sub: string;
  text: string;
  descTitle: string;
  descText: string;
  bgImg: string;
  accent: string;
}

const Keyword: React.FC = () => {
  const [activeRow, setActiveRow] = useState<number | null>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const defaultBg =
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80";

  const rowData: KeywordItem[] = [
    {
      no: 1,
      point: "B",
      title: "udget",
      sub: "합리적인 창업 비용",
      text: "불필요한 거품을 덜어낸 효율 중심 구조로 초기 투자 부담을 낮췄습니다.",
      descTitle: "낮은 진입장벽, 빠른 회수 구조",
      descText:
        "실제 운영 효율과 수익 구조를 우선해 안정적인 시작을 돕습니다.",
      bgImg:
        "/main-section-back.png",
      accent: "#f2c94c",
    },
    {
      no: 2,
      point: "E",
      title: "xpert",
      sub: "상권 분석 전문가",
      text: "데이터 기반 분석으로 수익 가능성이 높은 입지를 제안합니다.",
      descTitle: "입지가 곧 수익입니다",
      descText:
        "유동인구, 소비 흐름, 경쟁사까지 종합 분석해 출점 방향을 잡습니다.",
      bgImg:
        "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1800&q=80",
      accent: "#36a9e1",
    },
    {
      no: 3,
      point: "S",
      title: "tayable",
      sub: "지속 가능한 운영",
      text: "유행을 타지 않고 오래 운영할 수 있는 구조를 설계합니다.",
      descTitle: "오래가는 매장",
      descText:
        "반복 구매와 고정 수요를 중심으로 매장의 지속성을 높입니다.",
      bgImg:
        "/main-section-back2.png",
      accent: "#14c79a",
    },
    {
      no: 4,
      point: "T",
      title: "rust",
      sub: "빠른 대응 시스템",
      text: "운영 지원 체계를 갖추어 문제가 생겼을 때 빠르게 대응합니다.",
      descTitle: "운영이 멈추지 않도록",
      descText:
        "장비 이슈와 현장 대응에 대해 본사 기준의 빠른 피드백을 지원합니다.",
      bgImg:
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1800&q=80",
      accent: "#ffffff",
    },
  ];

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setActiveRow((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % rowData.length;
      });
    }, 4500);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleEnter = (index: number) => {
    setActiveRow(index);
    startInterval();
  };

  return (
    <section className="brandKeyword" onMouseLeave={startInterval}>
      <div className="backgroundWrap">
        <div
          className={`bgLayer defaultBg ${activeRow === null ? "active" : ""}`}
          style={{ backgroundImage: `url(${defaultBg})` }}
        />

        {rowData.map((item, index) => (
          <div
            key={`bg-${item.no}`}
            className={`bgLayer ${activeRow === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${item.bgImg})` }}
          />
        ))}

        <div className="bgDim" />
      </div>

      <div className="verticalLines">
        <span className="line line1" />
        <span className="line line2" />
        <span className="line line3" />
        <span className="line line4" />
        <span className="line line5" />
      </div>

      <div className="keywordCenterCopy">
        <div className="circleText">
          <svg className="circleSvg" viewBox="0 0 300 300" aria-hidden="true">
            <defs>
              <path
                id="bestCirclePath"
                d="
                  M 150,150
                  m -112,0
                  a 112,112 0 1,1 224,0
                  a 112,112 0 1,1 -224,0
                "
              />
              <path
                id="bestTopCurve"
                d="M 70 96 Q 150 18 230 96"
              />
            </defs>

            <g className="circleRotate">
              <text className="circleTextPath">
                <textPath href="#bestCirclePath" startOffset="0%">
                  LEEPRESSO COFFEE • LEEPRESSO COFFEE • LEEPRESSO COFFEE •
                </textPath>
              </text>
            </g>

          </svg>

          <div className="circleInner">
            <strong>브랜드 경쟁력</strong>
          </div>
        </div>
      </div>

      <div className="keywordGrid">
        {rowData.map((item, index) => {
          const isActive = activeRow === index;

          return (
            <div
              key={item.no}
              className={`keywordItem ${isActive ? "active" : ""}`}
              onMouseEnter={() => handleEnter(index)}
            >
              <div className="itemInner">
                <div className="contentBottom">
                  <div className="mainCopy">
                    <div className="itemMeta">
                      <span className="itemNo">0{item.no}</span>
                    </div>

                    <h3
                      className="wordMark"
                      style={{ color: isActive ? item.accent : "#fff" }}
                    >
                      <span>{item.point}</span>
                      {item.title}
                    </h3>

                    <p className="sub">{item.sub}</p>
                    <p className="summary">{item.text}</p>
                  </div>

                  <div className="detailBox">
                    <h4>{item.descTitle}</h4>
                    <p>{item.descText}</p>
                  </div>
                </div>

                <div className="timerBarWrap">
                  {isActive && <div className="timerBar" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Keyword;