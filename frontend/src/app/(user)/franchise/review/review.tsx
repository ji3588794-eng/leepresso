import React from 'react';
import './Review.scss';

export default function Review() {
  return (
    <section id="review-info" className="review">
      {/* 뒷배경: 흐릿한 리뷰 벽면 */}
      <div className="bg-image-wrapper">
        <img src="/review-bg.jpg" alt="전체 리뷰 배경" className="bg-total-img" />
        <div className="overlay" />
      </div>

      <div className="container">
        <div className="header">
          <span className="sub-title">Real Review</span>
          <h2>누구나 편하게 <span>머물다 가는 곳</span></h2>
          <p className="desc">
            다양한 이웃들이 남겨주신 기분 좋은 흔적.<br />
            전국 리프레소 매장에 매일 쌓이는 실제 리뷰입니다.
          </p>
        </div>

        {/* 리뷰 보드 영역: 사진 크기 극대화 */}
        <div className="postit-board">
          {/* <div className="hang-line"></div> */}
          <div className="postit-row">
            <div className="postit-item">
              <div className="tape"></div>
              {/* [수정] 폴라로이드 느낌의 테두리 디자인 추가 */}
              <div className="img-frame">
                <img src="/review1.jpeg" alt="리뷰 1" />
              </div>
            </div>
            <div className="postit-item">
              <div className="tape"></div>
              <div className="img-frame">
                <img src="/review2.jpeg" alt="리뷰 2" />
              </div>
            </div>
            <div className="postit-item">
              <div className="tape"></div>
              <div className="img-frame">
                <img src="/review3.jpeg" alt="리뷰 3" />
              </div>
            </div>
            <div className="postit-item">
              <div className="tape"></div>
              <div className="img-frame">
                <img src="/review4.png" alt="리뷰 4" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bottom-info">
          <p>전국 리프레소 매장에서 고객들이 직접 남긴 <b>실제 후기</b>입니다.</p>
        </div>
      </div>
    </section>
  );
}