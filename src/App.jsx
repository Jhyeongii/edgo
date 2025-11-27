// src/App.jsx

import React from 'react';
import Sidebar from './components/layout/Sidebar';
import PDFTools from './page/PDFTools';

export default function App() {
    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            {/* 왼쪽 사이드바 */}
            <Sidebar />

            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 flex flex-col">
                {/* 메인 컨텐츠 헤더 (선택 사항, 필요 시 추가) */}
                {/* <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">PDF 도구</h1>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-gray-900"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg></button>
                        <button className="text-gray-600 hover:text-gray-900"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a6 6 0 00-6 0m6 0h-6"></path></svg></button>
                    </div>
                </header> */}

                {/* 메인 컨텐츠 영역에 PDFTools 컴포넌트 배치 */}
                <main className="flex-1 p-6 md:p-8 overflow-auto">
                    {/* 이미지 디자인과 맞추기 위해 PDFTools 내부에 있던 상단 섹션은 제거됨 */}
                    <PDFTools />
                </main>
            </div>
        </div>
    );
}