// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // 🚨 App 컴포넌트가 올바르게 import 되었는지 확인

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* 🚨 App 컴포넌트가 올바르게 사용되었는지 확인 */}
  </React.StrictMode>,
);