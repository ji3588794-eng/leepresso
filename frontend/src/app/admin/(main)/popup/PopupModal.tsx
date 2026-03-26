'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './popup.module.scss';
import api from '@/lib/api';
import { PopupData } from './page';

const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/admin|\/admin|\/api/g, '') || 'http://localhost:3001';

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
    // 1. 파일이 있는지 먼저 확실히 체크
    const file = e.target.files?.[0];
    if (!file) return;

    // 2. FormData 생성
    const fd = new FormData();
    
    /** * 💡 핵심 해결 포인트: 
     * 백엔드 router.post('/upload', upload.single('image'), ...) 에서 
     * 'image'라는 이름을 사용하므로, 반드시 'image'로 담아야 합니다.
     */
    fd.append('image', file); 

    try {
      // 3. API 요청 (400 에러가 났던 지점)
      const res = await api.post('/admin/upload', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (res.data.success) {
        // 성공 시 백엔드에서 준 파일명을 반영
        setFormData(prev => ({ ...prev, image_url: res.data.filename }));
      }
    } catch (err: any) { 
      // 여기서 "업로드된 파일이 없습니다"가 뜬다면 서버 multer 설정과 키값이 안 맞는 것임
      console.error('❌ 업로드 실패 상세:', err.response?.data || err.message);
      alert(err.response?.data?.message || '업로드 중 오류 발생'); 
    } finally {
      if (e.target) e.target.value = ''; // 초기화
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
                <img 
                  src={formData.image_url.startsWith('http') 
                    ? formData.image_url 
                    : `${PUBLIC_BASE_URL}/uploads/${formData.image_url}`} 
                  alt="" 
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