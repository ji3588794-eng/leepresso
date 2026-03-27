'use client';

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Pin, PenLine, Home, Inbox, Calendar, ChevronLeft, ChevronRight } from "lucide-react"; 
import BrandHeader from "@/app/(user)/components/layout/brand/BrandHeader";
import BrandFooter from "@/app/(user)/components/layout/brand/BrandFooter";
import api from '@/lib/api';
import QuickMenu from "../components/common/QuickMenu";

interface Post {
  idx: number;
  title: string;
  created_at: string;
  is_notice: number;
  is_private: number;
  type: string;
  thumbnail_url?: string;
}

const CATEGORIES = [
  { id: 'notice', name: '공지사항', eng: 'NOTICE', emptyMsg: '등록된 공지사항이 없습니다.' },
  { id: 'event', name: '이벤트', eng: 'EVENT', emptyMsg: '등록된 이벤트가 없습니다.\n좋은 이벤트로 금방 찾아뵙겠습니다.' },
  { id: 'voc', name: '고객의 소리', eng: 'Q&A', emptyMsg: '등록된 문의 글이 없습니다.' }
];

const ITEMS_PER_PAGE = 10;

// 환경변수 NEXT_PUBLIC_API_URL을 사용하는 이미지 경로 변환 함수
const getImageUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  return `${baseUrl}${url}`;
};

export default function CommunityPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('notice');
  const [posts, setPosts] = useState<Post[]>([]); 
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const currentCategory = CATEGORIES.find(cat => cat.id === activeTab) || CATEGORIES[0];

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (CATEGORIES.find(cat => cat.id === hash)) {
        setActiveTab(hash);
        setCurrentPage(1);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setCurrentPage(1);
    router.replace(`/community#${id}`, { scroll: false });
  };

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/user/community?type=${activeTab}`);
      const data = Array.isArray(res.data) ? res.data : [];
      
      const sortedData = [...data].sort((a, b) => {
        if (a.is_notice === 1 && b.is_notice !== 1) return -1;
        if (a.is_notice !== 1 && b.is_notice === 1) return 1;
        return 0; 
      });
      
      setPosts(sortedData);
    } catch (error) { 
      console.error("게시글 로딩 실패:", error);
      setPosts([]); 
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return posts.slice(start, start + ITEMS_PER_PAGE);
  }, [posts, currentPage]);

  return (
    <div className="bg-[#F9F5F0] min-h-screen font-suit text-[#3E3232]">
      <QuickMenu />
      <BrandHeader />

      {/* HERO SECTION */}
      <section className="relative w-full bg-[#3E3232] pt-32 md:pt-48 pb-16 md:pb-20 px-6 lg:px-20 overflow-hidden text-[#F9F5F0]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
          <motion.div key={activeTab} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <nav className="flex items-center gap-3 text-[10px] tracking-[0.2em] font-bold uppercase mb-4 md:mb-6 opacity-40">
              <button onClick={() => router.push('/brand')} className="hover:text-[#8D7B68] transition-colors"><Home size={12} /></button>
              <span className="w-4 h-[1px] bg-white opacity-20" />
              <span>COMMUNITY</span>
              <span className="w-4 h-[1px] bg-white opacity-20" />
              <span className="text-[#8D7B68]">{currentCategory.eng}</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.05em] uppercase">{currentCategory.name}</h1>
          </motion.div>

          <nav className="flex items-center gap-6 md:gap-12 border-b border-white/10 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabClick(cat.id)}
                className={`group relative text-xs md:text-sm tracking-widest font-bold pb-4 transition-all duration-300 ${activeTab === cat.id ? "text-white" : "text-white/30 hover:text-white/60"}`}
              >
                {cat.name}
                {activeTab === cat.id && <motion.div layoutId="activeUnderline" className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#8D7B68]" />}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-[1400px] mx-auto px-6 lg:px-20 py-12 md:py-24">
        <div className="flex justify-end mb-10">
          {activeTab === 'voc' && (
            <button
              onClick={() => router.push('/community/write')}
              className="flex items-center gap-3 bg-[#3E3232] text-[#F9F5F0] px-6 md:px-8 py-3 md:py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#8D7B68] transition-all shadow-lg"
            >
              <PenLine size={14} />
              <span>Write Q&A</span>
            </button>
          )}
        </div>

        {posts.length > 0 && activeTab !== 'event' && (
          <div className="hidden md:flex items-center px-10 py-5 border-t-2 border-b border-[#3E3232] text-[11px] tracking-[0.2em] uppercase font-black text-[#3E3232]/60">
            <div className="w-24">No.</div>
            <div className="flex-1">Title</div>
            <div className="w-32 text-right">Date</div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div 
            key={`${activeTab}-${currentPage}`} 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }}
            className="min-h-[400px]"
          >
            {posts.length > 0 ? (
              activeTab === 'event' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {currentItems.map((post) => (
                    <div
                      key={post.idx}
                      onClick={() => router.push(`/community/${post.idx}`)}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE3DB] mb-6 shadow-sm">
                        {post.thumbnail_url ? (
                          <img 
                            src={getImageUrl(post.thumbnail_url)} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center opacity-10">
                            <Calendar size={60} strokeWidth={1} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-[#3E3232]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="space-y-3">
                        <span className="text-[10px] font-black tracking-[0.2em] text-[#8D7B68] uppercase">Event Item</span>
                        <h3 className="text-xl font-bold text-[#3E3232] line-clamp-1 group-hover:text-[#8D7B68] transition-colors duration-300">
                          {post.title}
                        </h3>
                        <p className="text-[12px] font-medium text-[#3E3232]/40 tracking-wider">
                          {post.created_at?.split('T')[0].replace(/-/g, '.')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col">
                  {currentItems.map((post, index) => {
                    const virtualNo = posts.length - ((currentPage - 1) * ITEMS_PER_PAGE) - index;
                    return (
                      <div
                        key={post.idx}
                        onClick={() => router.push(`/community/${post.idx}`)}
                        className={`group flex flex-col md:flex-row md:items-center px-6 md:px-10 py-6 md:py-8 border-b border-[#3E3232]/10 cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-xl hover:z-10 relative ${post.is_notice === 1 ? 'bg-[#FDFBF9]' : ''}`}
                      >
                        <div className="w-full md:w-24 mb-3 md:mb-0 text-[12px] font-black text-[#3E3232]/20 group-hover:text-[#8D7B68] transition-colors">
                          {Number(post.is_notice) === 1 ? (
                            <div className="flex items-center gap-2">
                              <Pin size={16} className="text-[#8D7B68] fill-[#8D7B68]" />
                              <span className="md:hidden text-[#8D7B68] font-black">NOTICE</span>
                            </div>
                          ) : (
                            String(virtualNo).padStart(2, '0')
                          )}
                        </div>

                        <div className="flex-1 flex items-center gap-3 overflow-hidden">
                          {activeTab === 'voc' && Number(post.is_private) === 1 && (
                            <Lock size={16} className="text-[#8D7B68] shrink-0" />
                          )}
                          <h3 className={`text-lg md:text-xl font-bold tracking-tight text-[#3E3232] group-hover:text-[#8D7B68] group-hover:translate-x-3 transition-all duration-500 line-clamp-1 ${post.is_notice === 1 ? 'text-[#3E3232]' : ''}`}>
                            {post.title}
                          </h3>
                        </div>

                        <div className="w-full md:w-32 mt-4 md:mt-0 text-left md:text-right">
                          <span className="text-[11px] md:text-[12px] font-bold text-[#3E3232]/30 group-hover:text-[#3E3232] transition-colors tracking-tighter">
                            {post.created_at?.split('T')[0].replace(/-/g, '.')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            ) : !loading && (
              <div className="py-32 flex flex-col items-center text-center">
                <Inbox size={64} strokeWidth={1} className="text-[#3E3232]/10 mb-8" />
                <h3 className="text-xl md:text-2xl font-bold text-[#3E3232] whitespace-pre-wrap leading-relaxed opacity-60">
                  {currentCategory.emptyMsg}
                </h3>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {posts.length > ITEMS_PER_PAGE && (
          <div className="mt-20 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-3 text-[#3E3232] hover:bg-[#3E3232] hover:text-white disabled:opacity-10 transition-all rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 text-[13px] font-bold rounded-full transition-all ${
                    currentPage === page 
                    ? "bg-[#3E3232] text-white shadow-md" 
                    : "text-[#3E3232]/40 hover:bg-white hover:text-[#3E3232]"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-3 text-[#3E3232] hover:bg-[#3E3232] hover:text-white disabled:opacity-10 transition-all rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </main>

      <BrandFooter />
    </div>
  );
}