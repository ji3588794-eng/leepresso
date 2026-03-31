"use client";
import "./Process.scss";
import { 
  Search, 
  Users, 
  FileText, 
  PenTool, 
  Settings, 
  Store, 
  ArrowRight, 
  ClipboardCheck 
} from "lucide-react";

const processItems = [
  { 
    step: "01", 
    title: "가맹후보점 상권분석", 
    desc: "데이터 기반 입지 분석 및 유동 인구 조사",
    icon: <Search size={22} />
  },
  { 
    step: "02", 
    title: "점주 사업설명회", 
    desc: "1:1 수익 시뮬레이션과 모델 상담 진행",
    icon: <Users size={22} />
  },
  { 
    step: "03", 
    title: "정보공개서 열람", 
    desc: "투명한 가맹 진행을 위한 법적 절차 이행",
    icon: <FileText size={22} />
  },
  { 
    step: "04", 
    title: "프랜차이즈 가맹계약", 
    desc: "출점 전략과 운영 기준 확정",
    icon: <PenTool size={22} />
  },
  { 
    step: "05", 
    title: "인테리어/장비입고", 
    desc: "공간 설계와 무인 시스템 세팅",
    icon: <Settings size={22} />
  },
  { 
    step: "06", 
    title: "가맹점 OPEN", 
    desc: "현장 교육 및 운영 지원과 함께 오픈",
    icon: <Store size={22} />
  },
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
        <div className="header">
          <div className="titleWrapper">
            <span className="sub">Franchise Process</span>
            <h2>창업 절차</h2>
          </div>
          <div className="infoRow">
            <p>
              리프레소와 함께라면 카페 창업이 쉬워집니다. <br />
              <strong>6단계의 전문적인 컨설팅</strong>을 통해 안정적인 오픈을 지원합니다.
            </p>
          </div>
        </div>

        {/* 높이가 일정한 직사각형 그리드 */}
        <div className="stepGrid">
          {processItems.map((item) => (
            <div key={item.step} className="stepCard">
              <div className="cardInner">
                <div className="leftSide">
                  <div className="iconBox">{item.icon}</div>
                  <div className="stepInfo">
                    <span className="num">STEP {item.step}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
                <div className="rightSide">
                  <p>{item.desc}</p>
                  <ArrowRight size={20} className="arrowIcon" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="docSection">
          <div className="docCard">
            <div className="docInfo">
              <div className="iconTag">
                <ClipboardCheck size={18} />
                <span>Documents</span>
              </div>
              <h3>필수 구비 서류</h3>
              <p className="desc">
                계약 및 영업 신고를 위해 <br />
                사전에 반드시 준비해주셔야 할 서류입니다.
              </p>
            </div>
            
            <div className="docList">
              {documents.map((doc, idx) => (
                <div key={doc} className="docItem">
                  <div className="docName">
                    <span className="idx">{idx + 1}</span>
                    <span className="text">{doc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}