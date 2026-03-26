"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api"; 
import styles from "./Popup.module.scss";

// API_BASE 끝에 슬래시가 있을 경우 제거하여 중복 방지
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001")
  .replace(/\/api\/admin|\/admin|\/api/g, "")
  .replace(/\/$/, "");

export default function BrandPopup() {
  const [popups, setPopups] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const response = await api.get('/user/popups');
        
        // response.data.data 구조인지 response.data 구조인지 확인 후 처리
        const rawData = response.data?.data || response.data;

        if (Array.isArray(rawData)) {
          const filtered = rawData
            .map((item: any) => {
              const id = item.idx || item.id;
              
              // 💡 DB에 "/파일명"만 있으므로 중간에 "/uploads"를 강제로 삽입
              // item.image_url이 "/"로 시작하든 아니든 대응할 수 있도록 처리
              const imagePath = item.image_url.startsWith('/') ? item.image_url : `/${item.image_url}`;
              const imgUrl = `${API_BASE}/uploads${imagePath}`;

              return {
                id,
                imgUrl,
                linkUrl: item.link_url || "#",
              };
            })
            .filter((item: any) => {
              const expiry = localStorage.getItem(`hide_popup_${item.id}`);
              return !(expiry && new Date().getTime() < parseInt(expiry));
            });
          setPopups(filtered);
        }
      } catch (error) {
        console.error("팝업 로드 실패:", error);
      }
    };
    fetchPopups();
  }, []);

  const handleHideToday = (id: number) => {
    const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem(`hide_popup_${id}`, expiryTime.toString());
    setPopups((prev) => prev.filter((p) => p.id !== id));
  };

  if (popups.length === 0) return null;

  return (
    <aside className={styles.popupWrapper}>
      {popups.map((popup) => (
        <article key={popup.id} className={styles.popupCard}>
          <Link href={popup.linkUrl} target="_blank" className={styles.imageArea}>
            {/* 정제된 imgUrl 사용 */}
            <img src={popup.imgUrl} alt="Leepresso" loading="lazy" />
          </Link>
          <div className={styles.bottomArea}>
            <button onClick={() => handleHideToday(popup.id)}>오늘 하루 보지 않기</button>
            <button onClick={() => setPopups(prev => prev.filter(p => p.id !== popup.id))} className={styles.closeBtn}>
              닫기
            </button>
          </div>
        </article>
      ))}
    </aside>
  );
}