'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import styles from './admin.module.scss';
import { Settings, ShieldAlert, Layout } from 'lucide-react';

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    site_logo_text: 'LEEPRESSO', // 추가: 로고 텍스트
    is_maintenance: 0,
    footer_info: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/admin/settings/common');
        if (res.data.success) setFormData(res.data.data);
      } catch (err) {
        console.error('로딩 실패:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.put('/admin/settings/common', formData);
      if (res.data.success) alert('관리자 설정이 저장되었습니다.');
    } catch (err) {
      alert('저장 실패');
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
            <label>로고 텍스트 (사이드바 표시)</label>
            <input 
              type="text" 
              value={formData.site_logo_text} 
              onChange={(e) => setFormData({...formData, site_logo_text: e.target.value})} 
            />
          </div>
          <div className={styles.inputGroup}>
            <label>푸터 정보 (사업자 정보 등)</label>
            <textarea 
              value={formData.footer_info} 
              onChange={(e) => setFormData({...formData, footer_info: e.target.value})} 
              placeholder="상호명, 대표자, 사업자번호 등"
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}><ShieldAlert size={18} /> 시스템 운영</div>
          <div className={styles.inputGroup}>
            <label>사이트 상태 (점검 모드)</label>
            <select 
              value={formData.is_maintenance} 
              onChange={(e) => setFormData({...formData, is_maintenance: Number(e.target.value)})}
              className={formData.is_maintenance === 1 ? styles.maintenanceOn : ''}
            >
              <option value={0}>정상 운영 중</option>
              <option value={1}>⚠️ 사이트 점검 중 (사용자 접근 제한)</option>
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