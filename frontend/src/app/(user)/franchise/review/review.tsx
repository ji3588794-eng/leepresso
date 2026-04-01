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
          <span className="sub-title">Guest Experience</span>
          <h2>고객님들이 전해주신 <br /><span>우리 동네 방문 기록</span></h2>
          <div className="desc-wrapper">
            <p className="desc">
              아이부터 어르신까지,<br /> <strong>이웃들이 남긴 실제 기록</strong>이 리프레소의 지속 가능한 가치를 증명합니다.
            </p>
          </div>
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