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
    }, 1500); // 0.5초는 너무 빨라 문구가 안 보일 수 있어 1.5초로 살짝 조정했습니다.
    return () => clearInterval(interval);
  }, [menuCard.length]);

  return (
    <section className="franchise_menu">
      <div className="container">
        <div className="menu_bg">
          <div className="menu_title_box">
            <div className="menu_title">
              압도적인 비주얼, 재방문을 부르는
              <br />
              <span className="menu_point">리프레소만의 필승 메뉴</span>
            </div>
            <div className="menu_sub_text">
              유행을 타지 않는 탄탄한 기본기에 트렌디함을 더해 점주님의 수익을 극대화합니다.
            </div>
            <div className="menu_deco_text"></div>
          </div>
          <div className="menu_swipe_box">
            {menuCard.map((menu, i) => (
              <div className={`fade_slide ${current === i ? "active" : ""}`} key={menu.id}>
                <img src={menu.img} alt={menu.title} />
                {/* 메뉴 이름이 이미지와 함께 보이면 더 직관적입니다 */}
                {/* <p className="menu_name_label">{menu.title}</p> */}
              </div>
            ))}
          </div>
          <div className="menu_bottom_text">
            멈추지 않는 연구,  <span className="menu_bottom_point">끊임없는 신메뉴 개발</span>
          </div>
        </div>
      </div>
    </section>
  );
}