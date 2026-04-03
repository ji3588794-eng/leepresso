import "./Interior.scss";
import React, { useMemo } from "react";

export default function Interior() {
  const cardsPart3 = useMemo(
    () => [
      { id: 1, title: "천안두정점", img: "/store_1.jpg" },
      { id: 2, title: "브랜드 공간", img: "/store_2.PNG" },
      { id: 3, title: "무인 운영 공간", img: "/store_3.PNG" },
      { id: 4, title: "브랜드 무드", img: "/store_4.PNG" },
      { id: 5, title: "리프레소 스토어", img: "/store-2.jpg" },
    ],
    [],
  );

  return (
    <section className="interior">
      <div className="container">
        <div className="comp_bg">
          {/* <div className="comp_deco deco_1"></div>
          <div className="comp_deco deco_2"></div> */}

          <div className="comp_content_box">
            <div className="comp_title">
              리프레소의 공간 무드는
              <span className="comp_point"> COZY </span>
              입니다.
            </div>

            {/* 풀 너비 슬라이더 */}
            <div className="comp_swipe_box">
              <div className="slider-wrapper">
                <div className="slider-track">
                  {[1, 2].map((setIndex) => (
                    <div key={setIndex} className="slider-set">
                      {cardsPart3.map((card, idx) => (
                        <div key={`${card.id}-${idx}`} className="slider-card">
                          <div className="card-inner">
                            <img
                              src={card.img}
                              alt={card.title}
                              loading={setIndex === 1 && idx < 4 ? "eager" : "lazy"}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="comp_bottom_box">
               <div className="comp_bottom_text">
                거품을 뺀 정직한 시공, <strong>인테리어 자율성 UP!</strong>
              </div>
              <div className="comp_bottom_text">
                특성에 맞춰 점주님의 개성을 담은 공간을 완성해드립니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
