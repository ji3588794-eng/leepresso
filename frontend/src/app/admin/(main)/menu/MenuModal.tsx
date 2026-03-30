'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './menu.module.scss';
import api, { getImageUrl } from '@/app/lib/api';

export default function MenuModal({ data, onClose, onSuccess }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // 1. 초기 상태 설정
  const [formData, setFormData] = useState({
    type: data?.type || 'coffee',
    name: data?.name || '',
    eng_name: data?.eng_name || '',
    description: data?.description || '',
    price: data?.price || 0,
    is_active: data ? Number(data.is_active) : 1,
    thumbnail_url: data?.thumbnail_url || '', 
  });

  // 초기 미리보기 설정: 이미 데이터가 있으면 getImageUrl을 통해 가져옵니다.
  const [previewUrl, setPreviewUrl] = useState(data?.thumbnail_url ? getImageUrl(data.thumbnail_url) : '');

  // 2. 이미지 업로드 핸들러
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    setLoading(true);
    try {
      const res = await api.post('/admin/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        // ⭐ Cloudinary에서 준 전체 URL (https://res.cloudinary.com/...)
        const newImageUrl = res.data.path; 
        
        // DB 저장용 상태 업데이트
        setFormData(prev => ({ ...prev, thumbnail_url: newImageUrl }));
        
        // 미리보기 즉시 업데이트 (전체 경로이므로 그대로 사용)
        setPreviewUrl(newImageUrl);
        
        console.log("업로드 성공 시 URL:", newImageUrl);
      }
    } catch (err) {
      console.error(err);
      alert('이미지 업로드 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
    };

    try {
      if (data) {
        await api.put(`/admin/menu/${data.idx}`, payload);
      } else {
        await api.post('/admin/menu', payload);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Save Error:', err.response?.data || err.message);
      alert(`저장 실패: ${err.response?.data?.error || '서버 오류'}`);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>{data ? '메뉴 수정' : '메뉴 등록'}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <label>썸네일 이미지</label>
            <div className={styles.thumbUpload}>
              {/* previewUrl이 있을 때만 이미지를 보여줌 */}
              {previewUrl && previewUrl !== '' ? (
                <div className={styles.previewBox}>
                  <img 
                    src={previewUrl} 
                    alt="미리보기" 
                    onError={(e) => {
                      // 이미지 로드 실패 시 대체 이미지 처리 (옵션)
                      (e.target as HTMLImageElement).src = '/images/no-image.png';
                    }}
                  />
                  <button 
                    type="button" 
                    className={styles.removeBtn} 
                    onClick={() => { 
                      setFormData({...formData, thumbnail_url: ''}); 
                      setPreviewUrl(''); 
                    }}
                  >
                    삭제
                  </button>
                </div>
              ) : (
                <div className={styles.uploadPlaceholder} onClick={() => fileInputRef.current?.click()}>
                  <span>{loading ? '업로드 중...' : '+ 이미지 업로드'}</span>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
              />
            </div>
          </div>

          {/* ... 나머지 입력 폼 부분은 동일 ... */}
          <div className={styles.inputRow}>
            <label>메뉴 타입</label>
            <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
              <option value="coffee">COFFEE</option>
              <option value="beverage">BEVERAGE</option>
              <option value="signature">SIGNATURE</option>
            </select>
          </div>

          <div className={styles.inputRow}>
            <label>이름 (국문)</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>

          <div className={styles.inputRow}>
            <label>이름 (영문)</label>
            <input type="text" value={formData.eng_name} onChange={(e) => setFormData({...formData, eng_name: e.target.value})} required />
          </div>

          <div className={styles.inputRow}>
            <label>가격</label>
            <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
          </div>

          <div className={styles.inputRow}>
            <label>설명</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>

          <div className={styles.inputRow}>
            <label>노출 상태</label>
            <div className={styles.radioGroup}>
              <label>
                <input 
                  type="radio" 
                  checked={formData.is_active === 1} 
                  onChange={() => setFormData({...formData, is_active: 1})} 
                /> 노출
              </label>
              <label>
                <input 
                  type="radio" 
                  checked={formData.is_active === 0} 
                  onChange={() => setFormData({...formData, is_active: 0})} 
                /> 미노출
              </label>
            </div>
          </div>

          <div className={styles.modalBtns}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>취소</button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>저장하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}