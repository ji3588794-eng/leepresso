'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

export default function Identity() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // 포인트 레드를 포함한 4가지 브랜드 컬러 설정
  const colors = [
    { name: 'DEEP CHOCO', hex: '#3E3232', rgb: '62, 50, 50', cmyk: '65, 75, 70, 60', dark: true },
    { name: 'POINT RED', hex: '#A9443D', rgb: '169, 68, 61', cmyk: '25, 85, 80, 20', dark: true },
    { name: 'POINT BROWN', hex: '#8D7B68', rgb: '141, 123, 104', cmyk: '45, 50, 60, 15', dark: true },
    { name: 'IVORY BASE', hex: '#F9F5F0', rgb: '249, 245, 240', cmyk: '2, 3, 5, 0', dark: false },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#F9F5F0] font-suit">
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pt-14 sm:px-6 sm:pt-16 md:px-8 lg:px-10 lg:pt-24">
          {/* BRAND STORY HEADER */}
          <div className="mb-10 space-y-4 text-center sm:mb-12 sm:space-y-5 lg:mb-12">
            <div className="mb-2 flex items-center justify-center gap-3">
              <div className="h-px w-6 bg-[#8D7B68]/30 sm:w-8" />
              <span className="text-[11px] font-black uppercase italic tracking-[0.3em] text-[#8D7B68] sm:text-[12px] sm:tracking-[0.4em]">
                Brand Identity
              </span>
              <div className="h-px w-6 bg-[#8D7B68]/30 sm:w-8" />
            </div>

            <h2 className="text-[30px] font-black leading-none tracking-tight text-[#3E3232] sm:text-[38px] md:text-[46px] lg:text-[56px] lg:tracking-tighter">
              리프레소 <span className="text-[#A9443D]">아이덴티티</span>
            </h2>

            <div className="mx-auto w-full max-w-[700px] border-t border-dashed border-[#8D7B68]/30 pt-6 sm:pt-8">
              <p className="break-keep px-2 text-[14px] font-medium leading-relaxed text-[#3E3232]/70 sm:px-0 sm:text-[15px] md:text-base lg:text-lg">
                리프레소는 기업대표의 경영철학인 진심 & 열정을 담아
                <br className="hidden sm:block" />
                커피 본연의 깊고 진한 맛을 제공하는 착한 프랜차이즈 기업입니다.
              </p>
            </div>
          </div>

          {/* IDENTITY MAIN LAYOUT */}
          <div className="grid grid-cols-1 items-stretch gap-10 pb-16 sm:pb-20 lg:grid-cols-12 lg:gap-14 xl:gap-20 lg:pb-24">
            {/* LEFT: BIG LOGO PREVIEW */}
            <div className="flex lg:col-span-6">
              <div className="group relative flex min-h-[340px] w-full items-center justify-center overflow-hidden rounded-[24px] border border-[#3E3232]/10 bg-white shadow-sm sm:min-h-[420px] sm:rounded-[30px] md:min-h-[480px] lg:min-h-full lg:rounded-[40px]">
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage: `linear-gradient(#3E3232 1px, transparent 1px), linear-gradient(to right, #3E3232 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                />

                <div className="absolute left-6 top-1/2 hidden -rotate-90 origin-left select-none whitespace-nowrap text-[11px] font-black uppercase tracking-[0.6em] text-[#3E3232]/20 lg:block">
                  Leepresso Design System
                </div>

                <div className="relative z-10 flex aspect-square w-[72%] items-center justify-center sm:w-[62%] md:w-[56%] lg:w-3/5">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#4A3B3B] to-[#2A2222] shadow-[0_30px_60px_rgba(62,50,50,0.35),inset_0_-12px_24px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="pointer-events-none absolute left-[15%] top-[15%] h-[30%] w-[30%] rounded-full bg-white/10 blur-2xl" />
                  <img
                    src="/logo_white.png"
                    alt="Main Symbol"
                    className="relative z-20 h-auto w-[46%] object-contain transition-transform duration-500 group-hover:translate-y-[-8px] sm:w-1/2"
                  />
                </div>

                <div className="absolute bottom-6 right-6 flex gap-2 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#A9443D]/20" />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: CONTENT LIST */}
            <div className="flex flex-col justify-between space-y-12 py-0 sm:space-y-14 lg:col-span-6 lg:py-4 xl:py-6">
              {/* 01. Brand Naming */}
              <div className="group relative pl-0 pt-6 sm:pt-8 md:pl-12 md:pt-0">
                <span className="absolute left-0 top-0 select-none text-[40px] font-black italic leading-none text-[#8D7B68]/10 sm:text-[46px] md:left-[15px] md:top-[-20px] md:text-[50px]">
                  01
                </span>

                <div className="space-y-4 sm:space-y-5">
                  <h4 className="text-[12px] font-black uppercase italic tracking-[0.24em] text-[#8D7B68] sm:text-[13px] sm:tracking-[0.2em]">
                    Brand Naming
                  </h4>

                  <div className="space-y-5 sm:space-y-6">
                    <img src="/logo_brand.png" className="h-8 w-auto object-contain sm:h-10 md:h-12" alt="Naming Logo" />

                    <div className="relative px-0 pt-5 md:py-1 md:pl-6">
                      <div className="absolute left-0 top-0 h-[2px] w-full bg-[#3E3232] md:bottom-0 md:top-0 md:h-auto md:w-[2px]" />
                      <div className="break-keep space-y-3 text-[14px] font-semibold leading-relaxed text-[#3E3232]/80 sm:text-[15px] lg:text-[16px]">
                        <p><strong className="font-black text-[#3E3232]">LEE :</strong> 가맹사업을 향한 기업대표의 진심과 열정</p>
                        <p><strong className="font-black text-[#3E3232]">PRESSO :</strong> 깊고 진한 커피 본연의 맛</p>
                        <p className="mt-4 text-sm font-bold text-[#3E3232] sm:text-[15px] lg:text-base">
                          이 두 가지 진심이 결합하여 리프레소만의 독보적인 브랜드 가치를 완성합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 02. Brand Symbol */}
              <div className="group relative pl-0 pt-6 sm:pt-8 md:pl-12 md:pt-0">
                <span className="absolute left-0 top-0 select-none text-[40px] font-black italic leading-none text-[#8D7B68]/10 sm:text-[46px] md:left-[15px] md:top-[-20px] md:text-[50px]">
                  02
                </span>

                <div className="space-y-4 sm:space-y-5">
                  <h4 className="text-[12px] font-black uppercase italic tracking-[0.24em] text-[#8D7B68] sm:text-[13px] sm:tracking-[0.2em]">
                    Brand Symbol
                  </h4>

                  <div className="relative px-0 pt-5 md:py-1 md:pl-6">
                    <div className="absolute left-0 top-0 h-[2px] w-full bg-[#3E3232] md:bottom-0 md:top-0 md:h-auto md:w-[2px]" />

                    <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-center md:gap-8">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center p-0 sm:h-12 sm:w-12">
                        <img src="/logo_ba.png" className="h-auto w-full object-contain" alt="Symbol Logo" />
                      </div>

                      <p className="break-keep text-[14px] font-semibold leading-relaxed text-[#3E3232]/70 sm:text-[15px] lg:text-[16px]">
                        커피 원두의 형상을 감각적으로 이미지화하여,
                        <br className="hidden sm:block" />
                        친근함을 담아낸 리프레소의 핵심 심볼마크입니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 03. Brand Color */}
              <div className="group relative pl-0 pt-6 sm:pt-8 md:pl-12 md:pt-0">
                <span className="absolute left-0 top-0 select-none text-[40px] font-black italic leading-none text-[#8D7B68]/10 sm:text-[46px] md:left-[10px] md:top-[-20px] md:text-[50px]">
                  03
                </span>

                <div className="space-y-4 sm:space-y-5">
                  <h4 className="text-[12px] font-black uppercase italic tracking-[0.24em] text-[#8D7B68] sm:text-[13px] sm:tracking-[0.2em]">
                    Brand Color
                  </h4>

                  <div className="space-y-8 sm:space-y-10">
                    {/* 4개 컬러를 표시하기 위한 그리드 조정 (2x2) */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-4 xl:gap-6">
                      {colors.map((color, i) => (
                        <div key={i} className="flex flex-col gap-3">
                          <div
                            className="relative flex h-24 w-full items-center justify-center rounded-xl border border-black/5 shadow-md transition-transform hover:scale-[1.02]"
                            style={{ backgroundColor: color.hex }}
                          >
                            <button
                              onClick={() => handleCopy(color.hex)}
                              className="absolute right-2 top-2 rounded-md bg-black/10 p-1.5 transition-colors hover:bg-black/20"
                            >
                              {copiedHex === color.hex ? (
                                <Check size={14} className={color.dark ? 'text-white' : 'text-black'} />
                              ) : (
                                <Copy size={14} className={color.dark ? 'text-white' : 'text-black'} />
                              )}
                            </button>

                            <div className={`absolute bottom-2 right-3 text-right text-[8px] font-bold leading-tight ${color.dark ? 'text-white/60' : 'text-black/40'}`}>
                              <div>RGB {color.rgb}</div>
                              <div>CMYK {color.cmyk}</div>
                            </div>
                          </div>

                          <div className="flex flex-col px-1">
                            <span className="mb-1 truncate text-[10px] font-black uppercase tracking-tighter text-[#3E3232]">{color.name}</span>
                            <span className="text-[11px] font-bold uppercase text-[#8D7B68]">{color.hex}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="relative max-w-full px-0 pt-5 md:py-0 md:pl-6">
                      <div className="absolute left-0 top-0 h-[2px] w-full bg-[#3E3232] md:bottom-0 md:top-0 md:h-auto md:w-[2px]" />
                      <p className="break-keep text-[14px] font-semibold leading-relaxed text-[#3E3232]/70 sm:text-[15px] md:text-[16px] lg:text-[17px]">
                        리프레소 메인컬러는 고급스러운 신뢰의 <span className="text-[#3E3232] font-bold">딥 초코</span>,<br/> 
                        강렬한 열정과 진심을 상징하는 <span className="text-[#A9443D] font-bold">포인트 레드</span>,<br/>
                        커피본연을 상징하는 <span className="text-[#8D7B68] font-bold">포인트 브라운</span> 그리고 <span className="text-[#8D7B68] font-bold">아이보리</span> 베이스로 구성되어<br/> 리프레소만의 확고한 브랜드 정체성을 상징합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="flex justify-center bg-[#F9F5F0]">
        <img 
          src="/check_line.png" 
          alt="Decoration Line" 
          className="w-full max-w-[100%] opacity-80 object-contain" 
        />
      </div>
    </>
  );
}