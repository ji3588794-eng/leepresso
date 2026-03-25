import "./Interior.scss";

export default function Interior() {
  return (
    <section id="strength" className="interior">
      <div className="container">
        <div className="int_title_box">
          <div className="int_title">리프레소를 완성하는</div>
          <div className="int_title_bottom">핵심 키워드</div>
        </div>
        <div className="int_content_box">
          <div className="int_content_row">
            <div className="int_row_image row1"></div>
            <div className="int_row_text_box">
              <div className="int_row_title">
                <span className="int_title_point">B</span>
                <span className="int_title">udget</span>
              </div>
              <div className="int_row_sub">최저비용</div>
            </div>
          </div>
          <div className="int_content_row">
            <div className="int_row_image row2"></div>
            <div className="int_row_text_box">
              <div className="int_row_title">
                <span className="int_title_point">E</span>
                <span className="int_title">conomic</span>
              </div>
              <div className="int_row_sub">인건비 0원</div>
            </div>
          </div>
          <div className="int_content_row">
            <div className="int_row_image row3"></div>
            <div className="int_row_text_box">
              <div className="int_row_title">
                <span className="int_title_point">S</span>
                <span className="int_title">mart</span>
              </div>
              <div className="int_row_sub">상권분석</div>
            </div>
          </div>
          <div className="int_content_row">
            <div className="int_row_image row4"></div>
            <div className="int_row_text_box">
              <div className="int_row_title">
                <span className="int_title_point">T</span>
                <span className="int_title">enacious</span>
              </div>
              <div className="int_row_sub">안정적 롱런</div>
            </div>
          </div>
        </div>
        <div className="int_bottom_box">
          <div className="int_bottom_deco deco_1"></div>
          <div className="int_bottom_text">
            예비 창업주를 생각한 최적의 예산 설계. 불필요한 거품을 걷어내고 실질적 수익 구간을 앞당깁니다.
          </div>
          <div className="int_bottom_deco deco_2"></div>
        </div>
      </div>
    </section>
  );
}
