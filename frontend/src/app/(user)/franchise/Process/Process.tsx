import './Process.scss';

const processItems = [
  { step: "01", title: "가맹후보점 상권분석", desc: "데이터 기반 입지 분석 및 유동 인구 조사" },
  { step: "02", title: "점주 사업설명회", desc: "1:1 수익 시뮬레이션과 모델 상담 진행" },
  { step: "03", title: "정보공개서 열람", desc: "투명한 가맹 진행을 위한 법적 절차 이행" },
  { step: "04", title: "프랜차이즈 가맹계약", desc: "출점 전략과 운영 기준 확정" },
  { step: "05", title: "인테리어/장비입고", desc: "공간 설계와 무인 시스템 세팅" },
  { step: "06", title: "가맹점 OPEN", desc: "현장 교육 및 운영 지원과 함께 오픈" },
];

const documents = [
  "가맹후보점포 임대차계약서", "자판기영업자 과정 수료증", "보건증 (건강진단결과서)", "영업신고증", "사업자등록증", "본인 명의 신분증"
];

export default function Process() {
  return (
    <section id="process-info" className="process">
      <div className="container">
        <div className="header">
          <div className="title">
            <p className="sub">Open Process</p>
            <h2>OPEN<br /><span>PROCESS</span></h2>
          </div>
          <p className="descText">복잡하고 막연한 창업이 아니라, 리프레소의 체계적인 출점 프로세스를 따라가며 명확하게 준비할 수 있습니다.</p>
        </div>

        <div className="stepGrid">
          {processItems.map((item) => (
            <div key={item.step} className="stepCard">
              <div className="top">
                <span className="num">{item.step}</span>
                <div className="line" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="docBox">
          <div className="docGrid">
            <div className="docInfo">
              <p className="sub">Required Documents</p>
              <h3>필수 구비 서류</h3>
              <p className="desc">계약 및 오픈 준비를 위해<br />기본적으로 필요한 서류입니다.</p>
            </div>
            <div className="docList">
              {documents.map((doc, idx) => (
                <div key={doc} className="docItem">
                  <span><span className="point">{idx + 1}</span>{doc}</span>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}