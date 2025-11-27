// src/App.jsx

import React from 'react';
import Sidebar from './components/layout/Sidebar';
import PDFTools from './page/PDFTools';

export default function App() { // 🚨 1. "export default function App()" 이 구문이 정확해야 합니다.
    return (
        // 🚨 2. 최상위 div와 클래스명이 정확해야 합니다.
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            {/* 왼쪽 사이드바 */}
            <Sidebar />

            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 flex flex-col">
                {/* 메인 컨텐츠 영역에 PDFTools 컴포넌트 배치 */}
                <main className="flex-1 p-6 md:p-8 overflow-auto">
                    <PDFTools />
                </main>
            </div>
        </div>
    );
}