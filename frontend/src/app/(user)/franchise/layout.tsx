import FranchiseHeader from "@/app/(user)/components/layout/franchise/FranchiseHeader";
import FranchiseFooter from "@/app/(user)/components/layout/franchise/FranchiseFooter";
import FranchiseQuickBar from "@/app/(user)/components/layout/franchise/FranchiseQuickBar";

export default function FranchiseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 프랜차이즈 전용 헤더 */}
      <FranchiseHeader />

      {/* 실제 페이지 콘텐츠 (Hero, Price, Contact 등) */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* 퀵메뉴 */}
      <FranchiseQuickBar />

      {/* 프랜차이즈 전용 푸터 */}
      <FranchiseFooter />
    </>
  );
}