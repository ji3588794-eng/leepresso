import "./FranchiseMenu.scss";
import React, { useMemo, useState, useEffect } from "react";
export default function FranchiseMenu() {
  const [current, setCurrent] = useState(0);
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
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % menuCard.length);
    }, 500);

    return () => clearInterval(interval);
  }, [menuCard.length]);

  return (
    <section className="franchise_menu">
      <div className="container">
        <div className="menu_bg">
          <div className="menu_title_box">
            <div className="menu_title">
              맛있는데 다양하기까지한
              <span className="menu_point">리프레소</span>
            </div>
            <div className="menu_sub_text">빠르게 변하는 입맛을 잡는것이 성공의 비결!</div>
            <div className="menu_deco_text"></div>
          </div>
          <div className="menu_swipe_box">
            {menuCard.map((menu, i) => (
              <div className={`fade_slide ${current === i ? "active" : ""}`} key={menu.id}>
                <img src={menu.img} alt={menu.title} />
              </div>
            ))}
          </div>
          <div className="menu_bottom_text">
            새로운 메뉴, <span className="menu_bottom_point">절찬업데이트중!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
