'use client';

import { useState, useEffect } from 'react';
import api, { getImageUrl } from '@/app/lib/api';
import styles from './admin.module.scss';
import { Settings, ShieldAlert, Layout, Upload } from 'lucide-react';

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

  // 2. 이미지 업로드 (Cloudinary 연동 대응)
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
        // 🚨 수정: 수동으로 '/uploads/'를 붙이지 않고 백엔드에서 준 전체 경로(res.data.path)를 그대로 사용
        setFormData(prev => ({ ...prev, site_logo: res.data.path }));
      }
    } catch (err) {
      alert('이미지 업로드 실패');
    }
  };

  // 3. 전체 설정 저장 (DB에 최종 기록)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.put('/admin/settings', formData);
      if (res.data.success) {
        alert('모든 설정이 DB에 저장되었습니다.');
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
                  {/* ✅ 수정: getImageUrl을 사용하여 Cloudinary/로컬 주소 자동 판별 */}
                  <img src={getImageUrl(formData.site_logo)} alt="Logo Preview" />
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