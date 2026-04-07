"use client";
import React from "react";
import "./FirstSection.scss";

const FirstSection: React.FC = () => {
  return (
    <>
    <div className="leepresso_line reverse"></div>
        <section className="firstSection">
        {/* 사진 레이어: 섹션 전체를 채우되 비율에 따라 높이 결정 */}
        <div className="bgImageLayer" />

        {/* 좌측 텍스트를 위한 그라데이션 오버레이 */}
        <div className="bgColorOverlay" />

        <div className="container">
            <div className="textContent">
            <span className="subTitle">인건비 걱정 없는 스마트 창업</span>
            <h2 className="mainTitle">
                가성비 No.1 <br />
                무인카페 리프레소
            </h2>
            <div className="description">
                <p>합리적인 초기 비용으로 시작하는 고효율 무인 운영 시스템,</p>
                <p>거품을 뺀 가격으로 점주와 고객 모두가 만족하는 가성비를 실현합니다.</p>
                <p>24시간 멈추지 않는 수익, 리프레소와 함께 가장 스마트하게 시작하세요.</p>
            </div>
            </div>
        </div>
        </section>
        <div className="leepresso_line"></div>
    </>
  );
};

export default FirstSection;