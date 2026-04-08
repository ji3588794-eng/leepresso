import "./Graph.scss";

const Graph = () => {
  return (
    <section className="graph">
      <div className="container">
        <div className="graph_bg">
          <div className="graph_overlay" />

          <div className="graph_content">
            <div className="graph_left">
              <div className="graph_eyebrow">BRAND HISTORY</div>

              <h2 className="graph_title">
                <span className="graph_title_point">리프레소</span>는
                <br />
                오래 갈 수 있는 매장을 만드는데 집중합니다.
              </h2>

              <p className="graph_sub_text">
                단순히 많아 보이는 숫자가 아니라,
                <br />
                전국 각지에서 쌓아온 누적 개설 경험과 운영 데이터를 바탕으로
                <br />
                더 안정적인 매장 운영 구조를 만들어가고 있습니다.
              </p>

              <div className="graph_note">
                * 누적 오픈 기준 / 운영 종료 매장 포함
              </div>
            </div>

            <div className="graph_right">
              <div className="graph_stat_box">
                <div className="graph_stat_label">전국 누적 오픈</div>
                <div className="graph_stat_number">250+</div>
                <div className="graph_stat_title">누적 개설 실적</div>

                <div className="graph_stat_desc">
                  현재 운영 매장 수가 아닌,
                  <br />
                  리프레소가 지금까지 전국에서 쌓아온
                  <br />
                  누적 오픈 히스토리입니다.
                </div>

                <div className="graph_badges">
                  <span>전국 출점 경험</span>
                  <span>운영 데이터 축적</span>
                  <span>지속 가능한 매장 설계</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Graph;