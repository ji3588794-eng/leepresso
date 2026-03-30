'use client';

import { useState, useEffect, useRef } from 'react';
import api, { getImageUrl } from '@/app/lib/api';
import styles from './notice.module.scss';
import { NoticeData } from './page';
import { X, UploadCloud, FileText, Loader2, Bold, Italic, List as ListIcon, Heading2, Image as ImageIcon } from 'lucide-react';

export default function NoticeModal({ data, onClose, onSuccess }: { data: NoticeData | null, onClose: () => void, onSuccess: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorImageInputRef = useRef<HTMLInputElement>(null); // 본문 이미지 삽입용
  const editorRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 단일 첨부파일 관리를 위한 상태
  const [file, setFile] = useState<File | null>(null);
  const [existingFile, setExistingFile] = useState<{ name: string, url: string } | null>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const [formData, setFormData] = useState({
    category: 'community',
    type: 'notice',
    title: '',
    is_notice: 0,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        category: 'community',
        type: 'notice',
        title: data.title || '',
        is_notice: Number(data.is_notice) || 0,
      });
      if (editorRef.current) {
        editorRef.current.innerHTML = data.content || '';
      }
      
      const fileName = (data as any).file_name;
      const fileUrl = (data as any).file_url;
      if (fileName) {
        setExistingFile({ name: fileName, url: fileUrl });
      }
    }
  }, [data]);

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  // 에디터 본문에 이미지 삽입하는 함수
  const handleEditorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      alert('이미지는 최대 10MB까지만 업로드 가능합니다.');
      if (editorImageInputRef.current) editorImageInputRef.current.value = '';
      return;
    }

    const imgFormData = new FormData();
    imgFormData.append('image', selectedFile);

    try {
      // ✅ 서버 호출 (백엔드 adminRouter.post('/upload', ...))
      const res = await api.post('/admin/upload', imgFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (res.data.success) {
        // 🚨 수정: 수동으로 경로 결합하지 않고 Cloudinary 전체 경로(res.data.path)를 그대로 삽입
        const imageUrl = res.data.path;
        
        // 에디터 본문에 이미지 삽입
        execCommand('insertImage', imageUrl);
      }
    } catch (err) {
      console.error(err);
      alert('본문 이미지 업로드에 실패했습니다.');
    } finally {
      if (editorImageInputRef.current) editorImageInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const selectedFile = selectedFiles[0]; 
    
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert('첨부파일은 최대 10MB까지만 업로드 가능합니다.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setFile(selectedFile);
    setExistingFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = () => {
    setFile(null);
    setExistingFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const content = editorRef.current?.innerHTML || '';
    if (!formData.title.trim()) return alert('제목을 입력해주세요.');

    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      submitData.append('category', formData.category);
      submitData.append('type', formData.type);
      submitData.append('title', formData.title);
      submitData.append('content', content);
      submitData.append('is_notice', String(formData.is_notice));
      
      if (file) {
        submitData.append('file', file);
      }
      
      submitData.append('keep_existing_file', existingFile ? 'true' : 'false');

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      if (data) {
        await api.put(`/admin/board/${data.idx}`, submitData, config);
      } else {
        await api.post('/admin/board', submitData, config);
      }
      
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('전송 에러:', err.response?.data || err.message);
      alert('저장 중 오류 발생. 서버 로그를 확인하세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{data ? '공지사항 수정' : '새 공지사항 작성'}</h3>
          <button type="button" className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={formData.is_notice === 1} 
                onChange={(e) => setFormData({...formData, is_notice: e.target.checked ? 1 : 0})}
              />
              이 글을 상단에 고정합니다.
            </label>
          </div>

          <div className={styles.formRow}>
            <label>제목</label>
            <input 
              required type="text" value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              placeholder="제목을 입력하세요"
            />
          </div>

          <div className={styles.formRow}>
            <label>내용</label>
            <div className={styles.tiptapWrapper}>
              <div className={styles.toolbar}>
                <button type="button" onClick={() => execCommand('bold')}><Bold size={16}/></button>
                <button type="button" onClick={() => execCommand('italic')}><Italic size={16}/></button>
                <button type="button" onClick={() => execCommand('insertUnorderedList')}><ListIcon size={16}/></button>
                <button type="button" onClick={() => execCommand('formatBlock', 'h2')}><Heading2 size={16}/></button>
                
                <span className={styles.divider} style={{ width: '1px', height: '16px', background: '#ddd', margin: '0 8px' }} />
                <input type="file" accept="image/*" ref={editorImageInputRef} onChange={handleEditorImageUpload} style={{ display: 'none' }} />
                <button type="button" onClick={() => editorImageInputRef.current?.click()} title="사진 삽입">
                  <ImageIcon size={16}/>
                </button>
              </div>
              <div ref={editorRef} contentEditable className={styles.editorContent} spellCheck={false} />
            </div>
          </div>

          <div className={styles.formRow}>
            <label>첨부파일 (최대 1개)</label>
            <div className={styles.fileUploadArea}>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
              <button type="button" className={styles.uploadBtn} onClick={() => fileInputRef.current?.click()}>
                <UploadCloud size={16} /> 하단 첨부파일 선택
              </button>
              
              <div className={styles.fileList}>
                {existingFile && (
                  <div className={styles.fileItem}>
                    <FileText size={12} /> 
                    <span className={styles.fileName}>{existingFile.name}</span>
                    <X size={12} className={styles.fileRemove} onClick={removeFile} />
                  </div>
                )}
                {file && (
                  <div className={styles.fileItem}>
                    <FileText size={12} /> 
                    <span className={styles.fileName}>{file.name}</span>
                    <X size={12} className={styles.fileRemove} onClick={removeFile} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" onClick={onClose}>취소</button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className={styles.spin} size={16} /> : '저장하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}