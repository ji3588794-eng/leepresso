"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/app/lib/api"; 
import styles from "./Popup.module.scss";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001")
  .replace(/\/api\/admin|\/admin|\/api/g, "")
  .replace(/\/$/, "");

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
              let imgUrl = item.image_url;
              if (imgUrl && !imgUrl.startsWith('http')) {
                const cleanPath = item.image_url.startsWith('/') ? item.image_url : `/${item.image_url}`;
                imgUrl = `${API_BASE}/uploads${cleanPath}`.replace(/\/uploads\/uploads/g, '/uploads');
              }

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
            .slice(0, 4); // 최대 4개 제한
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