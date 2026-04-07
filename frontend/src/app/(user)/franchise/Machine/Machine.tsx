"use client";

import React, { useState, useEffect, useRef } from "react";
import "./Machine.scss";

export default function Machine() {
  // --- MachineSecond: 브랜드 핵심 가치 (자동 슬라이드) ---
  const [activeRow, setActiveRow] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const rowDataSecond = [
    {
      cate: "Reliability",
      title: "전국 단위 케어 시스템",
      text: "전문 엔지니어가 직접 관리하는 하이엔드 유지보수 솔루션으로 365일 멈추지 않는 비즈니스를 약속합니다.",
    },
    {
      cate: "Innovation",
      title: "독보적인 메뉴 베리에이션",
      text: "커피를 넘어선 탄산 에이드, 시그니처 베버리지까지. 끊임없는 R&D를 통해 객단가를 높이는 메뉴를 제안합니다.",
    },
    {
      cate: "Technology",
      title: "하이엔드 머신 익스피리언스",
      text: "단순한 기계를 넘어 바리스타의 테크닉을 완벽하게 구현한 추출 메커니즘으로 무인 카페의 격을 높입니다.",
    },
    {
      cate: "Smart Control",
      title: "인텔리전트 원격 관리",
      text: "실시간 재고 분석부터 원격 기기 제어까지, 대시보드 하나로 완성되는 효율적인 스마트 매니징 시스템입니다.",
    },
  ];

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % rowDataSecond.length);
    }, 4000); // 4초로 약간 여유 있게 변경
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  // --- MachineThird: 핵심 기술 스택 (이미지 기반 설명) ---
  const rowDataThird = [
    {
      title: "플랫버 그라인더",
      text: "커피원두를 일관되고 정밀하게 분쇄해 최상의 맛과 향을 이끌어냅니다. 특수 고강도 합금강으로 제작되어 내구성과 내열성이 뛰어납니다.",
    },
    {
      title: "고성능 로터리 베인 펌프",
      text: "가정용 바이브레이션 펌프와 차원이 다른 9 bar의 일정한 압력을 유지하여, 조밀하고 부드러운 황금빛 크레마를 안정적으로 추출합니다.",
    },
    {
      title: "듀얼 보일러 컨트롤",
      text: "추출수와 스팀/온수 보일러를 분리하여 대량 주문 시에도 온도 편차 없는 완벽한 한 잔을 제공하는 연속 추출 능력을 갖췄습니다.",
    },
    {
      title: "프리인퓨전",
      text: "추출 전 원두를 고르게 적셔 내부 가스를 배출함으로써 채널링 현상을 방지하고, 원두 본연의 단맛과 바디감을 극대화합니다.",
    },
  ];

  // --- 상세 제원 데이터 (테이블용) ---
  const specData = [
    {
      name: "제빙기",
      img: "/ice_maker.png",
      specs: [
        { label: "규격", val: "350(W) x 585(D) x 1,010(H) mm" },
        { label: "일일 제빙량", val: "최대 150 kg (고성능 콤프레셔)" },
        { label: "얼음 유형", val: "크리스탈 큐브 / 하프 큐브" },
        { label: "스마트 케어", val: "UV 살균 시스템 및 자동 세척 모드" }
      ]
    },
    {
      name: "커피머신",
      img: "/machine_spec.png",
      specs: [
        { label: "규격", val: "840(W) x 594(D) x 1,020(H) mm" },
        { label: "인터페이스", val: "27인치 4K 고해상도 터치패널" },
        { label: "원두 컨테이너", val: "대용량 2kg x 2ea (멀티 블렌딩)" },
        { label: "추출 엔진", val: "자체 개발 가변 압력 브루어" }
      ]
    },
    {
      name: "컵디스펜서",
      img: "/cup_dispenser.png",
      specs: [
        { label: "규격", val: "420(W) x 500(D) x 1,010(H) mm" },
        { label: "적재 용량", val: "최대 280개 (HOT/ICE 겸용)" },
        { label: "투하 방식", val: "정밀 기어드 모터 회전식 (낙하 오류 제로)" },
        { label: "센서 시스템", val: "컵 잔량 실시간 감지 및 알림" }
      ]
    }
  ];

  // --- MachineFourth: 시스템 포인트 ---
  const features = [
    {
      title: "Unlimited Menu",
      contents: [
        "원두 2종, 파우더 6종, 액상 시럽의 자유로운 조합",
        "전문 바리스타가 세팅한 70여 가지 레시피 프리셋",
        "상권 특성에 맞춘 계절별 독점 시즌 메뉴 구성",
      ],
    },
    {
      title: "Auto Management",
      contents: [
        "24시간 실시간 머신 컨디션 모니터링",
        "원재료 소진 알림 및 자동 주문 연동 시스템",
        "매일 정해진 시간에 작동하는 지능형 자동 세척",
      ],
    },
    {
      title: "Premium Design",
      contents: [
        "지문 방지 스웨이드 블랙 코팅의 고급스러운 마감",
        "어떤 인테리어와도 조화를 이루는 모던 큐빅 폼",
        "은은한 LED 라이팅으로 완성되는 감성적인 무드",
      ],
    },
    {
      title: "Customer Loyalty",
      contents: [
        "자체 서버 기반의 멤버십 포인트 통합 관리",
        "카카오 알림톡 기반의 쿠폰 및 이벤트 발송",
        "재방문율 분석을 통한 데이터 마케팅 지원",
      ],
    },
    {
      title: "Extreme Durability",
      contents: [
        "상업용 최상급 부품 사용으로 고장률 0.5% 미만",
        "과부하 방지를 위한 지능형 냉각 쿨링 시스템",
        "반영구적 사용이 가능한 고강도 하드웨어 설계",
      ],
    },
    {
      title: "Smart Payment",
      contents: [
        "모든 신용카드 및 간편결제(삼성/Apple/카카오/네이버)",
        "멤버십 카드 및 선불권 결제 완벽 지원",
        "외국인 관광객을 위한 글로벌 페이먼트 대응",
      ],
    },
  ];

  return (
    <div className="machine_wrapper">
      {/* Visual Section */}
      <section id="machine" className="machine">
        <div className="container">
          <div className="machine_bg">
            <div className="ma_title_box">
              <div className="ma_title">
                리프레소의 특별한 <span className="ma_point">MACHINE</span>
              </div>
              <h2 className="m_main_text">
                압도적인 속도, <em>Signature</em> <span className="title_line">변함없는 본연의 맛</span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Section */}
      <div className="machine third">
        <div className="container">
          <div className="m_third_contents_box">
            <div className="third_img_box"></div>
            <div className="third_text_box">
              <div className="text_top_box">
                <div className="third_text_point">PREMIUM SELF - SERVICE <br />COFFEE TECHNOLOGY</div>
                <div className="third_text_title">하이엔드 무인커피머신</div>
                <div className="third_text_sub">완벽한 퀄리티를 구현하는 최상급 엔지니어링 솔루션</div>
              </div>
              <div className="text_row_box">
                {rowDataThird.map((item, i) => (
                  <div className="text_row" key={i}>
                    <div className="row_title">{item.title}</div>
                    <div className="row_text">{item.text}</div>
                  </div>
                ))}
              </div>
              <div className="leepresso_mark_box">
                <div className="leepresso_mark"></div>
              </div>
            </div>
          </div>

          {/* Specification Grid */}
          <div className="spec_full_grid">
            {specData.map((spec, idx) => (
              <div className="spec_card" key={idx}>
                <div className="spec_visual">
                  <img src={spec.img} alt={spec.name} />
                </div>
                <div className="spec_info">
                  <div className="spec_name_header">{spec.name}</div>
                  <table className="spec_table">
                    <tbody>
                      {spec.specs.map((s, i) => (
                        <tr key={i}>
                          <th>{s.label}</th>
                          <td>{s.val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    <div className="leepresso_line"></div>

      {/* Brand Value Section */}
      <div className="machine second">
        <div className="m_bottom_container">
          <div className="m_contents_box">
            {rowDataSecond.map((item, i) => (
              <div
                className={`m_row_box ${activeRow === i ? "active" : ""}`}
                key={i}
                onMouseEnter={() => { stopAutoSlide(); setActiveRow(i); }}
                onMouseLeave={startAutoSlide}
              >
                <div className="m_row_cate">{item.cate}</div>
                <div className="m_row_title">{item.title}</div>
                <div className="m_row_text">{item.text}</div>
                <div className="progress_bar">
                   <div className="fill" style={{ width: activeRow === i ? '100%' : '0%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="machine fourth">
        <section className="feature_section">
          <div className="feature_intro">
            <div className="intro_left">
              <h3>성공적인 비즈니스를 위한 토탈 시스템</h3>
            </div>
            <p>압도적인 기기 성능부터 운영 효율성, 단골 관리까지 리프레소가 제안하는 6가지 성공 포인트</p>
          </div>
          <div className="m_fourth_grid six">
            {features.map((item, idx) => (
              <div key={idx} className="memo_back">
                <span className="memo_chip">FEATURE {String(idx + 1).padStart(2, "0")}</span>
                <h3 className="memo_title">{item.title}</h3>
                <div className="memo_text_box">
                  {item.contents.map((content, i) => (
                    <div key={i} className="memo_text">
                      <span className="dot"></span>
                      <span className="txt">{content}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="leepresso_line"></div>
    </div>
  );
}