"use client";
import { useState, useEffect, useRef } from "react";
import "./Keyword.scss";

const Keyword = () => {
  const [activeRow, setActiveRow] = useState(0);
  const [machineActive, setMachineActive] = useState(0);
  const intervalRef = useRef(null);
  const machineIntervalRef = useRef(null);

  const rowData = [
    {
      no: 1,
      point: "B",
      title: "udget",
      sub: "합리적인 창업 비용",
      text: "불필요한 거품을 줄이고 실제 운영에 필요한 요소만 담아 초기 부담을 낮춥니다.",
      descTitle: "낮은 진입 부담, 빠른 운영 안정화",
      descText:
        "보여주기식 구성이 아닌 실운영 중심의 창업 구조로, 꼭 필요한 항목만 남겨 안정적인 출발을 돕습니다.",
    },
    {
      no: 2,
      point: "E",
      title: "conomic",
      sub: "인건비 부담 없는 무인 운영",
      text: "상주 인력 없이 운영 가능한 시스템으로 고정비를 줄이고 효율을 높입니다.",
      descTitle: "운영은 가볍게, 수익 구조는 안정적으로",
      descText:
        "반복적인 인건비 부담을 줄이고, 점주는 더 적은 관리 시간으로 매장을 효율적으로 운영할 수 있습니다.",
    },
    {
      no: 3,
      point: "S",
      title: "mart",
      sub: "데이터 기반 상권 분석",
      text: "유동 인구와 소비 흐름을 분석해 수익 가능성이 높은 입지를 함께 검토합니다.",
      descTitle: "감이 아닌 데이터로 판단",
      descText:
        "입지는 창업 성과를 좌우하는 핵심 요소입니다. 다양한 데이터를 기반으로 보다 안정적인 출점 방향을 제안합니다.",
    },
    {
      no: 4,
      point: "T",
      title: "enacious",
      sub: "오래가는 운영 모델",
      text: "유행에 휘둘리지 않는 구조로 장기적인 매출 흐름을 만들 수 있도록 설계합니다.",
      descTitle: "짧은 반짝임보다 지속 가능한 운영",
      descText:
        "일시적인 이슈보다 꾸준히 운영 가능한 시스템과 반복 매출 구조를 중심으로 안정적인 기반을 만듭니다.",
    },
  ];

  const machineData = [
    {
      cate: "CATEGORY 01",
      title: "빠른 A/S 대응 시스템",
      text: "가맹본사 중심 관리 체계로 현장 이슈에 보다 신속하고 정확하게 대응합니다.",
    },
    {
      cate: "CATEGORY 02",
      title: "메뉴 확장으로 추가 매출 확보",
      text: "커피 외 다양한 메뉴 운영이 가능해 객단가와 재방문율을 함께 높일 수 있습니다.",
    },
    {
      cate: "CATEGORY 03",
      title: "안정적인 고사양 커피머신",
      text: "일관된 추출 품질과 안정적인 운영을 위해 검증된 장비 구성을 적용합니다.",
    },
    {
      cate: "CATEGORY 04",
      title: "스마트 원격 관리",
      text: "매장 상태 확인부터 운영 체크까지 모바일 기반으로 효율적인 관리가 가능합니다.",
    },
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % rowData.length);
    }, 4000);

    machineIntervalRef.current = setInterval(() => {
      setMachineActive((prev) => (prev + 1) % machineData.length);
    }, 3500);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(machineIntervalRef.current);
    };
  }, []);

  const handleKeywordHover = (index) => {
    setActiveRow(index);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % rowData.length);
    }, 4000);
  };

  const handleMachineHover = (index) => {
    setMachineActive(index);
    clearInterval(machineIntervalRef.current);
    machineIntervalRef.current = setInterval(() => {
      setMachineActive((prev) => (prev + 1) % machineData.length);
    }, 3500);
  };

  return (
    <section className="brandKeyword">
      <div className="container">
        <header className="sectionHeader">
          <div className="title-txts">
            <img src="/franchise-title1.png" alt="브랜드 경쟁력" />
          </div>
          <p className="sectionDesc">
            리프레소는 과장된 포장이 아닌,
            <strong> 실제 운영에 필요한 경쟁력</strong>을 기준으로
            안정적인 무인카페 창업 구조를 제안합니다.
          </p>
        </header>

        <div className="keywordGrid">
          {rowData.map((item, i) => (
            <div
              key={item.no}
              className={`keywordCard ${activeRow === i ? "active" : ""}`}
              onMouseEnter={() => handleKeywordHover(i)}
            >
              <div className="cardTop">
                <span className="cardNo">0{item.no}</span>
                <div className={`cardIcon row${item.no}`}></div>
              </div>

              <div className="cardBody">
                <h3 className="pointTitle">
                  <span>{item.point}</span>
                  {item.title}
                </h3>
                <h4 className="subTitle">{item.sub}</h4>
                <p className="summary">{item.text}</p>
              </div>

              <div className="cardBottom">
                <h5>{item.descTitle}</h5>
                <p>{item.descText}</p>
              </div>

              {activeRow === i && <div className="timerBar"></div>}
            </div>
          ))}
        </div>

        <div className="machineSection">
          <div className="machineIntro">
            <span className="eyebrow">OPERATING SYSTEM</span>
            <h2>실제 운영에서 차이가 나는 핵심 요소</h2>
            <p>
              오픈 이후에도 흔들리지 않는 운영을 위해,
              리프레소는 장비·메뉴·관리·대응 체계를 함께 설계합니다.
            </p>
          </div>

          <div className="machineGrid">
            {machineData.map((item, i) => (
              <button
                key={i}
                className={`machineItem ${machineActive === i ? "active" : ""}`}
                onMouseEnter={() => handleMachineHover(i)}
                onClick={() => handleMachineHover(i)}
              >
                <div className="machineCate">{item.cate}</div>
                <div className="machineTitle">{item.title}</div>
                <p className="machineText">{item.text}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Keyword;