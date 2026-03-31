import React from "react";
import "./Machine.scss";

export default function MachineFirst() {
  return (
    <section id="machine" className="machine">
      <div className="container">
        <div className="machine_bg">
          {/* 상단 타이틀 */}
          <div className="ma_title_box">
            <div className="ma_title">
              리프레소의 특별한
              <span className="ma_point">
                MACHINE
              </span>
            </div>
          </div>

          {/* 컨텐츠 통합 영역 */}
          <div className="ma_contents_bg">
            <div className="ma_contents_box">
              
              {/* 좌측: 자갈 배경 + 가독성 강화 텍스트 (60%) */}
              <div className="ma_info_side">
                <div className="info_inner">
                  <div className="info_section">
                    <div className="row_title">
                      공간의 제약을 넘어선
                      <br />
                      3가지 커스텀 창업
                    </div>
                    <div className="row_text_group">
                      <div className="row_text">
                        입지 조건과 라이프스타일에 따라 운영 방식을 자유롭게 설계하세요.
                        <br />
                        무인으로 시작해 유인으로, 혹은 상황에 따른 유동적 전환이 가능합니다.
                      </div>
                      <div className="row_text highlight_box">
                        “기술과 사람이 공존하는 하이브리드 솔루션”
                        <br />
                        리프레소는 <span>‘유인, 무인, 유무인’</span>을 넘나드는 혁신적인 카페 문화를 제안합니다.
                      </div>
                    </div>
                  </div>

                  <div className="info_section">
                    <div className="row_title">
                      무인의 편리함에
                      <br />
                      완벽한 맛을 담다
                    </div>
                    <div className="row_text_group">
                      <div className="row_text">
                        기존 무인 카페의 한계였던 <span>맛의 편차와 청결 관리</span> 문제를 완벽히 해결했습니다.
                      </div>
                      <div className="row_text">
                        자동 세정 시스템과 실시간 모니터링을 통해, 최소한의 인력만으로도
                        <br />
                        언제나 갓 내린 듯한 최상의 커피 맛과 쾌적한 환경을 유지합니다.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 우측: 이미지 2단 세로 배치 (40%) */}
              <div className="ma_visual_side">
                <div className="image_stack">
                  <div className="row_image img_01"></div>
                  <div className="row_image img_02"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="leepresso_line"></div>
    </section>
  );
}