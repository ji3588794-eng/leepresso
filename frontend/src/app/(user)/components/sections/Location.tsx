'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Copy, ExternalLink, Train, Bus, Car } from 'lucide-react';

declare global {
  interface Window {
    kakao: any;
  }
}

// 환경변수 체크를 위해 변수 선언
const KAKAO_SDK_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
const ADDRESS = "충남 천안시 서북구 차암동 13 룩소르비즈타워 B107호";
const LAT = 36.85518;
const LNG = 127.1176;

export default function Location() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // 지도 초기화 함수를 useCallback 수준으로 분리하여 useEffect에서 안전하게 호출
  const initMap = () => {
    // window.kakao가 있고, maps가 로드되었으며, DOM 요소가 있을 때 실행
    if (window.kakao && window.kakao.maps && mapRef.current) {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(LAT, LNG),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapRef.current, options);
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(LAT, LNG),
        });
        marker.setMap(map);
        setIsLoaded(true);

        // [중요] 지도가 깨지는 현상 방지를 위해 강제로 크기 재계산
        setTimeout(() => {
          map.relayout();
          map.setCenter(new window.kakao.maps.LatLng(LAT, LNG));
        }, 100);
      });
    }
  };

  // 페이지 진입 시 라이브러리가 이미 로드되어 있다면 바로 실행
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
    }
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(ADDRESS);
    alert("주소가 복사되었습니다.");
  };

  return (
    <section id="location" className="relative py-12 md:py-25 bg-[#F7F3F0] dark:bg-[#121110] font-suit transition-colors duration-500 overflow-hidden">
      {/* Script 전략을 'beforeInteractive' 또는 'afterInteractive'로 설정하고 
          컴포넌트가 마운트될 때마다 window.kakao를 체크하여 실행하도록 함 */}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_SDK_KEY}&autoload=false`}
        onLoad={initMap} // 새로고침 시 로드 완료되면 실행
      />

      <div className="max-w-[1500px] mx-auto px-6 md:px-10 relative">
        <div className="relative mb-8 md:mb-10 flex flex-col items-center md:items-stretch">
          <div className="w-full max-w-[480px] md:max-w-none flex flex-col md:flex-row items-baseline justify-between gap-4 pb-4 border-b-1 border-leepresso-deep dark:border-white/20 text-left">
            <div className="space-y-0">
              <span className="text-leepresso-point font-black text-[10px] pb-2 md:text-[11px] tracking-[0.3em] uppercase block">Contact Us</span>
              <h2 className="text-3xl md:text-5xl font-[900] text-leepresso-deep dark:text-stone-100 tracking-tighter leading-none">
                오시는 길<span className="text-leepresso-point">.</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          <div className="lg:col-span-4 py-4 md:py-6 pr-0 lg:pr-10 flex flex-col items-center md:items-start">
            <div className="w-full max-w-[480px] md:max-w-none space-y-0 text-left">
              <div className="pb-7 border-b border-leepresso-deep/10 dark:border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-leepresso-point font-bold text-xs">01</span>
                  <div className="h-[1px] w-4 bg-leepresso-point/40" />
                  <span className="text-[10px] font-black tracking-[0.1em] text-leepresso-point uppercase">주소</span>
                </div>
                <h3 className="text-xl md:text-2xl font-[900] text-leepresso-deep dark:text-stone-100 mb-2 tracking-tight">리프레소 본사</h3>
                <div className="space-y-3">
                  <p className="text-[14px] md:text-[16px] font-medium text-leepresso-deep/80 dark:text-stone-400 leading-snug break-keep">
                    {ADDRESS}
                  </p>
                  <button 
                    onClick={copyAddress} 
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-leepresso-point/10 text-leepresso-point rounded text-[10px] font-bold hover:bg-leepresso-point hover:text-white transition-all uppercase tracking-wider border border-leepresso-point/20"
                  >
                    <Copy size={12} /> 주소 복사
                  </button>
                </div>
              </div>

              <div className="py-7 border-b border-leepresso-deep/10 dark:border-white/5">
                <div className="flex items-center gap-2 mb-6">
                  <span className="font-mono text-leepresso-point font-bold text-xs">02</span>
                  <div className="h-[1px] w-4 bg-leepresso-point/40" />
                  <span className="text-[10px] font-black tracking-[0.1em] text-leepresso-point uppercase">지하철 & 버스 이용 시</span>
                </div>
                <div className="space-y-5">
                  <div className="flex gap-3">
                    <Train size={18} className="text-leepresso-point shrink-0 mt-0.5" />
                    <p className="text-[14px] md:text-[16px] font-bold text-leepresso-deep dark:text-stone-200 leading-snug">
                      1호선 <span className="text-leepresso-point underline underline-offset-4 decoration-2">두정역</span> 버스 환승
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Bus size={18} className="text-leepresso-point shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="text-[14px] md:text-[16px] font-bold text-leepresso-deep dark:text-stone-200 leading-snug">
                        차암공단입구 / 코스트코 정류장
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {['간선 2, 14', '지선 87'].map(num => (
                          <span key={num} className="px-2 py-0.5 bg-leepresso-deep dark:bg-leepresso-point text-white font-bold text-[10px] rounded shadow-sm">
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-7 border-b lg:border-b-0 border-leepresso-deep/10 dark:border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-leepresso-point font-bold text-xs">03</span>
                  <div className="h-[1px] w-4 bg-leepresso-point/40" />
                  <span className="text-[10px] font-black tracking-[0.1em] text-leepresso-point uppercase">자가용 이용 시 & 주차</span>
                </div>
                <div className="flex gap-3">
                  <Car size={18} className="text-leepresso-point shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <p className="text-[14px] md:text-[16px] font-bold text-leepresso-deep dark:text-stone-200 leading-snug">
                      천안IC에서 삼성대로 방면
                    </p>
                    <p className="text-[13px] text-leepresso-point font-bold italic bg-leepresso-point/5 py-0.5 px-1.5 rounded-sm inline-block">
                      ※ 룩소르비즈타워 전용 무료주차
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 py-4 lg:py-0 lg:pl-10 relative flex items-stretch">
            <div className="w-full h-[350px] md:h-[500px] lg:h-full min-h-[450px] relative">
              <div className={`relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-xl transition-all duration-700 border-2 border-white dark:border-stone-800 ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-30 scale-[0.99]'
                }`}>
                <div ref={mapRef} className="absolute inset-0 w-full h-full" />
                
                <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-10 flex flex-col md:flex-row gap-3">
                  <button 
                    onClick={() => window.open(`https://map.kakao.com/link/to/리프레소,${LAT},${LNG}`)}
                    className="w-full md:w-auto md:min-w-[180px] cursor-pointer bg-[#FEE500] text-[#191919] p-3 rounded-xl flex items-center justify-between gap-4 shadow-xl border border-[#FEE500] hover:bg-leepresso-deep hover:border-leepresso-deep hover:text-white transition-all duration-300 group"
                  >
                    <div className="text-left">
                      <p className="text-[8px] font-black uppercase tracking-tight opacity-50 group-hover:opacity-100 transition-opacity">Kakao Map</p>
                      <p className="text-[13px] font-black">카카오 맵 길찾기</p>
                    </div>
                    <ExternalLink size={16} className="text-[#191919] group-hover:text-white transition-colors" />
                  </button>

                  <button 
                    onClick={() => {
                      // 1. 검색어 설정 (가장 정확한 검색어를 입력하세요)
                      const searchQuery = encodeURIComponent("룩소르퍼스트비즈타워 천안지식산업센터"); 
                      
                      // 2. 네이버 지도 검색 결과 페이지 URL
                      const url = `https://map.naver.com/v5/search/${searchQuery}`;
                      
                      window.open(url);
                    }}
                    className="w-full md:w-auto md:min-w-[180px] cursor-pointer bg-[#03C75A] text-white p-3 rounded-xl flex items-center justify-between gap-4 shadow-xl border border-[#03C75A] hover:bg-leepresso-deep hover:border-leepresso-deep transition-all duration-300 group"
                  >
                    <div className="text-left">
                      <p className="text-[8px] font-black uppercase tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">Naver Map</p>
                      <p className="text-[13px] font-black">네이버 지도 길찾기</p>
                    </div>
                    <ExternalLink size={16} className="text-white transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}