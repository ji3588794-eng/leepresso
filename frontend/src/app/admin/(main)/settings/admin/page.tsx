'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import styles from './admin.module.scss';
import { Settings, ShieldAlert, Layout, Upload } from 'lucide-react';

const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/admin|\/admin|\/api/g, '') || 'http://localhost:3001';

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    site_logo: '',
    site_name: '',
    is_maintenance: 0,
    footer_info: ''
  });
  const [loading, setLoading] = useState(true);

  // 1. 초기 데이터 로드 (DB에서 가져오기)
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/admin/settings'); 
        if (res.data.success && res.data.data) {
          const d = res.data.data;
          setFormData({
            site_logo: d.site_logo || '',
            site_name: d.site_name || '',
            is_maintenance: d.is_maintenance || 0,
            footer_info: d.footer_info || ''
          });
        }
      } catch (err) {
        console.error('로딩 실패:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // 2. 이미지 업로드 (서버에 파일만 올림)
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file); 

    try {
      const res = await api.post('/admin/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (res.data.success) {
        // 💡 중요: 업로드된 파일명을 상태에 저장 (아직 DB 저장 전)
        setFormData(prev => ({ ...prev, site_logo: res.data.filename }));
      }
    } catch (err) {
      alert('이미지 업로드 실패');
    }
  };

  // 3. 전체 설정 저장 (DB에 최종 기록)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 💡 여기서 formData를 통째로 보낼 때 site_logo 파일명이 포함되어야 함
      const res = await api.put('/admin/settings', formData);
      if (res.data.success) {
        alert('모든 설정이 DB에 저장되었습니다.');
        // 저장 후 데이터가 날아가지 않도록 상태 유지 혹은 페이지 갱신
        window.location.reload(); 
      }
    } catch (err) {
      alert('설정 저장 실패');
    }
  };

  if (loading) return <div className={styles.loading}>설정 불러오는 중...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2><Settings size={20} /> 관리자페이지 및 사이트 기본 설정</h2>
        <p>홈페이지의 외형과 운영 상태를 관리합니다.</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <section className={styles.section}>
          <div className={styles.sectionTitle}><Layout size={18} /> 브랜드 및 레이아웃</div>
          
          <div className={styles.inputGroup}>
            <label>사이트 명칭 (로고 없을 시 표시)</label>
            <input 
              type="text" 
              value={formData.site_name} 
              onChange={(e) => setFormData({...formData, site_name: e.target.value})} 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>사이드바 로고 이미지</label>
            <p className={styles.helpText}>※ 가로형 로고 권장 (180x40px)</p>
            
            <div className={styles.logoUploadArea}>
              {formData.site_logo ? (
                <div className={styles.logoPreview}>
                  <img src={`${PUBLIC_BASE_URL}/uploads/${formData.site_logo}`} alt="Logo" />
                  <button type="button" onClick={() => setFormData({...formData, site_logo: ''})}>삭제</button>
                </div>
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <Upload size={24} />
                  <span>로고 이미지 업로드</span>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} />
                </div>
              )}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>푸터 정보</label>
            <textarea 
              value={formData.footer_info} 
              onChange={(e) => setFormData({...formData, footer_info: e.target.value})} 
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}><ShieldAlert size={18} /> 시스템 운영</div>
          <div className={styles.inputGroup}>
            <label>사이트 상태</label>
            <select 
              value={formData.is_maintenance} 
              onChange={(e) => setFormData({...formData, is_maintenance: Number(e.target.value)})}
            >
              <option value={0}>정상 운영 중</option>
              <option value={1}>⚠️ 사이트 점검 중</option>
            </select>
          </div>
        </section>

        <div className={styles.btnWrapper}>
          <button type="submit" className={styles.saveBtn}>설정 저장</button>
        </div>
      </form>
    </div>
  );
}