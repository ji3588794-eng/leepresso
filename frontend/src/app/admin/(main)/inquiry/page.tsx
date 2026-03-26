'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import styles from './inquiry.module.scss';
import { Trash2, X, User, Phone, MapPin, Store, Mail, Monitor, HelpCircle, Calendar } from 'lucide-react';

// 날짜 포맷 변환 함수 (YYYY-MM-DD HH:mm)
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; 

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
};

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
      <div className={styles.header}>
        <h2>창업 상담 관리</h2>
        <p className={styles.subtitle}>접수된 가맹점 창업 문의 내역을 확인하고 상태를 관리합니다.</p>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>No.</th>
              <th>신청자</th>
              <th>연락처</th>
              <th>희망지역</th>
              <th>점포여부</th>
              <th>진행상태</th>
              <th>신청일시</th>
              <th className={styles.centerAlign}>관리</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((item: any) => (
                <tr key={item.id}>
                  <td className={styles.idCol}>{item.id}</td>
                  <td>
                    <button 
                      className={styles.nameLink} 
                      onClick={() => setSelected(item)}
                    >
                      {item.customer_name}
                    </button>
                  </td>
                  <td>{item.phone_number}</td>
                  <td>{item.hope_region}</td>
                  <td>
                    <span className={`${styles.storeBadge} ${item.has_store === 'Y' || item.has_store === '있음' ? styles.hasStore : styles.noStore}`}>
                      {item.has_store}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={item.status} 
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className={styles.statusSelect}
                      data-status={item.status}
                    >
                      <option value="RECEIVED">접수완료</option>
                      <option value="CONSULTING">상담진행중</option>
                      <option value="COMPLETED">상담완료</option>
                      <option value="REJECTED">거절/보류</option>
                    </select>
                  </td>
                  <td className={styles.dateCol}>{formatDate(item.created_at)}</td>
                  <td className={styles.centerAlign}>
                    <button onClick={() => handleDelete(item.id)} className={styles.delBtn} title="삭제">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className={styles.emptyRow}>
                  접수된 창업 문의 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 상세 모달 */}
      {selected && (
        <div className={styles.modalOverlay} onClick={() => setSelected(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>상담 상세 정보</h3>
              <button onClick={() => setSelected(null)} className={styles.iconCloseBtn}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <User size={16} className={styles.infoIcon} />
                <div className={styles.infoText}>
                  <span>신청자</span>
                  <strong>{selected.customer_name}</strong>
                </div>
              </div>
              <div className={styles.infoItem}>
                <Phone size={16} className={styles.infoIcon} />
                <div className={styles.infoText}>
                  <span>연락처</span>
                  <strong>{selected.phone_number}</strong>
                </div>
              </div>
              <div className={styles.infoItem}>
                <MapPin size={16} className={styles.infoIcon} />
                <div className={styles.infoText}>
                  <span>희망지역</span>
                  <strong>{selected.hope_region}</strong>
                </div>
              </div>
              <div className={styles.infoItem}>
                <Store size={16} className={styles.infoIcon} />
                <div className={styles.infoText}>
                  <span>점포유무</span>
                  <strong>{selected.has_store}</strong>
                </div>
              </div>
            </div>

            <div className={styles.subInfoArea}>
              <div className={styles.subItem}>
                <Mail size={14} /> <span>{selected.email || '이메일 없음'}</span>
              </div>
              <div className={styles.subItem}>
                <HelpCircle size={14} /> <span>유입: {selected.inquiry_channel || '알수없음'}</span>
              </div>
              <div className={styles.subItem}>
                <Monitor size={14} /> <span>IP: {selected.ip_address || '기록없음'}</span>
              </div>
              <div className={styles.subItem}>
                <Calendar size={14} /> <span>{formatDate(selected.created_at)}</span>
              </div>
            </div>

            <div className={styles.contentBox}>
              <div className={styles.contentLabel}>상세 문의 내용</div>
              <div className={styles.textContent}>
                {selected.inquiry_content || '작성된 문의 내용이 없습니다.'}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button onClick={() => setSelected(null)} className={styles.closeBtn}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}