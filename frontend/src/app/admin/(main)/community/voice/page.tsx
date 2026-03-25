'use client';

import { useEffect, useState, useMemo } from 'react';
import api from '@/lib/api';
import styles from './voice.module.scss';
import VoiceModal from './VoiceModal';
import { Search } from 'lucide-react';

export interface VoiceData {
  idx: number;
  category: string;
  type: string;
  title: string;
  content: string;
  author: string;
  writer_phone: string;
  writer_email: string;
  password?: string;
  is_private: number;
  is_answered: number;
  answer?: string;
  created_at: string;
}

export default function VoicePage() {
  const [list, setList] = useState<VoiceData[]>([]);
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState<VoiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchList = async () => {
    try {
      const res = await api.get('/admin/board/voc');
      setList(res.data.data || []);
    } catch (err) {
      console.error('VOC 로드 실패:', err);
    }
  };

  useEffect(() => { fetchList(); }, []);

  // 💡 undefined / null 방어 로직 추가
  const filteredList = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return list.filter(item => {
      // 값이 비어있을 경우 빈 문자열('')로 처리하여 toLowerCase() 에러 원천 차단
      const titleMatch = (item.title || '').toLowerCase().includes(q);
      const authorMatch = (item.author || '').toLowerCase().includes(q);
      
      return titleMatch || authorMatch;
    });
  }, [list, keyword]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h2>고객의 소리 (VOC)</h2>
          <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            고객들이 남긴 문의사항을 확인하고 답변을 등록합니다.
          </p>
        </div>
        
        <div className={styles.headerControls}>
          <div className={styles.searchWrapper}>
            <Search size={16} color="#94a3b8" />
            <input 
              type="text" 
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)} 
              placeholder="제목 또는 작성자 검색..." 
              className={styles.searchInput}
            />
          </div>
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '80px' }}>번호</th>
              <th style={{ width: '100px' }}>상태</th>
              <th>제목</th>
              <th style={{ width: '120px' }}>작성자</th>
              <th style={{ width: '150px' }}>연락처</th>
              <th style={{ width: '150px' }}>날짜</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length > 0 ? (
              filteredList.map((item) => (
                <tr key={item.idx} onClick={() => { setSelected(item); setIsModalOpen(true); }} className={styles.row}>
                  <td>{item.idx}</td>
                  <td>
                    <span className={item.is_answered ? styles.done : styles.wait}>
                      {item.is_answered ? '답변완료' : '답변대기'}
                    </span>
                  </td>
                  <td className={styles.titleCell}>
                    {item.is_private === 1 && <span className={styles.lockIcon}>🔒 </span>}
                    {item.title}
                  </td>
                  <td>{item.author}</td>
                  <td>{item.writer_phone}</td>
                  <td>{formatDate(item.created_at)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ padding: '60px 0', color: '#94a3b8', textAlign: 'center' }}>
                  검색된 문의사항이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <VoiceModal 
          data={selected} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchList} 
        />
      )}
    </div>
  );
}