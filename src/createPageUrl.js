// src/index.js (앱 시작 파일, 새로 생성/덮어쓰기)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 페이지 및 레이아웃 컴포넌트들을 불러옵니다.
// 경로 수정: src/layout/layout.js ➡️ src/layout.js (업로드된 파일 이름 기준)
import Layout from './layout'; 
import Home from './page/Home'; 
import PDFtools from './page/PDFtools'; 
import Translate from './page/translate'; 

// [중요] 필요한 스타일시트가 있다면 여기에 추가하세요 (예: import './index.css';)

// 앱의 전체 라우팅 구조를 정의하는 컴포넌트
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* URL 경로와 페이지 컴포넌트를 연결합니다. */}
          <Route path="/" element={<Home />} />
          <Route path="/pdftools" element={<PDFtools />} />
          <Route path="/translate" element={<Translate />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

// React 앱을 HTML의 'root' 엘리먼트에 마운트합니다.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);