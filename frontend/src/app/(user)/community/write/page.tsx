'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ShieldCheck, Loader2, Mail, Phone, User, Lock } from "lucide-react";
import BrandHeader from "@/app/(user)/components/layout/brand/BrandHeader";
import BrandFooter from "@/app/(user)/components/layout/brand/BrandFooter";
import api from '@/app/lib/api';

export default function CommunityWritePage() {
  const router = useRouter();
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    password: "",
    author: "",
    email: "",
    phone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (isPrivate && (!formData.password || formData.password.length < 4)) {
      alert("비밀글은 비밀번호 4자리가 필수입니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        category: 'community',
        type: 'voc',
        title: formData.title,
        content: formData.content,
        author: formData.author,
        email: formData.email,
        phone: formData.phone,
        is_private: isPrivate ? 1 : 0,
        password: isPrivate ? formData.password : null
      };

      const res = await api.post('/user/community/write', payload);

      if (res.data.success) {
        alert("소중한 의견이 성공적으로 접수되었습니다.");
        router.push('/community#voc');
        router.refresh();
      }
    } catch (error: any) {
      console.error("❌ 상세 에러 로그:", error.response || error);
      const serverMsg = error.response?.data?.error || error.response?.data?.message;
      alert(`등록 실패: ${serverMsg || "서버 통신 중 에러가 발생했습니다."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F9F5F0] min-h-screen font-suit text-[#3E3232]">
      <BrandHeader />
      
      {/* HERO SECTION */}
      <section className="relative w-full bg-[#3E3232] pt-48 pb-24 px-6 lg:px-20 text-[#F9F5F0]">
        <div className="max-w-[1400px] mx-auto text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex items-center gap-3 text-[10px] tracking-[0.2em] font-bold uppercase mb-8 opacity-40">
              <button 
                type="button"
                onClick={() => router.back()} 
                className="hover:text-[#8D7B68] flex items-center gap-2 outline-none transition-colors cursor-pointer"
              >
                <ChevronLeft size={12} /> Back to Community
              </button>
            </nav>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-[-0.05em] uppercase">고객의 소리 작성</h1>
            <p className="mt-4 opacity-60 text-sm md:text-base font-medium">리프레소는 고객님의 소중한 의견에 귀를 기울입니다.</p>
          </motion.div>
        </div>
      </section>

      <main className="max-w-[900px] mx-auto px-6 py-20">
        <form onSubmit={handleSubmit} className="space-y-16">
          
          {/* USER INFO SECTION */}
          <div className="space-y-10">
            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-[#8D7B68] border-b border-[#8D7B68]/20 pb-4">
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {/* 성함 */}
              <div className="group space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black tracking-[0.1em] uppercase opacity-40 group-focus-within:text-[#8D7B68] group-focus-within:opacity-100 transition-all">
                  <User size={12} /> Name
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="성함을 입력해주세요"
                  className="w-full bg-transparent border-b border-[#3E3232]/20 focus:border-[#3E3232] outline-none py-2 font-bold transition-all placeholder:text-[#3E3232]/20 text-lg"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                />
              </div>

              {/* 연락처 */}
              <div className="group space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black tracking-[0.1em] uppercase opacity-40 group-focus-within:text-[#8D7B68] group-focus-within:opacity-100 transition-all">
                  <Phone size={12} /> Phone
                </label>
                <input 
                  required
                  type="tel" 
                  placeholder="010-0000-0000"
                  className="w-full bg-transparent border-b border-[#3E3232]/20 focus:border-[#3E3232] outline-none py-2 font-bold transition-all placeholder:text-[#3E3232]/20 text-lg"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              {/* 이메일 */}
              <div className="group space-y-3 md:col-span-2">
                <label className="flex items-center gap-2 text-[10px] font-black tracking-[0.1em] uppercase opacity-40 group-focus-within:text-[#8D7B68] group-focus-within:opacity-100 transition-all">
                  <Mail size={12} /> Email Address
                </label>
                <input 
                  required
                  type="email" 
                  placeholder="example@refresh-so.com"
                  className="w-full bg-transparent border-b border-[#3E3232]/20 focus:border-[#3E3232] outline-none py-2 font-bold transition-all placeholder:text-[#3E3232]/20 text-lg"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* 비밀글 설정 */}
              <div className="md:col-span-2 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <button 
                    type="button" 
                    onClick={() => setIsPrivate(!isPrivate)} 
                    className="flex items-center gap-3 outline-none group cursor-pointer w-fit"
                  >
                    <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${isPrivate ? 'bg-[#3E3232] border-[#3E3232]' : 'border-[#3E3232]/20 group-hover:border-[#3E3232]'}`}>
                      {isPrivate && <ShieldCheck size={14} className="text-white" />}
                    </div>
                    <span className={`text-sm font-bold transition-colors ${isPrivate ? 'text-[#3E3232]' : 'text-[#3E3232]/40'}`}>
                      비밀글로 문의하기
                    </span>
                  </button>

                  <AnimatePresence>
                    {isPrivate && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-[1px] h-4 bg-[#3E3232]/10 hidden sm:block" />
                        <div className="relative">
                          <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3E3232]/30" />
                          <input 
                            required 
                            type="password" 
                            placeholder="비밀번호 4자리" 
                            maxLength={4}
                            className="bg-white border border-[#3E3232]/10 pl-9 pr-4 py-2 text-sm font-bold outline-none focus:border-[#8D7B68] w-[160px]"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value.replace(/[^0-9]/g, '')})}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="space-y-10">
            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-[#8D7B68] border-b border-[#8D7B68]/20 pb-4">
              Inquiry Content
            </h2>
            
            <div className="space-y-8">
              <div className="group space-y-3">
                <label className="text-[10px] font-black tracking-[0.1em] uppercase opacity-40 group-focus-within:text-[#8D7B68] group-focus-within:opacity-100 transition-all">Subject</label>
                <input 
                  required 
                  type="text" 
                  placeholder="문의 제목을 입력해주세요"
                  className="w-full bg-transparent border-b border-[#3E3232]/20 focus:border-[#3E3232] outline-none py-3 text-2xl font-bold transition-all placeholder:text-[#3E3232]/20"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="group space-y-3">
                <label className="text-[10px] font-black tracking-[0.1em] uppercase opacity-40 group-focus-within:text-[#8D7B68] group-focus-within:opacity-100 transition-all">Message</label>
                <textarea 
                  required 
                  rows={10} 
                  placeholder="리프레소에 대한 소중한 의견을 자유롭게 적어주세요."
                  className="w-full bg-white border border-[#3E3232]/10 p-8 outline-none focus:border-[#8D7B68] transition-all font-medium resize-none placeholder:text-[#3E3232]/20 leading-relaxed"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-[#3E3232]/10 gap-8">
            <button 
              type="button" 
              onClick={() => router.back()} 
              className="group flex items-center gap-2 text-xs font-bold tracking-[0.1em] text-[#3E3232]/50 hover:text-[#3E3232] transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>작성 취소하고 돌아가기</span>
            </button>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`
                relative bg-[#3E3232] text-[#F9F5F0] px-12 py-5 text-xs font-black tracking-[0.3em] uppercase 
                hover:bg-[#8D7B68] transition-all overflow-hidden
                ${isSubmitting ? 'opacity-70 cursor-wait' : 'cursor-pointer active:scale-95 shadow-xl shadow-[#3E3232]/10'}
              `}
            >
              <div className="flex items-center gap-3">
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
              </div>
            </button>
          </div>
        </form>
      </main>

      <BrandFooter />
    </div>
  );
}