// src/App.jsx

import React from 'react';
import Sidebar from './components/layout/Sidebar';
import PDFTools from './page/PDFTools';

export default function App() {
    return (
        // 🚨 이 min-h-screen이 반드시 있어야 합니다.
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