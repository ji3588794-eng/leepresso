const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
//const PORT = process.env.PORT || 3001;

// 미들웨어
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: [
    'https://leepresso.com',
    'https://www.leepresso.com',
    'https://leepresso-project.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true,
  // 💡 여기에 'PATCH'를 추가했습니다.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 라우터 연결
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

app.listen(PORT, '0.0.0.0', () => {
  // 실서버에서는 localhost 주소가 의미 없으므로 포트 정보만 정확히 출력
  console.log(`🚀 Aurum Backend is running on port: ${PORT}`);
  console.log(`🌐 Server Mode: ${process.env.NODE_ENV || 'production'}`);
});