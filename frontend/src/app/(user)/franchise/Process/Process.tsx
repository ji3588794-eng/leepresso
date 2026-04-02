"use client";
import "./Process.scss";
import { 
  Search, 
  Users, 
  FileText, 
  PenTool, 
  Settings, 
  Store, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const processItems = [
  { step: "01", title: "상권분석", desc: "데이터 기반 입지 분석", icon: <Search size={22} /> },
  { step: "02", title: "사업설명회", desc: "1:1 수익 시뮬레이션", icon: <Users size={22} /> },
  { step: "03", title: "정보공개서", desc: "투명한 법적 절차 이행", icon: <FileText size={22} /> },
  { step: "04", title: "가맹계약", desc: "출점 전략 최종 확정", icon: <PenTool size={22} /> },
  { step: "05", title: "시설세팅", desc: "무인 시스템 완벽 구축", icon: <Settings size={22} /> },
  { step: "06", title: "가맹점 OPEN", desc: "운영 지원 및 정식 오픈", icon: <Store size={22} /> },
];

const documents = [
  "가맹후보점포 임대차계약서",
  "자판기영업자 과정 수료증",
  "보건증 (건강진단결과서)",
  "영업신고증",
  "사업자등록증",
  "본인 명의 신분증",
];

export default function Process() {
  return (
    <section id="process-info" className="process">
      <div className="container">
        {/* 헤더 */}
        <div className="header">
          <div className="title-txts4">
            <img src="/franchise-title4.png" alt="창업 절차" />
          </div>
          <div className="infoRow">
            <p>
              리프레소와 함께하는 <strong>전문적인 6단계</strong> 컨설팅. <br />
              안정적인 창업의 길을 제시합니다.
            </p>
          </div>
        </div>

        {/* 6단계 플로우 - 박스 크기 균일화 및 화살표 외부 배치 */}
        <div className="stepGrid">
          {processItems.map((item, index) => (
            <div key={item.step} className="stepWrapper">
              <div className="stepBox">
                <div className="bgNum">{item.step}</div>
                <div className="topInfo">
                  <div className="iconWrap">{item.icon}</div>
                </div>
                <div className="bottomInfo">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
              
              {/* 마지막 단계가 아닐 때만 화살표 표시 */}
              {index !== processItems.length - 1 && (
                <div className="connector">
                  <ArrowRight size={25} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 서류 섹션 */}
        <div className="docWrapper">
          <div className="docTitleSide">
            <div className="tag">Checklist</div>
            <h2>필수 구비 서류</h2>
            <p>계약 전 반드시 준비해 주세요.</p>
          </div>
          <div className="docContentSide">
            <div className="docList">
              {documents.map((doc, idx) => (
                <div key={doc} className="docItem">
                  <span className="idx">{idx + 1}</span>
                  <span className="text">{doc}</span>
                  <CheckCircle2 size={20} className="check" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}