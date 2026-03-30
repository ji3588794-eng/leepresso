import "./Machine.scss";

export default function MachineFirst() {
  return (
    <section id="machine" className="machine">
      <div className="container">
        <div className="machine_bg">
          <div className="ma_title_box">
            <div className="ma_title">
              리프레소의 특별한
              <span className="ma_point">MACHINE</span>
            </div>
          </div>
          <div className="ma_contents_bg">
            <div className="ma_contents_box">
              <div className="ma_content_row top">
                <div className="ma_row_box right">
                  <div className="row_image"></div>
                </div>
                <div className="ma_row_box left">
                  <div className="row_text_box">
                    <div className="row_title">당신의 콘셉트에 맞춘 3가지 창업 방식</div>
                    <div className="row_text">
                      처음이라 부담된다면 무인부터, 자신이 생기면 유인으로. 운영 방식을 바꿀 수 있는 카페는 흔치
                      않습니다.
                    </div>
                    <div className="row_text">
                      “사람과 기술이 함께 만든 새로운 카페 방식” 리프레소는 <span>‘유인, 무인, 유무인’</span> 3가지
                      운영이 가능한 혁식형 하이브리드 카페 브랜드입니다.
                    </div>
                  </div>
                </div>
              </div>
              <div className="ma_content_row bottom">
                <div className="ma_row_box left">
                  <div className="row_text_box">
                    <div className="row_title">무인으로 해도 맛이 살아있다</div>
                    <div className="row_text">
                      무인카페 확산 이후 가장 큰 문제는 <span>맛의 관리와 청결 유지</span>에 있습니다. 리프레소는 무인
                      운영에서도 자동 세정, 실시간 상태 모니터링, 간편 소모품 교체 등 다른 브랜드보다 훨씬 적은 인력으로
                      깨끗하고 안정적인 운영이 가능합니다.
                    </div>
                  </div>
                </div>
                <div className="ma_row_box right">
                  <div className="row_image"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
