'use client';

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Pin, PenLine, Home, Inbox, Calendar } from "lucide-react"; 
import BrandHeader from "@/app/(user)/components/layout/brand/BrandHeader";
import BrandFooter from "@/app/(user)/components/layout/brand/BrandFooter";
import api from '@/lib/api';

// 게시글 타입 정의
interface Post {
  idx: number;
  title: string;
  created_at: string;
  is_notice: number;
  is_private: number;
  type: string;
  thumbnail_url?: string; // 썸네일 이미지 경로 추가
}

const CATEGORIES = [
  { id: 'notice', name: '공지사항', eng: 'NOTICE', emptyMsg: '등록된 공지사항이 없습니다.' },
  { id: 'event', name: '이벤트', eng: 'EVENT', emptyMsg: '등록된 이벤트가 없습니다.\n좋은 이벤트로 금방 찾아뵙겠습니다.' },
  { id: 'voc', name: '고객의 소리', eng: 'Q&A', emptyMsg: '등록된 문의 글이 없습니다.' }
];

export default function CommunityPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('notice');
  const [posts, setPosts] = useState<Post[]>([]); 
  const [loading, setLoading] = useState(true);

  const currentCategory = CATEGORIES.find(cat => cat.id === activeTab) || CATEGORIES[0];

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (CATEGORIES.find(cat => cat.id === hash)) setActiveTab(hash);
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    router.replace(`/community#${id}`, { scroll: false });
  };

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/user/community?type=${activeTab}`);
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (error) { 
      console.error("게시글 로딩 실패:", error);
      setPosts([]); 
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  return (
    <div className="bg-[#F9F5F0] min-h-screen font-suit text-[#3E3232]">
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

      {/* LIST/GRID SECTION */}
      <main className="max-w-[1400px] mx-auto px-6 lg:px-20 py-12 md:py-30">
        <div className="flex justify-end mb-8">
          {activeTab === 'voc' && (
            <button
              onClick={() => router.push('/community/write')}
              className="flex items-center gap-3 bg-[#3E3232] text-[#F9F5F0] px-6 md:px-8 py-3 md:py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#8D7B68] transition-all"
            >
              <PenLine size={14} />
              <span>Write Q&A</span>
            </button>
          )}
        </div>

        {/* 테이블 헤더 - 이벤트가 아닐 때만 노출 (모바일 제외) */}
        {posts.length > 0 && activeTab !== 'event' && (
          <div className="hidden md:flex items-center px-8 py-6 border-t-2 border-b border-[#3E3232] text-[11px] tracking-[0.3em] uppercase font-black">
            <div className="w-24 opacity-40">번호.</div>
            <div className="flex-1">제목</div>
            <div className="w-40 text-right opacity-40">등록일</div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab} 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }}
          >
            {posts.length > 0 ? (
              activeTab === 'event' ? (
                /* 이벤트 전용 썸네일 그리드 UI */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                  {posts.map((post) => (
                    <div
                      key={post.idx}
                      onClick={() => router.push(`/community/${post.idx}`)}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE3DB] mb-6">
                        {post.thumbnail_url ? (
                          <img 
                            src={post.thumbnail_url} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center opacity-20">
                            <Calendar size={48} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold tracking-widest text-[#8D7B68] uppercase">Event No.{post.idx}</span>
                        <h3 className="text-xl font-bold text-[#3E3232] line-clamp-2 group-hover:text-[#8D7B68] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-xs font-medium text-[#3E3232]/40">
                          {post.created_at?.split('T')[0].replace(/-/g, '.')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* 공지사항/VOC 리스트 UI */
                posts.map((post) => (
                  <div
                    key={post.idx}
                    onClick={() => router.push(`/community/${post.idx}`)}
                    className="group flex flex-col md:flex-row md:items-center px-4 md:px-8 py-4 md:py-6 border-b border-[#3E3232]/10 cursor-pointer transition-all hover:bg-white"
                  >
                    <div className="w-full md:w-24 mb-2 md:mb-0 text-[11px] font-bold text-[#3E3232]/30 group-hover:text-[#8D7B68]">
                      {Number(post.is_notice) === 1 ? (
                        <div className="flex items-center gap-2">
                          <Pin size={14} className="text-[#8D7B68] fill-[#8D7B68]" />
                          <span className="md:hidden text-[#8D7B68]">공지사항</span>
                        </div>
                      ) : (
                        `NO. ${String(post.idx).padStart(2, '0')}`
                      )}
                    </div>

                    <div className="flex-1 flex items-center gap-3">
                      {activeTab === 'voc' && Number(post.is_private) === 1 && <Lock size={14} className="text-[#8D7B68]" />}
                      <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#3E3232] group-hover:translate-x-2 transition-transform duration-300 line-clamp-1">
                        {post.title}
                      </h3>
                    </div>

                    <div className="w-full md:w-40 mt-4 md:mt-0 text-right">
                      <span className="text-[11px] md:text-xs font-bold text-[#3E3232]/30 group-hover:text-[#3E3232]">
                        {post.created_at?.split('T')[0].replace(/-/g, '.')}
                      </span>
                    </div>
                  </div>
                ))
              )
            ) : !loading && (
              <div className="py-24 flex flex-col items-center text-center">
                <Inbox size={48} strokeWidth={1} className="text-[#3E3232]/10 mb-6" />
                <h3 className="text-xl md:text-2xl font-bold text-[#3E3232] whitespace-pre-wrap">{currentCategory.emptyMsg}</h3>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <BrandFooter />
    </div>
  );
}