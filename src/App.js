// src/index.js 파일 내부

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 새로 만든 App.js를 불러옴
// [중요] 여기에 index.css, tailwind.css 등 스타일시트 import 필요

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);