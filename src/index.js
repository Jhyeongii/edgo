// src/index.js (새로운 앱 시작 파일)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// *오류 해결: 경로를 './layout/Layout'으로 정확히 지정
import Layout from './layout/Layout'; 
import Home from './page/Home'; 
import PDFtools from './page/PDFtools'; 
import Translate from './page/translate'; 

// [중요] 필요한 스타일시트가 있다면 여기에 추가하세요 (예: import './index.css';)

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pdftools" element={<PDFtools />} />
          <Route path="/translate" element={<Translate />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);