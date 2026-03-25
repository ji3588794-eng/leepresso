import BrandHeader from "@/app/(user)/components/layout/brand/BrandHeader";
import BrandFooter from "@/app/(user)/components/layout/brand/BrandFooter";

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BrandHeader /> {/* 브랜드용 헤더 */}
      <div className="min-h-screen">{children}</div>
      <BrandFooter />
    </>
  );
}