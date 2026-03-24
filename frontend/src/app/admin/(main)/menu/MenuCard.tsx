'use client';

import styles from './menu.module.scss';
import api from '@/lib/api';
import { Edit2, Trash2 } from 'lucide-react';

interface MenuCardProps {
  item: any;
  onEdit: () => void;
  onRefresh: () => void;
}

export default function MenuCard({ item, onEdit, onRefresh }: MenuCardProps) {
  const handleDelete = async () => {
    if (!confirm(`'${item.name}' 메뉴를 삭제하시겠습니까?`)) return;
    try {
      const res = await api.delete(`/admin/menu/${item.idx}`);
      if (res.data.success) {
        onRefresh();
      }
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={`${styles.menuCard} ${item.is_active === 1 ? '' : styles.disabled}`}>
      <div className={styles.thumb}>
        {item.thumbnail_url ? (
          <img src={item.thumbnail_url} alt={item.name} />
        ) : (
          <div className={styles.noImage}>No Image</div>
        )}
        <span className={styles.badge}>{item.type?.toUpperCase()}</span>
        {item.is_active !== 1 && <div className={styles.statusOverlay}>비활성</div>}
      </div>
      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h4>{item.name}</h4>
        </div>
        <p className={styles.engName}>{item.eng_name}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>{item.price?.toLocaleString()}원</span>
        </div>
      </div>
      <div className={styles.btnGroup}>
        <button onClick={onEdit} className={styles.editBtn}>
          <Edit2 size={14} /> 수정
        </button>
        <button onClick={handleDelete} className={styles.delBtn}>
          <Trash2 size={14} /> 삭제
        </button>
      </div>
    </div>
  );
}