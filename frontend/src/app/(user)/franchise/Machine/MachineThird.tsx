import "./Machine.scss";

export default function MachineThird() {
  const rowData = [
    {
      title: "플랫버 그라인더",
      text: "특수 고강도 합금강으로 제작되어 내구성과 내열성이 뛰어납니다. 커피원두를 일관되고 정밀하게 분쇄해 최상의 맛과 향을 이끌어냅니다.",
    },
    {
      title: "고성능 로터리 베인펌프",
      text: "하이엔드 상업용 커피머신에 적용되는 펌프로 추출 압력의 변화없이 일정한 압력을 제공하여 전문적인 커피 레시피를 선사합니다.",
    },
    {
      title: "듀얼 보일러 시스템",
      text: "커피 추출용과 음료용 보일러가 별도로 작동하여 최적화된 온도에서 안정적인 음료 제공이 가능합니다.",
    },
    {
      title: "프리인퓨전",
      text: "원두를 골고루 적셔 원두 내 가스를 방출하고 균일한 추출을 가능하게 하여 에스프레소의 풍미와 질을 크게 향상시킵니다.",
    },
  ];

  return (
    <div className="machine third">
      <div className="container">
        <div className="m_third_contents_box">
          {/* 이미지 박스 */}
          <div className="third_img_box"></div>

          {/* 텍스트 콘텐츠 박스 */}
          <div className="third_text_box">
            <div className="text_top_box">
              <div className="third_text_point">
                PREMIUM SELF - SERVICE <br />
                COFFEE MACHINE
              </div>
              <div className="third_text_title">하이엔드 무인커피머신</div>
              <div className="third_text_sub">
                탁월한 커피 경험을 위한 최상급 엔지니어링과 설계
              </div>
            </div>

            <div className="text_row_box">
              {rowData.map((item, i) => (
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
      </div>
    </div>
  );
}