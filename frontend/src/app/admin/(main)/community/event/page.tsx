'use client';

import { useEffect, useState, useMemo } from 'react';
import api from '@/lib/api';
import styles from './event.module.scss';
import EventModal from './EventModal';
import { Search } from 'lucide-react'; // 💡 검색 아이콘 추가

export interface EventData {
  idx: number;
  category: string;
  type: string;
  title: string;
  content: string;
  thumbnail_url: string;
  is_notice: number;
  is_active: number;
  created_at: string;
}

const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/admin|\/admin|\/api/g, '') || 'http://localhost:3001';

export default function EventPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [keyword, setKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/admin/board/event');
      setEvents(res.data.data || []);
    } catch (err) {
      console.error('이벤트 로드 실패:', err);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const filteredEvents = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return events.filter(e => e.title.toLowerCase().includes(q));
  }, [events, keyword]);

  const handleDelete = async (idx: number, title: string) => {
    if (!confirm(`'${title}' 이벤트를 삭제하시겠습니까?`)) return;
    try {
      await api.delete(`/admin/board/${idx}`);
      fetchEvents();
    } catch (err) { alert('삭제 실패'); }
  };

  return (
    <div className={styles.container}>
      {/* 💡 헤더 영역: 검색창 통합 및 디자인 적용 */}
      <header className={styles.header}>
        <h2>이벤트 관리</h2>
        
        <div className={styles.headerControls}>
          <div className={styles.searchWrapper}>
            <Search size={16} color="#94a3b8" />
            <input 
              type="text" 
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)} 
              placeholder="이벤트 제목 검색..." 
              className={styles.searchInput}
            />
          </div>

          <button className={styles.addBtn} onClick={() => { setSelectedEvent(null); setIsModalOpen(true); }}>
            + 새 이벤트 등록
          </button>
        </div>
      </header>

      <div className={styles.grid}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.idx} className={`${styles.card} ${event.is_notice === 1 ? styles.pinned : ''}`}>
              <div className={styles.thumb}>
                {event.thumbnail_url ? (
                  <img src={`${PUBLIC_BASE_URL}${event.thumbnail_url}`} alt={event.title} />
                ) : (
                  <div className={styles.noImage}>No Image</div>
                )}
                {event.is_notice === 1 && <span className={styles.pinBadge}>중요</span>}
              </div>
              <div className={styles.info}>
                <h4>{event.title}</h4>
                <p className={styles.date}>작성일: {event.created_at?.split(' ')[0]}</p>
              </div>
              <div className={styles.btnGroup}>
                <button onClick={() => { setSelectedEvent(event); setIsModalOpen(true); }}>수정</button>
                <button onClick={() => handleDelete(event.idx, event.title)} className={styles.delBtn}>삭제</button>
              </div>
            </div>
          ))
        ) : (
          /* 💡 검색 결과가 없을 때의 UI */
          <div className={styles.empty}>
            검색된 이벤트가 없습니다.
          </div>
        )}
      </div>

      {isModalOpen && (
        <EventModal 
          data={selectedEvent} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchEvents} 
        />
      )}
    </div>
  );
}