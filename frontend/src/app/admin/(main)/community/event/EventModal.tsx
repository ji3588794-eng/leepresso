'use client';

import { useState, useEffect, useRef } from 'react';
import api from '@/app/lib/api';
import styles from './event.module.scss';
import { EventData } from './page';

const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/admin|\/admin|\/api/g, '') || 'http://localhost:3001';

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
      // 💡 404 에러의 원인이었던 경로 수정! 반드시 '/admin/upload'로 호출해야 합니다.
      const res = await api.post('/admin/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (res.data.success) {
        setFormData(prev => ({ ...prev, thumbnail_url: `/uploads/${res.data.filename}` }));
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
      // 💡 썸네일 URL을 포함한 데이터를 깔끔하게 JSON으로 서버에 전송 (서버 로직과 완벽 호환)
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
                <img src={`${PUBLIC_BASE_URL}${formData.thumbnail_url}`} alt="썸네일 프리뷰" />
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