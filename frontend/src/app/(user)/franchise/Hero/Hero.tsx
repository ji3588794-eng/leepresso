"use client";

import React, { useState, useRef } from "react";
import "./Hero.scss";

const Hero = () => {
  const [heroRatio, setHeroRatio] = useState(16 / 9);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 비디오 메타데이터가 로드되면 실제 원본 비율을 계산합니다.
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      if (videoWidth && videoHeight) {
        setHeroRatio(videoWidth / videoHeight);
      }
    }
  };

  return (
    <section
      id="leepresso"
      className="hero"
      style={{ "--hero-ratio": heroRatio } as React.CSSProperties}
    >
      <video
        ref={videoRef}
        src="/franchise-mv.mp4"
        className="hero-asset"
        autoPlay
        muted
        loop
        playsInline
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="hero-content">
        {/* overlay 컨텐츠가 들어갈 자리 */}
      </div>
    </section>
  );
};

export default Hero;