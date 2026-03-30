import "./Machine.scss";
import { useState, useEffect, useRef } from "react";

export default function MachineSecond() {
  const [activeRow, setActiveRow] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const rowData = [
    {
      cate: "Category 01",
      title: "업계최고 A/S 서비스",
      text: "가맹본사가 직접 관리 체계를 운영하여 신속하고 정확한 현장 대응이 가능합니다.",
    },
    {
      cate: "Category 02",
      title: "탄산음료 메뉴개발",
      text: "커피 외 수익 다변화를 위한 신규 메뉴 확장으로 객단가와 재방문율을 높입니다.",
    },
    {
      cate: "Category 03",
      title: "최고사양 커피머신",
      text: "무인카페의 핵심인 추출 품질을 위해 안정성과 일관성이 높은 고사양 장비를 적용합니다.",
    },
    {
      cate: "Category 04",
      title: "스마트 원격 제어",
      text: "스마트폰 기반 점포 상태 확인과 원격 제어로 운영 효율과 관리 편의성을 동시에 확보합니다.",
    },
  ];

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide(); // 중복 방지
    intervalRef.current = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % rowData.length);
    }, 1000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="machine second">
      <div className="m_container">
        <div className="machine_back">
          <div className="m_top_section">
            <div className="m_image_box">
              <div className="image_baristar"></div>
              <div className="image_machine"></div>
            </div>
            <div className="m_text_box">
              <div className="m_sub_text">물 한방울까지 조절하는 정교한 커피머신</div>
              <div className="m_main_text">
                속도는 <span>UP,</span>{" "}
                <p>
                  맛은 그대로 <span>!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="m_bottom_container">
        <div className="m_contents_box">
          {rowData.map((item, i) => (
            <div
              className={`m_row_box ${activeRow === i ? "active" : ""}`}
              key={i}
              onMouseEnter={() => {
                stopAutoSlide(); // 자동 멈춤
                setActiveRow(i); // 해당 row 활성화
              }}
            >
              <div className="m_row_cate">{item.cate}</div>
              <div className="m_row_title">{item.title}</div>
              <div className="m_row_text">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="leepresso_line mt150"></div>
    </div>
  );
}
