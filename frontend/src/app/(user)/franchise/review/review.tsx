import React from 'react';
import './Review.scss';

export default function Review() {
  return (
    <section id="review-info" className="review">
      {/* 1. 뒷배경 전체 리뷰 이미지 (흐릿하게) */}
      <div className="bg-image-wrapper">
        <img src="/review-bg.jpg" alt="전체 리뷰 배경" className="bg-total-img" />
        <div className="overlay" />
      </div>

      <div className="container">
        <div className="header">
            <h2>매일 쌓이는 <span>방문객의 진심</span></h2>
            <p>전국 리프레소 매장에서 고객들이 직접 남긴 솔직한 후기입니다.</p>
        </div>

        {/* 2. 앞면 포스트잇 이미지 4장 */}
        <div className="postit-row">
          <div className="postit-item">
            <img src="/review1.jpeg" alt="리뷰 1" />
          </div>
          <div className="postit-item">
            <img src="/review2.jpeg" alt="리뷰 2" />
          </div>
          <div className="postit-item">
            <img src="/review3.jpeg" alt="리뷰 3" />
          </div>
          <div className="postit-item">
            <img src="/review4.png" alt="리뷰 4" />
          </div>
        </div>
      </div>
    </section>
  );
}