//웹사이트 메인컬러 / 전역변수로 사용
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    //적용시킬 폴더지정 (1. pages, 2. components, 3. app)
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        leepresso: {
          bg: '#F9F5F0',    // 메인 배경 (아이보리)
          base: '#E8D5C4',  // 카드/섹션 구분 (베이지)
          point: '#8D7B68', // 버튼/강조 (브라운)
          deep: '#3E3232',  // 텍스트/로고 (다크 초코)
        },
      },
    },
  },
  plugins: [],
};
export default config;