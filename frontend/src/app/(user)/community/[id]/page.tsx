'use client';

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Lock, Calendar, Eye, Download, FileText, User, Mail, Phone, List, Home, MessageCircle } from "lucide-react";
import BrandHeader from "@/app/(user)/components/layout/brand/BrandHeader";
import BrandFooter from "@/app/(user)/components/layout/brand/BrandFooter";
import api from '@/app/lib/api';

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [inputPass, setInputPass] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passError, setPassError] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const getResourceSrc = (url: any) => {
    if (!url || typeof url !== 'string' || url.trim() === '') return null;
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    const hasUploads = url.includes('/uploads/');
    return hasUploads ? `${API_BASE_URL}${cleanPath}` : `${API_BASE_URL}/uploads${cleanPath}`;
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/user/community/${id}`);
        const data = res.data;
        setPost(data);
        if (String(data.is_private) !== '1') setIsUnlocked(true);
      } catch (err) {
        console.error("게시글 로딩 실패:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleBack = () => {
    if (post?.type) router.push(`/community#${post.type}`);
    else router.push('/community');
  };

  const handleUnlock = () => {
    if (post?.password && String(post.password) === String(inputPass)) {
      setIsUnlocked(true);
      setPassError(false);
    } else {
      setPassError(true);
      setInputPass("");
    }
  };

  if (loading) return <div className="min-h-screen bg-[#F9F5F0]" />;
  if (!post) return (
    <div className="min-h-screen bg-[#F9F5F0] flex flex-col items-center justify-center font-bold text-[#3E3232]">
      <div className="w-1 h-12 bg-[#3E3232]/10 mb-6" />
      <span className="text-[10px] tracking-[0.4em] uppercase opacity-40">Article Not Found</span>
      <button onClick={() => router.push('/community')} className="mt-8 text-xs underline opacity-60">Back to List</button>
    </div>
  );

  return (
    <div className="bg-[#F9F5F0] min-h-screen font-suit text-[#3E3232]">
      <BrandHeader />
      
      {/* HERO SECTION - 제목/날짜 다 빼고 카테고리만 있는 평범한 스타일 */}
      <section className="relative w-full bg-[#3E3232] pt-32 md:pt-48 pb-16 md:pb-20 px-6 lg:px-20 overflow-hidden text-[#F9F5F0]">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <nav className="flex items-center gap-3 text-[10px] tracking-[0.2em] font-bold uppercase mb-4 md:mb-6 opacity-40">
              <button onClick={() => router.push('/brand')} className="hover:text-[#8D7B68] transition-colors"><Home size={12} /></button>
              <span className="w-4 h-[1px] bg-white opacity-20" />
              <span>COMMUNITY</span>
              <span className="w-4 h-[1px] bg-white opacity-20" />
              <span className="text-[#8D7B68]">{post.type?.toUpperCase()}</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.05em] uppercase">COMMUNITY</h1>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION - 모든 게시글 정보가 이 아래로 들어옴 */}
      <main className="max-w-[1100px] mx-auto px-6 py-12 md:py-24">
        <div className="flex justify-start mb-8">
           <button 
             onClick={handleBack}
             className="group flex items-center gap-2 text-[11px] font-bold text-[#3E3232]/40 hover:text-[#3E3232] transition-colors"
           >
             <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
             목록으로 돌아가기
           </button>
        </div>

        <AnimatePresence mode="wait">
          {!isUnlocked && String(post.is_private) === '1' ? (
            /* 비밀글 잠금 화면 */
            <motion.div 
              key="lock"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 md:p-20 text-center shadow-sm border border-[#3E3232]/5 max-w-[500px] mx-auto"
            >
              <Lock size={24} className="mx-auto mb-6 text-[#8D7B68] opacity-50" />
              <h2 className="text-xl font-bold mb-8">비밀글입니다.</h2>
              <input 
                type="password" 
                maxLength={4}
                value={inputPass}
                onChange={(e) => setInputPass(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                className={`w-full bg-[#F9F5F0] border-b-2 ${passError ? 'border-red-400' : 'border-[#3E3232]/10'} focus:border-[#3E3232] outline-none py-4 text-center text-xl tracking-[0.8em] font-bold transition-all mb-8`}
                placeholder="••••"
                autoFocus
              />
              <button 
                onClick={handleUnlock}
                className="w-full bg-[#3E3232] text-white py-5 text-[11px] font-black tracking-widest uppercase hover:bg-[#8D7B68] transition-all"
              >
                확인
              </button>
            </motion.div>
          ) : (
            /* 일반 게시글 상세 레이아웃 */
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow-sm border border-[#3E3232]/5"
            >
              {/* 제목 및 메타정보 섹션 */}
              <header className="px-6 md:px-12 py-10 md:py-16 border-b border-[#3E3232]/5">
                <h2 className="text-2xl md:text-4xl font-bold leading-tight break-keep mb-10">
                  {post.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-[12px] md:text-sm font-bold text-[#3E3232]/40">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-[#8D7B68]" />
                    <span className="text-[#3E3232]">{post.author || '익명 고객'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{post.created_at?.split('T')[0].replace(/-/g, '.')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye size={14} />
                    <span>조회수 {post.view_count || 0}</span>
                  </div>
                  {post.email && (
                    <div className="flex items-center gap-2 lg:ml-4 border-l lg:pl-6 border-[#3E3232]/10">
                      <Mail size={14} />
                      <span>{post.email}</span>
                    </div>
                  )}
                </div>
              </header>

              {/* 본문 내용 */}
              <div className="px-6 md:px-12 py-12 md:py-20">
                {post.thumbnail_url && (
                  <div className="mb-12 text-center">
                    <img 
                      src={getResourceSrc(post.thumbnail_url) || ""} 
                      alt="첨부 이미지" 
                      className="max-w-full h-auto mx-auto"
                    />
                  </div>
                )}
                <div className="text-[16px] md:text-[18px] leading-[1.8] text-[#3E3232]/80 whitespace-pre-wrap break-all min-h-[150px]">
                  {post.content}
                </div>

                {/* 💡 관리자 답변이 존재할 경우에만 렌더링되는 답변 박스 */}
                {post.answer && (
                  <div className="mt-16 bg-[#F9F5F0]/80 border border-[#8D7B68]/20 p-8 md:p-12 relative overflow-hidden">
                    {/* 좌측 포인트 컬러 라인 */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#8D7B68]" />
                    
                    <div className="flex items-center gap-3 text-[11px] font-black tracking-[0.2em] text-[#8D7B68] uppercase mb-6">
                      <MessageCircle size={16} /> 
                      <span>관리자 답변</span>
                    </div>
                    
                    <div className="text-[15px] md:text-[16px] leading-[1.8] text-[#3E3232]/90 whitespace-pre-wrap break-all font-medium">
                      {post.answer}
                    </div>
                  </div>
                )}
              </div>

              {/* 첨부파일 섹션 */}
              {post.file_url && (
                <div className="px-6 md:px-12 py-8 bg-[#F9F5F0]/50 border-t border-[#3E3232]/5">
                  <div className="flex items-center gap-3 text-[10px] font-black tracking-widest opacity-30 mb-4">
                    <FileText size={14} /> ATTACHED ASSETS
                  </div>
                  <a 
                    href={getResourceSrc(post.file_url) || "#"} 
                    download 
                    className="inline-flex items-center gap-4 px-6 py-4 bg-white border border-[#3E3232]/10 hover:border-[#8D7B68] transition-all group"
                  >
                    <Download size={16} className="text-[#8D7B68]" />
                    <span className="text-xs font-bold">{post.file_name || '파일 다운로드'}</span>
                  </a>
                </div>
              )}

              {/* 하단 목록 버튼 */}
              <footer className="px-6 md:px-12 py-10 border-t border-[#3E3232]/5 flex justify-center">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-3 px-12 py-5 bg-[#3E3232] text-white text-[11px] font-black tracking-[0.3em] uppercase hover:bg-[#8D7B68] transition-all"
                >
                  <List size={14} /> Back to List
                </button>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BrandFooter />
    </div>
  );
}