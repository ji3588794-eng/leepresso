'use client';

import { useEffect, useState } from 'react';
import api, { getImageUrl } from '@/app/lib/api';
import styles from './notice.module.scss';
import NoticeModal from './NoticeModal';
import { Search } from 'lucide-react'; // 검색 아이콘 추가

export interface NoticeData {
  idx: number;
  category: string;
  type: string;
  title: string;
  content: string;
  author: string;
  is_notice: number;
  view_count: number;
  created_at: string;
  files?: any[];
}

export default function NoticePage() {
  const [notices, setNotices] = useState<NoticeData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<NoticeData | null>(null);
  
  // 검색어 상태 추가
  const [searchTerm, setSearchTerm] = useState('');

  const fetchNotices = async () => {
    try {
      const res = await api.get('/admin/board/notice');
      setNotices(res.data.data || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchNotices(); }, []);

  const handleEdit = (notice: NoticeData) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  const handleDelete = async (idx: number) => {
    if (!confirm('공지사항을 삭제하시겠습니까?')) return;
    try {
      await api.delete(`/admin/board/${idx}`);
      fetchNotices();
    } catch (err) { alert('삭제 실패'); }
  };

  // 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 검색어에 맞게 배열 필터링 (제목 기준)
  const filteredNotices = notices.filter(notice => 
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>공지사항 관리</h2>
        
        <div className={styles.headerControls}>
          {/* 검색창 영역 */}
          <div className={styles.searchWrapper}>
            <Search size={16} color="#94a3b8" />
            <input 
              type="text"
              placeholder="제목으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <button className={styles.addBtn} onClick={() => { setSelectedNotice(null); setIsModalOpen(true); }}>
            + 공지사항 등록
          </button>
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '80px' }}>번호</th>
              <th>제목</th>
              <th style={{ width: '120px' }}>작성자</th>
              <th style={{ width: '150px' }}>날짜</th>
              <th style={{ width: '120px' }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <tr key={notice.idx} className={notice.is_notice === 1 ? styles.pinned : ''}>
                  <td>{notice.is_notice === 1 ? <span className={styles.pinBadge}>중요</span> : notice.idx}</td>
                  <td className={styles.titleCell} onClick={() => handleEdit(notice)}>
                    {notice.title}
                  </td>
                  <td>{notice.author || '관리자'}</td>
                  <td>{formatDate(notice.created_at)}</td>
                  <td className={styles.actions}>
                    <button onClick={() => handleEdit(notice)}>수정</button>
                    <button onClick={() => handleDelete(notice.idx)}>삭제</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: '60px 0', color: '#94a3b8' }}>
                  검색된 공지사항이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <NoticeModal 
          data={selectedNotice} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchNotices} 
        />
      )}
    </div>
  );
}