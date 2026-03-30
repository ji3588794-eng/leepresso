'use client';

import { useEffect, useMemo, useState } from 'react';
import api from '@/app/lib/api';
import styles from './popup.module.scss';
import PopupCard from './PopupCard';
import PopupModal from './PopupModal';
import { Search, Filter, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface PopupData {
  idx: number;
  title: string;
  image_url: string;
  image_full_url?: string;
  link_url: string;
  priority: number;
  is_active: number;
  start_date: string;
  end_date: string;
  created_at: string;
}

const ITEMS_PER_PAGE = 18; // 페이지당 18개

export default function PopupManagementPage() {
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPopup, setSelectedPopup] = useState<PopupData | null>(null);

  const fetchPopups = async () => {
    try {
      const res = await api.get('/admin/popups');
      setPopups(res.data?.data || []);
    } catch (err) {
      console.error('팝업 로드 실패:', err);
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  // 필터나 검색어 변경 시 1페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, statusFilter]);

  // 검색어 초기화 함수
  const handleReset = () => {
    setKeyword('');
  };

  // 1. 전체 필터링 로직
  const filteredPopups = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return popups.filter(p => {
      const matchesKeyword = p.title.toLowerCase().includes(q);
      const matchesStatus = 
        statusFilter === 'all' ? true :
        statusFilter === 'active' ? p.is_active === 1 :
        p.is_active === 0;
      
      return matchesKeyword && matchesStatus;
    });
  }, [popups, keyword, statusFilter]);

  // 2. 현재 페이지 세그먼트 추출
  const pagedPopups = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPopups.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPopups, currentPage]);

  const totalPages = Math.ceil(filteredPopups.length / ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h2>팝업 관리</h2>
          {/* <p>홈페이지 메인 팝업을 관리합니다.</p> */}
        </div>
        <button className={styles.addBtn} onClick={() => { setSelectedPopup(null); setIsModalOpen(true); }}>
          <Plus size={18} /> 새 팝업 등록
        </button>
      </header>

      <div className={styles.searchSection}>
        <div className={styles.filterWrapper}>
          <Filter className={styles.filterIcon} size={16} />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="all">전체 상태</option>
            <option value="active">활성 팝업</option>
            <option value="inactive">비활성 팝업</option>
          </select>
        </div>
        
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={18} />
          <input 
            type="text" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            placeholder="팝업 제목을 검색하세요..." 
          />
          {keyword && (
            <button className={styles.resetBtn} onClick={handleReset} title="검색어 초기화">
              <X size={16} />
            </button>
          )}
        </div>
        
        <div className={styles.countInfo}>
          총 <strong>{filteredPopups.length}</strong>건
        </div>
      </div>

      <div className={styles.grid}>
        {pagedPopups.length > 0 ? (
          pagedPopups.map((popup) => (
            <PopupCard 
              key={popup.idx} 
              popup={popup} 
              onEdit={() => { setSelectedPopup(popup); setIsModalOpen(true); }} 
              onRefresh={fetchPopups} 
            />
          ))
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔍</span>
            <p className={styles.emptyText}>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            <ChevronLeft size={20} />
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? styles.activePage : ''}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {isModalOpen && (
        <PopupModal 
          data={selectedPopup} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchPopups} 
        />
      )}
    </div>
  );
}