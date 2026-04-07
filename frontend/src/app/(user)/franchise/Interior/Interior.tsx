import "./Interior.scss";
import React, { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Interior() {
  const cards = useMemo(
    () => [
      { id: 1, img: "/store_1.jpg" },
      { id: 2, img: "/store_2.PNG" },
      { id: 3, img: "/store_3.PNG" },
      { id: 4, img: "/store_4.PNG" },
    ],
    []
  );

  // 스크롤에 반응하는 배경 텍스트 애니메이션
  const { scrollYProgress } = useScroll();
  const xPos = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section className="interior">
      {/* 1. 패럴랙스 배경 텍스트 & 데코 요소 */}
      <motion.div className="bg-vertical-text" style={{ x: xPos }}>
        LEEPESSO PREMIUM INTERIOR SYSTEM
      </motion.div>
      <div className="bg-deco-frame" />
      <div className="bg-dot-pattern" />

      <div className="full-container">
        <div className="interior-wrapper">
          
          {/* 2. 상단: 텍스트 밀도 조절과 메인 비주얼 */}
          <div className="top-layout">
            <motion.div 
              className="head-text-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="section-label">
                <span className="line" /> 
                <span className="txt">SPACE PHILOSOPHY</span>
              </div>
              <h2 className="comp_title">
                분위기는 깊게,<br />
                <span className="accent">공간은 자유롭게</span>
              </h2>
              <div className="hero-desc">
                <p>리프레소는 정해진 틀에 매장을 맞추지 않습니다.</p>
                <p>따뜻한 우드톤의 기본기는 지키되, <strong>점주님이 원하는 동선과 구성</strong>을 100% 반영하여 가장 효율적인 공간을 설계합니다.</p>
              </div>
            </motion.div>

            <motion.div 
              className="main-visual-box"
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <div className="img-frame">
                <img src={cards[0].img} alt="Main Interior" />
                <div className="frame-border-deco" />
                <div className="frame-tag">VIEW 01</div>
              </div>
            </motion.div>
          </div>

          {/* 3. 중간: 리듬감 있는 이미지 배치와 포인트 정보 */}
          <div className="middle-layout">
            <div className="sub-images-group">
              <motion.div 
                className="sub-img-item"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="img-inner">
                  <img src={cards[1].img} alt="Sub 1" />
                  <div className="img-overlay" />
                </div>
              </motion.div>
              <motion.div 
                className="sub-img-item"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="img-inner">
                  <img src={cards[2].img} alt="Sub 2" />
                  <div className="img-overlay" />
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="side-info-block"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="info-item">
                <div className="num-box">
                  <span className="num">01</span>
                  <span className="bar" />
                </div>
                <div className="text">
                  <h3>나만을 위한 맞춤 설계</h3>
                  <p>본사 매뉴얼에 갇히지 마세요. 가구 배치부터 매장 크기까지 상황에 맞게 유연하게 조정됩니다.</p>
                </div>
              </div>
              <div className="info-item">
                <div className="num-box">
                  <span className="num">02</span>
                  <span className="bar" />
                </div>
                <div className="text">
                  <h3>질리지 않는 포근함</h3>
                  <p>반짝 유행하는 화려함보다, 10년 뒤에도 머물고 싶은 편안한 우드톤 디자인을 고집합니다.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 4. 하단: 몰입감 있는 와이드 비주얼 */}
          <div className="bottom-layout">
            <motion.div 
              className="last-visual-box"
              initial={{ opacity: 0, clipPath: "inset(10% 0% 10% 0%)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={cards[3].img} alt="Sub 3" />
              <div className="floating-banner">
                <span className="accent-dot" />
                똑같은 매장은 없습니다. 오직 당신만을 위한 리프레소 공간입니다.
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}