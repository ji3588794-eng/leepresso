'use client';

import styles from './popup.module.scss';
import api from '@/app/lib/api';
import { PopupData } from './page';

// 💡 베이스 URL (끝에 슬래시 제외)
const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function PopupCard({ popup, onEdit, onRefresh }: { popup: PopupData, onEdit: () => void, onRefresh: () => void }) {
  
  const imageUrl = popup.image_url 
    ? (popup.image_url.startsWith('http') 
        ? popup.image_url 
        : `${PUBLIC_BASE_URL}/uploads${popup.image_url.startsWith('/') ? '' : '/'}${popup.image_url}`)
    : '';

  // 브라우저 검사창(콘솔)에서 주소가 똑바로 조립되는지 확인
  console.log("최종 조립된 imageUrl:", imageUrl);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`'${popup.title}' 팝업을 삭제하시겠습니까?`)) return;
    try {
      await api.delete(`/admin/popups/${popup.idx}`);
      onRefresh();
    } catch (err) { alert('삭제 실패'); }
  };

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextStatus = Number(popup.is_active) === 1 ? 0 : 1;
    try {
      await api.patch(`/admin/popups/${popup.idx}/active`, { is_active: nextStatus });
      onRefresh();
    } catch (err) { alert('상태 변경 실패'); }
  };

  return (
    <div className={`${styles.card} ${Number(popup.is_active) === 1 ? '' : styles.disabled}`}>
      <div className={styles.thumb}>
        {imageUrl ? (
          <img src={imageUrl} alt={popup.title} />
        ) : (
          <div className={styles.noImage}>이미지 없음</div>
        )}
        <span className={`${styles.badge} ${Number(popup.is_active) === 1 ? styles.on : styles.off}`}>
          {Number(popup.is_active) === 1 ? '노출중' : '미노출'}
        </span>
      </div>
      
      <div className={styles.info}>
        <div className={styles.topInfo}>
          <span className={styles.priority}>우선순위: {popup.priority}</span>
          <span className={styles.idx}># {popup.idx}</span>
        </div>
        <h4>{popup.title}</h4>
        <p className={styles.date}>
          기간: {popup.start_date?.split(' ')[0] || '-'} ~ {popup.end_date?.split(' ')[0] || '-'}
        </p>
      </div>

      <div className={styles.btnGroup}>
        <button onClick={onEdit}>수정</button>
        <button onClick={handleToggle} className={styles.toggleBtn}>
          {Number(popup.is_active) === 1 ? '숨김' : '노출'}
        </button>
        <button onClick={handleDelete} className={styles.delBtn}>삭제</button>
      </div>
    </div>
  );
}