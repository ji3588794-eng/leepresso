'use client';

import { useState, useEffect } from 'react';
import api from '@/app/lib/api';
import styles from './voice.module.scss';
import { VoiceData } from './page';

export default function VoiceModal({ data, onClose, onSuccess }: { data: VoiceData | null, onClose: () => void, onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    category: 'community',
    type: 'voc',
    password: '',
    answer: '',
    is_answered: 0
  });

  useEffect(() => {
    if (data) {
      setFormData({
        category: 'community',
        type: 'voc',
        password: data.password || '', 
        answer: data.answer || '',
        is_answered: data.is_answered || 0
      });
    }
  }, [data]);

  const handleUpdate = async () => {
    try {
      // 답변 내용이 있으면 is_answered를 1로, 없으면 0으로 자동 설정
      const updatedData = {
        ...formData,
        is_answered: formData.answer.trim() !== '' ? 1 : 0
      };

      await api.put(`/admin/board/${data?.idx}`, updatedData);
      alert('처리가 완료되었습니다.');
      onSuccess();
      onClose();
    } catch (err) { 
      console.error(err);
      alert('수정 실패'); 
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>고객 문의 상세내용</h3>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* 💡 작성하신 SCSS 클래스(.modalBody, .infoItem 등)를 적용하여 구조화 */}
        <div className={styles.modalBody}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>작성자</label>
              <span>{data?.author}</span>
            </div>
            <div className={styles.infoItem}>
              <label>연락처</label>
              <span>{data?.writer_phone}</span>
            </div>
            <div className={styles.infoItem}>
              <label>이메일</label>
              <span>{data?.writer_email || '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <label>비밀번호 (수정 가능)</label>
              <input 
                type="text" 
                value={formData.password} 
                onChange={e => setFormData({...formData, password: e.target.value})}
                placeholder="비밀번호"
              />
            </div>
          </div>

          <div className={styles.contentArea}>
            <label>문의내용</label>
            <div className={styles.userText}>{data?.content}</div>
          </div>

          <div className={styles.answerArea}>
            <label>관리자 답변</label>
            <textarea 
              value={formData.answer} 
              onChange={e => setFormData({...formData, answer: e.target.value})}
              placeholder="고객에게 남길 답변을 입력하세요. (답변을 저장하면 자동으로 '답변완료' 처리됩니다)"
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>닫기</button>
          <button type="button" className={styles.saveBtn} onClick={handleUpdate}>답변 및 정보 저장</button>
        </div>
      </div>
    </div>
  );
}