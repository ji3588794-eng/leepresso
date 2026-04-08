import "./Interior.scss";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Interior() {
  const cards = useMemo(
    () => [
      { id: 1, img: "/store_1.jpg", title: "Facade View" },
      { id: 2, img: "/fran-store-1.png", title: "Interior 01" },
      { id: 3, img: "/store_2.PNG", title: "Interior 02" },
      { id: 4, img: "/store_3.PNG", title: "Interior 03" },
      { id: 5, img: "/store_4.PNG", title: "Interior 04" },
    ],
    []
  );

  const [mainImg, setMainImg] = useState(cards[0].img);

  return (
    <>
    <section className="interior">
      {/* 배경 레이어 */}
      <div 
        className="bg-texture-layer" 
        style={{ backgroundImage: 'url("/border-bg.png")' }}
      />
      
      <div className="full-container">
        <div className="interior-wrapper">
          
          {/* [TOP] 메인 레이아웃 */}
          <div className="top-layout">
            <motion.div 
              className="head-text-block"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-label">
                <span className="line" />
                <span className="txt">리프레소 인테리어</span>
              </div>
              <h2 className="comp_title">
                리프레소가 제안하는<br />
                <span className="accent">감각적인 공간 큐레이션</span>
              </h2>
              <div className="detailed-desc">
                <p className="main-p">
                  리프레소는 단순히 커피를 파는 공간을 넘어, <br/>
                  <strong>머무는 이의 영감과 휴식</strong>을 최우선으로 설계합니다.
                </p>
                <p className="sub-p">
                  획일화된 프랜차이즈의 틀에서 벗어나 각 지역의 특성과 <br/>
                  건물의 구조를 이해한 1:1 맞춤형 공간 큐레이션을 제공합니다. <br/>
                  본사의 가이드라인은 품질의 기준일 뿐, 인테리어의 한계가 아닙니다.
                </p>
                <p className="sub-p">
                  기본 인테리어는 자연스러운 우드 텍스처를 중심으로
                  은은한 간접 조명을 더해<br/>편안하고 클래식한 분위기를 완성합니다.
                </p>
              </div>
            </motion.div>

            <motion.div className="main-visual-box">
              <div className="img-frame">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={mainImg}
                    src={mainImg} 
                    alt="Main display" 
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                <div className="frame-deco" />
              </div>
            </motion.div>
          </div>

          {/* [BOTTOM] 갤러리 섹션 */}
          <div className="bottom-grid-section">
            <div className="gallery-head">
              <div className="line" />
              <p>INTERIOR GALLERY</p>
            </div>

            <div className="image-horizontal-4">
              {cards.slice(1).map((card, idx) => (
                <motion.div
                  key={card.id}
                  className={`grid-item ${mainImg === card.img ? "active" : ""}`}
                  onClick={() => setMainImg(card.img)}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <img src={card.img} alt={`thumb-${idx}`} />
                  <div className="overlay">
                    <span>VIEW</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>    
    </section>
    {/* 고정 이미지 레이어 (Attachment: Fixed) */}
      <div className="scroll-img"></div>
    </>
  );
}