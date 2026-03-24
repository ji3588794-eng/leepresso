'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import styles from './inquiry.module.scss';

export default function FranchiseInquiryPage() {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState<any>(null);

  // 1. 목록 로드 (franchise_inquiries 테이블 데이터)
  const fetchList = async () => {
    try {
      // board랑 엮이지 않게 전용 API 호출
      const res = await api.get('/admin/franchise'); 
      if (res.data.success) setList(res.data.data);
    } catch (err) {
      console.error('창업문의 로딩 실패:', err);
    }
  };

  useEffect(() => { fetchList(); }, []);

  // 2. 상태 변경 (RECEIVED, CONSULTING, COMPLETED 등)
  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await api.put(`/admin/franchise/${id}`, { status: newStatus });
      alert('상태가 업데이트되었습니다.');
      fetchList();
    } catch (err) {
      alert('상태 변경 실패');
    }
  };

  // 3. 삭제
  const handleDelete = async (id: number) => {
    if (!confirm('내역을 삭제하시겠습니까?')) return;
    try {
      await api.delete(`/admin/franchise/${id}`);
      fetchList();
    } catch (err) {
      alert('삭제 실패');
    }
  };

  return (
    <div className={styles.container}>
      <h2>창업 상담 관리</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>신청자</th>
            <th>연락처</th>
            <th>희망지역</th>
            <th>점포여부</th>
            <th>진행상태</th>
            <th>신청일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item: any) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td className={styles.link} onClick={() => setSelected(item)}>
                {item.customer_name}
              </td>
              <td>{item.phone_number}</td>
              <td>{item.hope_region}</td>
              <td>{item.has_store}</td>
              <td>
                <select 
                  value={item.status} 
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  className={styles.statusSelect}
                >
                  <option value="RECEIVED">접수</option>
                  <option value="CONSULTING">상담중</option>
                  <option value="COMPLETED">완료</option>
                  <option value="REJECTED">거절</option>
                </select>
              </td>
              <td>{new Date(item.created_at).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(item.id)} className={styles.delBtn}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 상세 모달 (inquiry_content 확인용) */}
      {selected && (
        <div className={styles.modalOverlay} onClick={() => setSelected(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>상담 상세 정보</h3>
            <div className={styles.infoGrid}>
              <p><strong>이메일:</strong> {selected.email}</p>
              <p><strong>유입경로:</strong> {selected.inquiry_channel}</p>
              <p><strong>IP:</strong> {selected.ip_address}</p>
            </div>
            <div className={styles.contentBox}>
              <strong>상세 문의 내용:</strong>
              <div className={styles.textContent}>{selected.inquiry_content}</div>
            </div>
            <button onClick={() => setSelected(null)} className={styles.closeBtn}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}