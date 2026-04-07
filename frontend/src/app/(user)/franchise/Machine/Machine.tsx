"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  // --- MachineThird: 핵심 기술 스택 ---
  const rowDataThird = [
    { title: "플랫버 그라인더", text: "커피원두를 일관되고 정밀하게 분쇄해 최상의 맛과 향을 이끌어냅니다. 특수 고강도 합금강으로 제작되어 내구성과 내열성이 뛰어납니다." },
    { title: "고성능 로터리 베인 펌프", text: "가정용 바이브레이션 펌프와 차원이 다른 9 bar의 일정한 압력을 유지하여, 조밀하고 부드러운 황금빛 크레마를 안정적으로 추출합니다." },
    { title: "듀얼 보일러 컨트롤", text: "추출수와 스팀/온수 보일러를 분리하여 대량 주문 시에도 온도 편차 없는 완벽한 한 잔을 제공하는 연속 추출 능력을 갖췄습니다." },
    { title: "프리인퓨전 시스템", text: "추출 전 원두를 고르게 적셔 내부 가스를 배출함으로써 채널링 현상을 방지하고, 원두 본연의 단맛과 바디감을 극대화합니다." },
  ];

  // --- 원본 상세 제원 데이터 ---
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

  // --- 제품 특성 (제안서 이미지 원본 문구 기반 4개 구성) ---
  const features = [
    {
      title: "위생적인 자동 세척관리",
      contents: [
        "일관된 맛과 품질의 음료 추출을 위해 모든 과정에서 발생하는 잔여물이 머신 내부에 쌓이지 않도록 자동세척 기능이 적용되었습니다.",
      ],
    },
    {
      title: "디스플레이 모드 선택",
      contents: [
        "머신이 설치된 장소의 분위기와 조화롭게 어우러질 수 있도록 디스플레이의 다양한 테마를 제공합니다.",
      ],
    },
    {
      title: "다양한 음료 제조 가능",
      contents: [
        "대용량 원두 호퍼와 믹스 캐니스터, 액상 에이드를 사용하여 100여종의 다양한 음료 판매가 가능합니다.",
      ],
    },
    {
      title: "다양한 결제수단 지원",
      contents: [
        "신용카드, 삼성페이, 카카오/네이버페이, QR코드 등 사용자의 편의를 고려한 다양한 결제 시스템을 지원합니다.",
      ],
    },
  ];

  return (
    <div className="machine_wrapper">
      {/* 02. Engineering Details */}
      <section className="engineering_sec">
        <div className="inner_1500">
          <div className="eng_grid">
            <div className="eng_info">
              <div className="label">
                <motion.div 
                  className="ma_title"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="ma_txt">리프레소의 특별한</span> 
                  <span className="ma_point">MACHINE</span>
                </motion.div>
              </div>
              <h3>하이엔드 무인커피머신</h3>
              <p>완벽한 퀄리티를 구현하는 최상급 엔지니어링 솔루션</p>
              
              <div className="eng_rows">
                {rowDataThird.map((item, i) => (
                  <div className="row" key={i}>
                    <div className="n">{String(i + 1).padStart(2, '0')}</div>
                    <div className="t_box">
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="eng_visual">
               <div className="eng_main_img"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Specification Cards */}
      <section className="spec_sec">
        <div className="inner_1500">
          <div className="spec_grid">
            {specData.map((spec, idx) => (
              <div className="spec_card" key={idx}>
                <div className="img_holder">
                  <img src={spec.img} alt={spec.name} />
                </div>
                <div className="txt_holder">
                  <h4>{spec.name}</h4>
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
      </section>

      {/* 04. Brand Value - 자동 슬라이드 */}
      <section className="value_slide_sec">
        <div className="inner_1500">
          <div className="value_grid">
            {rowDataSecond.map((item, i) => (
              <div 
                className={`value_item ${activeRow === i ? "active" : ""}`} 
                key={i}
                onMouseEnter={() => { stopAutoSlide(); setActiveRow(i); }}
                onMouseLeave={startAutoSlide}
              >
                <div className="cate">{item.cate}</div>
                <h5>{item.title}</h5>
                <p>{item.text}</p>
                <div className="progress_wrap">
                  <div className="fill" style={{ width: activeRow === i ? '100%' : '0%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
          
      <div className="wave-bg"></div>
      {/* 05. 제품 특성 - 제안서 기반 4그리드 */}
      <section className="points_sec">
        <div className="inner_1500">
          <div className="sec_head">
            <h3>압도적인 기기 성능과 편의성</h3>
            <p>리프레소가 제안하는 머신 핵심 포인트</p>
          </div>
          <div className="points_grid four_cols">
            {features.map((item, idx) => (
              <div key={idx} className="point_item">
                <span className="idx">0{idx+1}</span>
                <h5>{item.title}</h5>
                <div className="contents">
                  {item.contents.map((content, i) => (
                    <p key={i}>{content}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}