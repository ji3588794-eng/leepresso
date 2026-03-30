'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './menu.module.scss';
import api from '@/app/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const UPLOAD_BASE_URL = `${API_BASE_URL}/uploads/`;

export default function MenuModal({ data, onClose, onSuccess }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  
  // 헬퍼 함수: URL에서 파일명만 추출
  const getFileNameOnly = (url: string) => {
    if (!url) return '';
    return url.replace(UPLOAD_BASE_URL, '');
  };

  const [formData, setFormData] = useState({
    type: data?.type || 'coffee',
    name: data?.name || '',
    eng_name: data?.eng_name || '',
    description: data?.description || '',
    price: data?.price || 0,
    is_active: data ? Number(data.is_active) : 1,
    thumbnail_url: getFileNameOnly(data?.thumbnail_url || ''),
  });

  const [previewUrl, setPreviewUrl] = useState(data?.thumbnail_url || '');

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
        // 백엔드에서 받은 파일명만 저장 (예: "171065000.jpg")
        setFormData(prev => ({ ...prev, thumbnail_url: res.data.filename }));
        // 미리보기는 전체 경로로 표시
        setPreviewUrl(UPLOAD_BASE_URL + res.data.filename);
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
    
    // 데이터 전송 전 정제 (가격 숫자형 변환 등)
    const payload = {
      ...formData,
      price: Number(formData.price),
      // category: 'menu' 가 백엔드 INSERT문에 하드코딩 되어있으므로 POST 시 포함
    };

    try {
      if (data) {
        // 수정 모드
        await api.put(`/admin/menu/${data.idx}`, payload);
      } else {
        // 등록 모드
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
              {previewUrl ? (
                <div className={styles.previewBox}>
                  <img src={previewUrl} alt="미리보기" />
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
                  <span>+ 이미지 업로드</span>
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