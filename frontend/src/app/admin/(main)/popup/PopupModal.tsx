'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './popup.module.scss';
import api, { getImageUrl } from '@/app/lib/api';
import { PopupData } from './page';

export default function PopupModal({ data, onClose, onSuccess }: { data: PopupData | null, onClose: () => void, onSuccess: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    link_url: '',
    priority: 0,
    is_active: 1,
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    if (data) {
      const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        return dateStr.slice(0, 16).replace(' ', 'T');
      };

      setFormData({
        title: data.title || '',
        image_url: data.image_url || '',
        link_url: data.link_url || '',
        priority: data.priority || 0,
        is_active: Number(data.is_active),
        start_date: formatDate(data.start_date),
        end_date: formatDate(data.end_date),
      });
    }
  }, [data]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    // 백엔드 'image' 필드명과 일치시켜야 함
    fd.append('image', file); 

    try {
      const res = await api.post('/admin/upload', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (res.data.success) {
        // 🚨 수정: 수동으로 '/uploads/'를 붙이지 않고 백엔드에서 준 전체 경로(res.data.path)를 그대로 사용
        setFormData(prev => ({ ...prev, image_url: res.data.path }));
      }
    } catch (err: any) { 
      console.error('❌ 업로드 실패 상세:', err.response?.data || err.message);
      alert(err.response?.data?.message || '업로드 중 오류 발생'); 
    } finally {
      if (e.target) e.target.value = ''; 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (data) await api.put(`/admin/popups/${data.idx}`, formData);
      else await api.post('/admin/popups', formData);
      onSuccess();
      onClose();
    } catch (err: any) { 
      alert(err.response?.data?.message || '저장 실패'); 
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{data ? '팝업 수정' : '팝업 등록'}</h3>
          <button className={styles.closeX} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formRow}>
            <label>팝업 이미지</label>
            <div className={styles.uploadBox} onClick={() => fileRef.current?.click()}>
              {formData.image_url ? (
                /* ✅ 수정: getImageUrl을 사용하여 Cloudinary/로컬 주소 자동 판별 */
                <img 
                  src={getImageUrl(formData.image_url)} 
                  alt="팝업 이미지 미리보기" 
                />
              ) : (
                <div className={styles.placeholder}>+ 이미지 클릭 업로드</div>
              )}
              <input type="file" ref={fileRef} hidden onChange={handleUpload} accept="image/*" />
            </div>
          </div>

          <div className={styles.formRow}>
            <label>제목</label>
            <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required placeholder="팝업 제목 입력" />
          </div>

          <div className={styles.formRow}>
            <label>링크 URL (선택)</label>
            <input value={formData.link_url} onChange={e => setFormData({...formData, link_url: e.target.value})} placeholder="클릭 시 이동할 주소" />
          </div>

          <div className={styles.formGrid}>
             <div className={styles.formRow}>
               <label>우선순위</label>
               <input type="number" value={formData.priority} onChange={e => setFormData({...formData, priority: Number(e.target.value)})} />
             </div>
             <div className={styles.formRow}>
               <label>노출상태</label>
               <select value={formData.is_active} onChange={e => setFormData({...formData, is_active: Number(e.target.value)})}>
                 <option value={1}>노출</option>
                 <option value={0}>미노출</option>
               </select>
             </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <label>시작일시</label>
              <input type="datetime-local" value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} required />
            </div>
            <div className={styles.formRow}>
              <label>종료일시</label>
              <input type="datetime-local" value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} required />
            </div>
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