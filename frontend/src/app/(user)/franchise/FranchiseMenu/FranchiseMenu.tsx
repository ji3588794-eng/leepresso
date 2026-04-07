"use client";
import "./FranchiseMenu.scss";
import React, { useMemo, useState, useEffect } from "react";

export default function FranchiseMenu() {
  const menuCard = useMemo(
    () => [
      { id: 1, title: "아이스 블루베리라떼", img: "/menu_image/menu_1.png" },
      { id: 2, title: "복숭아 자몽 아이스티", img: "/menu_image/menu_2.png" },
      { id: 3, title: "키위 에이드", img: "/menu_image/menu_3.png" },
      { id: 4, title: "딸기 에이드", img: "/menu_image/menu_4.png" },
      { id: 5, title: "아이스 초코 바나나", img: "/menu_image/menu_5.png" },
      { id: 6, title: "블루 레몬 에이드", img: "/menu_image/menu_6.png" },
    ],
    [],
  );

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = menuCard.length;

  useEffect(() => {
    if (isPaused) return;

    // 슬라이드 간격 단축: 2000ms -> 1600ms (더 빠르게 전환)
    const interval = setInterval(() => {
      handleNext();
    }, 1600);

    return () => clearInterval(interval);
  }, [isPaused, current]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const getVisibleItems = () => {
    const repeated = [...menuCard, ...menuCard, ...menuCard];
    const centerStart = total + current;
    return repeated.slice(centerStart - 3, centerStart + 4);
  };

  const visibleItems = getVisibleItems();

  const getCardStyle = (index) => {
    const styleMap = [
      { x: -930, scale: 0.6, opacity: 0.1, blur: 8, zIndex: 1 },
      { x: -620, scale: 0.8, opacity: 0.3, blur: 4, zIndex: 2 },
      { x: -310, scale: 0.95, opacity: 0.6, blur: 2, zIndex: 4 },
      { x: 0, scale: 1.3, opacity: 1, blur: 0, zIndex: 10 }, // 중앙 카드 scale 업
      { x: 310, scale: 0.95, opacity: 0.6, blur: 2, zIndex: 4 },
      { x: 620, scale: 0.8, opacity: 0.3, blur: 4, zIndex: 2 },
      { x: 930, scale: 0.6, opacity: 0.1, blur: 8, zIndex: 1 },
    ][index];

    return {
      transform: `translate3d(calc(-50% + ${styleMap.x}px), 0, 0) scale(${styleMap.scale})`,
      opacity: styleMap.opacity,
      filter: `blur(${styleMap.blur}px)`,
      zIndex: styleMap.zIndex,
    };
  };

  return (
    <section className="franchise_menu">
      <div className="container">
        <div className="menu_bg">
          <div className="menu_title_box">
            <div className="menu_deco_text"></div>
            <div className="menu_title">
              질리지 않는 클래식에 트렌디한
              <span className="menu_point">감각 한 스푼</span>
            </div>
            <div className="menu_sub_text">
              점주님이 운영에만 집중할 수 있도록,<br/>우리는 팔리는 메뉴의 기준을 끊임없이 고민합니다.
            </div>
          </div>

          <div
            className="menu_swipe_box"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="swipe_stage">
              {visibleItems.map((menu, i) => {
                const isCenter = i === 3;
                return (
                  <div
                    key={`${menu.id}-${i}-${current}`}
                    className={`curve_card ${isCenter ? "active" : ""}`}
                    style={getCardStyle(i)}
                  >
                    <div className="curve_card_inner">
                      <div className="drink_visual">
                        <img src={menu.img} alt={menu.title} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}