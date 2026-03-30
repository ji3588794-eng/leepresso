"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api, { getImageUrl } from "@/app/lib/api"; 
import styles from "./Popup.module.scss";

export default function BrandPopup() {
  const [popups, setPopups] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const response = await api.get('/user/popups');
        const rawData = response.data?.data || response.data;

        if (Array.isArray(rawData)) {
          const filtered = rawData
            .map((item: any) => {
              const id = item.idx || item.id;
              
              // 🚨 핵심 수정: 복잡한 로직 다 버리고 api.ts의 getImageUrl에 위임합니다.
              // item.image_url이 'https://...'면 그대로, 아니면 예전 방식을 알아서 처리합니다.
              const imgUrl = getImageUrl(item.image_url);

              return {
                id,
                title: item.title || "NOTICE",
                imgUrl,
                linkUrl: item.link_url || "#",
              };
            })
            .filter((item: any) => {
              const expiry = localStorage.getItem(`hide_popup_${item.id}`);
              return !(expiry && new Date().getTime() < parseInt(expiry));
            })
            .slice(0, 4); 
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
            <img src={popup.imgUrl} alt={popup.title} loading="lazy" />
          </Link>
          <div className={styles.bottomArea}>
            <button onClick={() => handleHideToday(popup.id)}>오늘 하루 보지 않기</button>
            <button 
              onClick={() => setPopups(prev => prev.filter(p => p.id !== popup.id))} 
              className={styles.closeBtn}
            >
              닫기
            </button>
          </div>
        </article>
      ))}
    </aside>
  );
}