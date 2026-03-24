'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import styles from './seo.module.scss';
import { Search, Share2 } from 'lucide-react';

export default function SeoSettingsPage() {
  const [formData, setFormData] = useState({
    site_name: '',
    site_description: '',
    seo_keywords: '',
    og_image_url: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/admin/settings/seo');
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
      const res = await api.put('/admin/settings/seo', formData);
      if (res.data.success) alert('SEO 설정이 사이트에 즉시 반영됩니다.');
    } catch (err) {
      alert('저장 실패');
    }
  };

  if (loading) return <div className={styles.loading}>SEO 데이터 로드 중...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2><Search size={20} /> 검색엔진 최적화(SEO) 설정</h2>
        <p>검색 결과와 소셜 미디어 공유 시 노출되는 메타 데이터를 관리합니다.</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <section className={styles.section}>
          <div className={styles.sectionTitle}>기본 메타 태그</div>
          <div className={styles.inputGroup}>
            <label>사이트 제목 (Title)</label>
            <input 
              type="text" 
              value={formData.site_name} 
              onChange={(e) => setFormData({...formData, site_name: e.target.value})} 
            />
          </div>
          <div className={styles.inputGroup}>
            <label>사이트 설명 (Description)</label>
            <textarea 
              value={formData.site_description} 
              onChange={(e) => setFormData({...formData, site_description: e.target.value})} 
            />
          </div>
          <div className={styles.inputGroup}>
            <label>키워드 (쉼표로 구분)</label>
            <input 
              type="text" 
              value={formData.seo_keywords} 
              onChange={(e) => setFormData({...formData, seo_keywords: e.target.value})} 
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}><Share2 size={18} /> 소셜 공유 (Open Graph)</div>
          <div className={styles.inputGroup}>
            <label>공유 이미지 URL</label>
            <input 
              type="text" 
              value={formData.og_image_url} 
              onChange={(e) => setFormData({...formData, og_image_url: e.target.value})} 
            />
            {formData.og_image_url && (
              <div className={styles.ogPreview}>
                <img src={formData.og_image_url} alt="OG 미리보기" />
              </div>
            )}
          </div>
        </section>

        <div className={styles.btnWrapper}>
          <button type="submit" className={styles.saveBtn}>SEO 설정 적용</button>
        </div>
      </form>
    </div>
  );
}