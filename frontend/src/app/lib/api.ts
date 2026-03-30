import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API 호출 에러:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message,
    });

    return Promise.reject(error);
  }
);

export default api;

export const getImageUrl = (url: string | null | undefined) => {
  if (!url) return '/images/no-image.png'; // 이미지 없을 때 기본값
  // 이미 http로 시작하면 Cloudinary 주소이므로 그대로 반환
  if (url.startsWith('http')) return url;
  // 아니면 기존 방식대로 백엔드 uploads 폴더 참조 (하이브리드 대응)
  return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${url}`;
};