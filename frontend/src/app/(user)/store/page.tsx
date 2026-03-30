'use client';

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Search, Clock, Navigation, Home, Loader2, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BrandHeader from "@/app/(user)/components/layout/brand/BrandHeader";
import BrandFooter from "@/app/(user)/components/layout/brand/BrandFooter";
import { useRouter } from "next/navigation";
import api, { getImageUrl } from '@/app/lib/api';
import QuickMenu from "../components/common/QuickMenu";

interface Store {
  idx: number;
  store_name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  thumbnail_url: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function StorePage() {
  const router = useRouter();
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [map, setMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const markersRef = useRef<any[]>([]);
  const activeOverlayRef = useRef<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const getImgSrc = (url: any) => {
    if (!url || typeof url !== 'string' || url.trim() === '') {
      return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    }
    if (url.startsWith('http')) return url;
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return cleanPath.includes('/uploads/')
      ? `${API_BASE_URL}${cleanPath}`
      : `${API_BASE_URL}/uploads${cleanPath}`;
  };

  // 1. 매장 데이터 페칭
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('/user/stores');
        const normalized = (res.data || []).map((store: any) => ({
          ...store,
          lat: Number(store.lat),
          lng: Number(store.lng),
        }));
        setStores(normalized);
        setFilteredStores(normalized);
      } catch (err) {
        console.error("매장 목록 로딩 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStores();
  }, []);

  // 2. 지도 초기화 로직 (핵심 수정 부분)
const initMap = useCallback(() => {
  if (!mapRef.current || !window.kakao || !window.kakao.maps) return;

  window.kakao.maps.load(() => {
    // 대한민국 중앙 쪽으로 시작
    const koreaCenter = new window.kakao.maps.LatLng(36.35, 127.85);

    const newMap = new window.kakao.maps.Map(mapRef.current, {
      center: koreaCenter,
      level: 13,
    });

    // 확대/축소 가능 범위 제한
    newMap.setMinLevel(7);   // 너무 확대 방지
    newMap.setMaxLevel(13);  // 너무 축소돼서 해외까지 보이는 것 방지

    setMap(newMap);

    const refreshMap = () => {
      if (!mapRef.current) return;
      newMap.relayout();
      newMap.setCenter(koreaCenter);
      setIsMapLoading(false);
    };

    requestAnimationFrame(() => {
      setTimeout(refreshMap, 300);
    });

    setTimeout(refreshMap, 800);

    window.addEventListener("resize", refreshMap);

    window.kakao.maps.event.addListener(newMap, "click", () => {
      if (activeOverlayRef.current) {
        activeOverlayRef.current.setMap(null);
        activeOverlayRef.current = null;
      }
    });
  });
}, []);

  // 라이브러리 로드 대기 및 실행
  useEffect(() => {
    const checkKakao = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        initMap();
        clearInterval(checkKakao);
      }
    }, 100);
    return () => clearInterval(checkKakao);
  }, [initMap]);

  const closeActiveOverlay = useCallback(() => {
    if (activeOverlayRef.current) {
      activeOverlayRef.current.setMap(null);
      activeOverlayRef.current = null;
    }
  }, []);

  const showStoreOverlay = useCallback((store: Store) => {
    if (!map || !window.kakao) return;

    closeActiveOverlay();

    const position = new window.kakao.maps.LatLng(store.lat, store.lng);
    const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(store.address)}`;
    const kakaoMapUrl = `https://map.kakao.com/link/to/${encodeURIComponent(store.store_name)},${store.lat},${store.lng}`;

    const content = document.createElement('div');
    content.style.cssText = `
      background: white; border-radius: 14px; box-shadow: 0 15px 35px rgba(0,0,0,0.25);
      border: 1px solid #E5E1DD; width: 280px; overflow: hidden; position: relative; pointer-events: auto;
    `;

    content.onmousedown = (e) => e.stopPropagation();

    content.innerHTML = `
      <div style="width: 100%; height: 140px; background: #eee; position: relative;">
        <img src="${getImgSrc(store.thumbnail_url)}" style="width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6));"></div>
        <p style="position: absolute; bottom: 12px; left: 16px; color: white; font-weight: 800; font-size: 17px; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          ${store.store_name}
        </p>
        <div id="overlay-close-${store.idx}" style="position: absolute; top: 12px; right: 12px; width: 30px; height: 30px; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </div>
      <div style="padding: 18px;">
        <div style="font-size: 13.5px; color: #444; margin-bottom: 16px; line-height: 1.4; word-break: keep-all; font-weight: 500; min-height: 38px;">
          <span style="display: block; margin-bottom: 4px; color: #8D7B68; font-weight: 700; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;">Address</span>
          <div style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${store.address}
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <a href="${naverMapUrl}" target="_blank" rel="noopener noreferrer" style="flex: 1; display: flex; align-items: center; justify-content: center; background: #03C75A; color: white; text-decoration: none; padding: 10px 0; border-radius: 8px; font-size: 12px; font-weight: 800; text-align: center;">네이버</a>
          <a href="${kakaoMapUrl}" target="_blank" rel="noopener noreferrer" style="flex: 1; display: flex; align-items: center; justify-content: center; background: #FEE500; color: #3E3232; text-decoration: none; padding: 10px 0; border-radius: 8px; font-size: 12px; font-weight: 800; text-align: center;">카카오</a>
        </div>
      </div>
      <div style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 12px; height: 12px; background: white; border-right: 1px solid #E5E1DD; border-bottom: 1px solid #E5E1DD; z-index: 0;"></div>
    `;

    const overlay = new window.kakao.maps.CustomOverlay({
      content,
      position,
      yAnchor: 1.06,
      zIndex: 400
    });

    const openOverlay = () => {
      overlay.setMap(map);
      activeOverlayRef.current = overlay;
      
      const closeBtn = content.querySelector(`#overlay-close-${store.idx}`) as HTMLElement | null;
      if (closeBtn) {
        closeBtn.onclick = (e: MouseEvent) => {
          e.stopPropagation();
          overlay.setMap(null);
          activeOverlayRef.current = null;
        };
      }
    };

    map.setCenter(position);
    if (map.getLevel() > 4) map.setLevel(4);
    
    setTimeout(openOverlay, 100);

    if (window.innerWidth < 1024) {
      mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [map, closeActiveOverlay]);

const updateMap = useCallback((data: Store[]) => {
  if (!map || !window.kakao || !mapRef.current) return;

  map.relayout();

  markersRef.current.forEach((marker) => marker.setMap(null));
  markersRef.current = [];
  closeActiveOverlay();

  const defaultCenter = new window.kakao.maps.LatLng(36.35, 127.85);

  if (data.length === 0) {
    map.setCenter(defaultCenter);
    map.setLevel(13);
    return;
  }

  const bounds = new window.kakao.maps.LatLngBounds();
  const imageSrc = "https://cdn-icons-png.flaticon.com/512/924/924514.png";

  // 마커 축소
  const imageSize = new window.kakao.maps.Size(30, 30);
  const markerImage = new window.kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    { offset: new window.kakao.maps.Point(15, 30) }
  );

  data.forEach((store) => {
    if (
      typeof store.lat !== "number" ||
      typeof store.lng !== "number" ||
      Number.isNaN(store.lat) ||
      Number.isNaN(store.lng)
    ) return;

    const position = new window.kakao.maps.LatLng(store.lat, store.lng);

    const marker = new window.kakao.maps.Marker({
      position,
      map,
      image: markerImage,
    });

    window.kakao.maps.event.addListener(marker, "click", () => {
      showStoreOverlay(store);
    });

    markersRef.current.push(marker);
    bounds.extend(position);
  });

  if (markersRef.current.length > 0) {
    map.setBounds(bounds, 40, 40, 40, 40);

    // bounds 적용 후 한 단계 더 확대
    setTimeout(() => {
      const currentLevel = map.getLevel();

      // 너무 넓게 보이면 1~2단계 확대
      map.setLevel(Math.max(7, currentLevel - 1));
    }, 120);
  }
}, [map, showStoreOverlay, closeActiveOverlay]);

  useEffect(() => {
    if (!map) return;
    updateMap(filteredStores);
  }, [filteredStores, map, updateMap]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    const filtered = stores.filter(
      (store) => store.store_name.includes(val) || store.address.includes(val)
    );
    setFilteredStores(filtered);
  };

  return (
    <div className="bg-[#F8F5F2] min-h-screen font-suit text-[#3E3232] overflow-x-hidden">
      <QuickMenu />
      <header className="fixed top-0 left-0 w-full z-[9999] bg-white border-b border-[#E5E1DD]">
        <BrandHeader />
      </header>

      <section className="relative w-full bg-[#3E3232] pt-32 pb-16 md:pt-48 md:pb-20 px-6 lg:px-20 overflow-hidden text-[#F9F5F0]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <nav className="flex items-center gap-3 text-[10px] tracking-[0.2em] font-bold uppercase mb-4 md:mb-6 opacity-40">
              <button onClick={() => router.push('/brand')} className="hover:text-[#8D7B68] transition-colors">
                <Home size={12} />
              </button>
              <span className="w-4 h-[1px] bg-white opacity-20" />
              <span>LOCATION</span>
              <span className="w-4 h-[1px] bg-white opacity-20" />
              <span className="text-[#8D7B68]">STORE INFO</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.05em] leading-tight">
              매장 <span className="text-[#8D7B68]">안내</span>
            </h1>
          </motion.div>

          {/* <div className="max-w-sm border-l-2 border-[#8D7B68]/30 pl-6 pb-2 opacity-60">
            <p className="text-[14px] font-medium leading-relaxed break-keep">
              리프레소의 최상의 커피 경험을<br className="md:hidden" /> 가까운 곳에서 만나보세요.
            </p>
          </div> */}
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10 pb-20 md:pb-32 pt-10 md:pt-20">
        <div className="flex flex-col lg:flex-row h-auto lg:h-[780px] bg-white rounded-2xl overflow-hidden shadow-xl border border-[#E5E1DD]">
          <aside className="w-full lg:w-[420px] flex flex-col bg-white border-b lg:border-b-0 lg:border-r border-[#E5E1DD] h-[500px] lg:h-full">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8D7B68]">Store List</span>
                <span className="text-[10px] font-bold opacity-40 uppercase">Total {filteredStores.length}</span>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3E3232]/30" size={16} />
                <input
                  type="text"
                  placeholder="지점명 또는 주소 검색"
                  className="w-full bg-[#F9F9F9] border border-[#E5E1DD] focus:border-[#8D7B68] rounded-xl py-3.5 pl-11 pr-4 text-[13px] outline-none transition-all"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-3 no-scrollbar">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse flex gap-4 p-4 rounded-xl bg-gray-50">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg shrink-0" />
                    <div className="flex-1 space-y-3 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))
              ) : filteredStores.length > 0 ? (
                <AnimatePresence mode="popLayout">
                  {filteredStores.map((store) => (
                    <motion.div
                      layout
                      key={`store-${store.idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => showStoreOverlay(store)}
                      className="group cursor-pointer bg-white rounded-xl p-4 hover:bg-[#FDFCFB] transition-all border border-[#F2F2F2] hover:border-[#8D7B68]/30 shadow-sm hover:shadow-md"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-lg overflow-hidden bg-[#F2F2F2]">
                          <Image
                            src={getImgSrc(store.thumbnail_url)}
                            alt={store.store_name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <h3 className="font-bold text-[15px] md:text-[16px] text-[#3E3232] mb-1.5 group-hover:text-[#8D7B68] transition-colors">
                              {store.store_name}
                            </h3>
                            <p className="text-[12px] md:text-[13px] text-[#3E3232]/50 leading-snug mb-2 line-clamp-2 font-medium">
                              {store.address}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] md:text-[12px] text-[#3E3232]/60 flex items-center gap-1.5 font-bold">
                              <Clock size={12} className="text-[#8D7B68]" />
                              {store.hours}
                            </p>
                            <MapPin size={14} className="text-[#8D7B68] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-[13px] text-[#3E3232]/40 font-medium">검색 결과가 없습니다.</p>
                </div>
              )}
            </div>
          </aside>

          <section className="flex-1 relative bg-[#F2F2F2] min-h-[500px] lg:min-h-full">
            <div ref={mapRef} className="absolute inset-0 w-full h-full grayscale-[10%]" />
            <AnimatePresence>
              {isMapLoading && (
                <motion.div 
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-[#F8F5F2] flex flex-col items-center justify-center gap-3"
                >
                  <Loader2 className="animate-spin text-[#8D7B68]" size={32} />
                  <span className="text-[12px] font-bold tracking-widest text-[#8D7B68] uppercase">Loading Map...</span>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
              <button
                onClick={() => {
                  if (!map || !window.kakao || filteredStores.length === 0) return;
                  const bounds = new window.kakao.maps.LatLngBounds();
                  filteredStores.forEach((store) => {
                    bounds.extend(new window.kakao.maps.LatLng(store.lat, store.lng));
                  });
                  closeActiveOverlay();
                  map.setBounds(bounds);
                }}
                className="w-12 h-12 bg-white border border-[#E5E1DD] shadow-lg rounded-full flex items-center justify-center hover:bg-[#3E3232] hover:text-white transition-all active:scale-95 group"
              >
                <Navigation size={20} className="group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </section>
        </div>
      </main>

      <BrandFooter />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}