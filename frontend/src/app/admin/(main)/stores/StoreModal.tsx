'use client';

import React, { useRef, useState } from 'react';
import styles from './stores.module.scss';
import api, { getImageUrl } from '@/app/lib/api';
import type { StoreItem } from './page';

interface StoreModalProps {
  data: StoreItem | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function StoreModal({ data, onClose, onSuccess }: StoreModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // 1. 폼 상태 관리 (Cloudinary는 전체 URL을 저장하므로 thumbnail_url만 관리)
  const [formData, setFormData] = useState({
    store_name: data?.store_name || '',
    address: data?.address || '',
    phone: data?.phone || '',
    hours: data?.hours || '',
    lat: data?.lat !== null && data?.lat !== undefined ? String(data.lat) : '',
    lng: data?.lng !== null && data?.lng !== undefined ? String(data.lng) : '',
    is_active: data ? Number(data.is_active) : 1,
    thumbnail_url: data?.thumbnail_url || '', // DB에 저장된 전체 URL 사용
  });

  // 초기 미리보기 설정 (이미 데이터가 있으면 getImageUrl로 Cloudinary 주소 판별)
  const [previewUrl, setPreviewUrl] = useState(
    data?.thumbnail_url ? getImageUrl(data.thumbnail_url) : ''
  );

  // 2. 이미지 업로드 핸들러 (Cloudinary 연동 핵심)
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
        // ⭐ Cloudinary에서 준 전체 주소 (https://...)
        const newImageUrl = res.data.path;

        // DB 저장용 상태 업데이트
        setFormData((prev) => ({ ...prev, thumbnail_url: newImageUrl }));
        
        // 미리보기 즉시 업데이트
        setPreviewUrl(newImageUrl);
      }
    } catch (err) {
      console.error(err);
      alert('이미지 업로드 실패');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.store_name.trim()) return alert('매장명을 입력해주세요.');
    if (!formData.address.trim()) return alert('주소를 입력해주세요.');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        lat: formData.lat.trim() ? Number(formData.lat) : null,
        lng: formData.lng.trim() ? Number(formData.lng) : null,
      };

      if (data) {
        await api.put(`/admin/stores/${data.idx}`, payload);
        alert('수정되었습니다.');
      } else {
        await api.post('/admin/stores', payload);
        alert('등록되었습니다.');
      }

      onSuccess();
      onClose();
    } catch (err) {
      alert('저장 실패');
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>{data ? '매장 수정' : '매장 등록'}</h3>

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
                      setFormData({ ...formData, thumbnail_url: '' });
                      setPreviewUrl('');
                    }}
                  >
                    삭제
                  </button>
                </div>
              ) : (
                <div
                  className={styles.uploadPlaceholder}
                  onClick={() => fileInputRef.current?.click()}
                >
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

          <div className={styles.inputRow}>
            <label>매장명</label>
            <input
              type="text"
              value={formData.store_name}
              onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
              required
            />
          </div>

          <div className={styles.inputRow}>
            <label>주소</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div className={styles.inputRow}>
            <label>전화번호</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className={styles.inputRow}>
            <label>운영시간</label>
            <input
              type="text"
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
            />
          </div>

          <div className={styles.inputHalfWrap}>
            <div className={styles.inputRow}>
              <label>위도 (lat)</label>
              <input
                type="text"
                value={formData.lat}
                onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
              />
            </div>

            <div className={styles.inputRow}>
              <label>경도 (lng)</label>
              <input
                type="text"
                value={formData.lng}
                onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.inputRow}>
            <label>노출 상태</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  checked={Number(formData.is_active) === 1}
                  onChange={() => setFormData({ ...formData, is_active: 1 })}
                />{' '}
                노출
              </label>
              <label>
                <input
                  type="radio"
                  checked={Number(formData.is_active) === 0}
                  onChange={() => setFormData({ ...formData, is_active: 0 })}
                />{' '}
                미노출
              </label>
            </div>
          </div>

          <div className={styles.modalBtns}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              취소
            </button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? '처리 중...' : '저장하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}