'use client';

import { useState, useEffect, useMemo } from 'react';
import api from '@/lib/api';
import styles from './menu.module.scss';
import MenuCard from './MenuCard';
import MenuModal from './MenuModal';
import { Search, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';

const CATEGORIES = ['ALL', 'coffee', 'beverage', 'signature'];
const ITEMS_PER_PAGE = 18;

export default function MenuManagementPage() {
  const [menus, setMenus] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('ALL');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const fetchMenus = async () => {
    try {
      const res = await api.get('/admin/menu');
      if (res.data.success) {
        setMenus(res.data.data);
      }
    } catch (err) {
      console.error('메뉴 목록 로딩 에러:', err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, keyword]);

  const handleReset = () => {
    setKeyword('');
    setCurrentPage(1);
  };

  const filteredMenus = useMemo(() => {
    return menus.filter((item: any) => {
      const matchesCategory = 
        activeTab === 'ALL' || 
        item.type?.toLowerCase() === activeTab.toLowerCase();
      
      const q = keyword.trim().toLowerCase();
      const matchesKeyword = 
        item.name?.toLowerCase().includes(q) || 
        item.eng_name?.toLowerCase().includes(q);

      return matchesCategory && matchesKeyword;
    });
  }, [menus, activeTab, keyword]);

  const pagedMenus = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMenus.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredMenus, currentPage]);

  const totalPages = Math.ceil(filteredMenus.length / ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h2>메뉴 관리</h2>
          {/* <p>카테고리별 상품을 등록하고 관리하세요.</p> */}
        </div>
        <button 
          className={styles.addBtn} 
          onClick={() => { setSelectedMenu(null); setIsModalOpen(true); }}
        >
          <Plus size={18} /> 신규 메뉴 추가
        </button>
      </header>

      {/* 버튼형 카테고리 탭 네비게이션 */}
      <nav className={styles.tabNav}>
        {CATEGORIES.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            <span className={styles.tabLabel}>{tab.toUpperCase()}</span>
            <span className={styles.count}>
              {tab === 'ALL' 
                ? menus.length 
                : menus.filter(m => m.type?.toLowerCase() === tab.toLowerCase()).length
              }
            </span>
          </button>
        ))}
      </nav>

      <div className={styles.searchSection}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={18} />
          <input 
            type="text" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            placeholder="찾으시는 메뉴명을 입력하세요..." 
          />
          {keyword && (
            <button className={styles.resetBtn} onClick={handleReset} title="검색어 초기화">
              <X size={16} />
            </button>
          )}
        </div>
        <div className={styles.countInfo}>
          검색 결과 <strong>{filteredMenus.length}</strong>건
        </div>
      </div>

      <div className={styles.menuGrid}>
        {pagedMenus.length > 0 ? (
          pagedMenus.map((item: any) => (
            <MenuCard 
              key={item.idx} 
              item={item} 
              onEdit={() => { setSelectedMenu(item); setIsModalOpen(true); }}
              onRefresh={fetchMenus}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>조건에 맞는 메뉴가 없습니다.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
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
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {isModalOpen && (
        <MenuModal 
          data={selectedMenu} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchMenus}
        />
      )}
    </div>
  );
}