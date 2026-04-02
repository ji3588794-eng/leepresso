"use client";
import "./Machine.scss";

const features = [
  {
    title: "다양한 메뉴 구성",
    contents: [
      "원두·파우더·액상 조합으로 메뉴를 폭넓게 구성",
      "계절과 트렌드에 맞춘 시즌 메뉴 확장 가능",
      "시그니처 음료와 비음료 메뉴까지 자유롭게 운영",
    ],
  },
  {
    title: "운영 효율성",
    contents: [
      "원격 제어 기능 탑재",
      "세척, 메뉴 설정, 자재 현황 등을 스마트 기기에서 관리",
      "인건비와 관리 시간을 줄여 운영 부담 최소화",
    ],
  },
  {
    title: "하이엔드 커피머신",
    contents: [
      "스웨이드 블랙 컬러의 프리미엄 디자인",
      "플랫버 그라인더, 로터리 베인펌프 시스템 적용",
      "정교한 추출로 일관된 커피 퀄리티 제공",
    ],
  },
  {
    title: "단골 고객 확보",
    contents: [
      "멤버십, 포인트, 쿠폰 등 다양한 고객 관리",
      "재방문을 유도해 단골 고객 확보에 효과적",
      "지속적인 고객 유치와 매출 안정화에 도움",
    ],
  },
  {
    title: "커스터마이징",
    contents: [
      "매장 콘셉트와 분위기에 맞춘 자유로운 구성",
      "브랜드 성격에 맞게 메뉴와 운영 방향 조정 가능",
      "내 카페만의 차별화된 스타일 구현",
    ],
  },
  {
    title: "결제수단 다양화",
    contents: [
      "신용카드, 삼성·카카오·네이버·애플페이 지원",
      "QR결제, RF카드 등 다양한 결제 방식 제공",
      "고객이 편하게 이용할 수 있는 환경 구축",
    ],
  },
];

const MachineFourth = () => {
  return (
    <div className="machine fourth">
      {/* 상단 와이드 히어로 영역 */}
      <div className="machine_back">
        <div className="m_top_section">
          <div className="m_text_box">
            <span className="m_eyebrow">Precision Coffee System</span>
            <div className="m_sub_text">물 한방울까지 조절하는 정교함</div>

            <h2 className="m_main_text">
              속도는 <em>UP,</em>
              <span className="title_line">맛은 그대로!</span>
            </h2>

            <p className="m_desc">
              감성적인 비주얼과 안정적인 추출 성능을 함께 갖춘 리프레소 머신 시스템.
              운영 효율성과 메뉴 확장성까지 고려해 실제 매장 운영에 최적화했습니다.
            </p>
          </div>

          <div className="m_visual_stage">
            <div className="image_machine"></div>
          </div>
        </div>
      </div>

      {/* 하단 와이드 피처 섹션 */}
      <section className="feature_section">
        <div className="feature_intro">
          <div className="intro_left">
            <span className="feature_kicker">Machine Advantage</span>
            <h3>실제 운영을 바꾸는 시스템</h3>
          </div>
          <p>
            단순한 머신 스펙 나열이 아니라 메뉴 확장성, 운영 편의성, 고객 경험까지
            함께 설계된 무인카페 운영 구조입니다.
          </p>
        </div>

        <div className="m_fourth_grid six">
          {features.map((item, idx) => (
            <div key={idx} className="memo_back">
              <span className="memo_chip">POINT {String(idx + 1).padStart(2, "0")}</span>
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
  );
};

export default MachineFourth;