'use client';

import { useState, useEffect, useRef } from 'react';
import api, { getImageUrl } from '@/app/lib/api';
import styles from './event.module.scss';
import { EventData } from './page';

interface ModalProps {
  data: EventData | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EventModal({ data, onClose, onSuccess }: ModalProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    category: 'community',
    type: 'event',
    title: '',
    content: '',
    thumbnail_url: '',
    is_notice: 0,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        category: 'community',
        type: 'event',
        title: data.title || '',
        content: data.content || '',
        thumbnail_url: data.thumbnail_url || '',
        is_notice: Number(data.is_notice) || 0,
      });
    }
  }, [data]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const fd = new FormData();
    fd.append('image', file);
    
    try {
      // ✅ 서버 호출 (백엔드 adminRouter.post('/upload', ...))
      const res = await api.post('/admin/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (res.data.success) {
        // 🚨 수정: '/uploads/'를 수동으로 붙이지 않고 서버가 준 전체 경로(res.data.path)를 그대로 사용합니다.
        // 이제 DB에는 "https://res.cloudinary.com/..." 주소가 깨끗하게 박힙니다.
        setFormData(prev => ({ ...prev, thumbnail_url: res.data.path }));
      }
    } catch (err) { 
      console.error(err);
      alert('이미지 업로드에 실패했습니다. 서버 상태를 확인해주세요.'); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.thumbnail_url) return alert('썸네일 이미지를 업로드해주세요.');

    try {
      if (data) {
        await api.put(`/admin/board/${data.idx}`, formData);
      } else {
        await api.post('/admin/board', formData);
      }
      
      onSuccess();
      onClose();
    } catch (err) { 
      console.error(err);
      alert('저장에 실패했습니다.'); 
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{data ? '이벤트 수정' : '새 이벤트 등록'}</h3>
          <button type="button" className={styles.closeX} onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formRow}>
            <label>썸네일 이미지 (필수)</label>
            <div className={styles.uploadBox} onClick={() => fileRef.current?.click()}>
              {formData.thumbnail_url ? (
                // ✅ 수정: getImageUrl을 사용하여 프리뷰 주소를 생성합니다.
                // 이미 https:// 주소라면 api.ts에서 판단하여 그대로 내보냅니다.
                <img src={getImageUrl(formData.thumbnail_url)} alt="썸네일 프리뷰" />
              ) : (
                <div className={styles.placeholder}><span>+</span><p>이미지 업로드</p></div>
              )}
              <input type="file" ref={fileRef} hidden onChange={handleUpload} accept="image/*" />
            </div>
          </div>
          <div className={styles.formRow}>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={formData.is_notice === 1} 
                onChange={(e) => setFormData({...formData, is_notice: e.target.checked ? 1 : 0})} 
              />
              📌 상단 고정
            </label>
          </div>
          <div className={styles.formRow}>
            <label>제목</label>
            <input 
              type="text" 
              required 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
            />
          </div>
          <div className={styles.formRow}>
            <label>내용</label>
            <textarea 
              required 
              rows={10} 
              value={formData.content} 
              onChange={e => setFormData({...formData, content: e.target.value})} 
            />
          </div>
          <div className={styles.modalFooter}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>취소</button>
            <button type="submit" className={styles.saveBtn}>저장하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}