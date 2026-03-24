import './Equipment.scss';

const categories = [
  { num: "01", title: "업계최고 A/S서비스", desc: "가맹본사가 직접 관리 체계를 운영하여 신속하고 정확한 현장 대응이 가능합니다." },
  { num: "02", title: "탄산음료 메뉴개발", desc: "커피 외 수익 다변화를 위한 신규 메뉴 확장으로 객단가와 재방문율을 높입니다." },
  { num: "03", title: "최고사양 커피머신", desc: "무인카페의 핵심인 추출 품질을 위해 안정성과 일관성이 높은 고사양 장비를 적용합니다." },
  { num: "04", title: "스마트 원격 제어", desc: "스마트폰 기반 점포 상태 확인과 원격 제어로 운영 효율과 관리 편의성을 동시에 확보합니다." },
];

export default function Equipment() {
  return (
    <section className="equipment">
      <div className="container">
        <div className="header">
          <div>
            <p className="sub">Essential Category</p>
            <h3>리프레소를 완성하는 <span className="point">4가지 핵심 시스템</span></h3>
          </div>
          <div className="deco">
            {[...Array(6)].map((_, i) => <span key={i} />)}
          </div>
        </div>

        <div className="grid">
          {categories.map((item) => (
            <div key={item.num} className="card">
              <div className="shape" />
              <p className="num">Category {item.num}</p>
              <h4>{item.title}</h4>
              <p className="desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}