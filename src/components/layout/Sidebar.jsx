// src/components/layout/Sidebar.jsx

import React from 'react';
import { 
    FileText, MessageSquareText, Globe, 
    Settings, Users, Gem, 
    Sparkles // 🚨 이 부분이 추가되었는지 확인
} from 'lucide-react';
import { cn } from '../../lib/utils'; // Tailwind CSS 클래스 유틸리티

export default function Sidebar() {
    const navItems = [
        { icon: FileText, label: 'PDF 도구', path: '/pdf-tools', active: true },
        { icon: MessageSquareText, label: '문서 번역', path: '/document-translate', active: false },
        // ... 더 많은 도구들을 추가할 수 있습니다.
    ];

    const modelItems = [
        { icon: Gem, label: 'GPT-4', active: true },
        { icon: Gem, label: 'Gemini', active: false },
        // ... 더 많은 모델들을 추가할 수 있습니다.
    ];

    return (
        <aside className="w-64 bg-gray-900 text-gray-50 flex flex-col p-4 shadow-lg sticky top-0 h-screen">
            {/* 로고 / 앱 이름 */}
            <div className="flex items-center mb-8 px-2">
                <div className="w-8 h-8 flex items-center justify-center bg-purple-600 rounded-lg mr-3">
                    <Sparkles className="w-5 h-5 text-white" /> {/* Sparkles 아이콘은 PDFTools에서 가져오거나 새로 import 해야함 */}
                </div>
                <h1 className="text-xl font-bold text-gray-50">AI Studio</h1>
            </div>

            {/* 도구 섹션 */}
            <nav className="mb-8">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">도구</h2>
                <ul>
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <li key={index} className="mb-1">
                                <a
                                    href={item.path} // 실제 라우팅에서는 Link 컴포넌트를 사용
                                    className={cn(
                                        "flex items-center p-2 rounded-lg transition-colors duration-200",
                                        item.active 
                                            ? "bg-purple-700 text-white" 
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    )}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    <span className="font-medium text-sm">{item.label}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* AI 모델 섹션 */}
            <div className="mt-auto mb-4">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">AI 모델</h2>
                <ul>
                    {modelItems.map((item, index) => {
                        const Icon = item.icon; // Gem 아이콘 사용
                        return (
                            <li key={index} className="mb-1">
                                <button
                                    className={cn(
                                        "w-full flex items-center p-2 rounded-lg transition-colors duration-200",
                                        item.active 
                                            ? "bg-gray-700 text-white" 
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    )}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    <span className="font-medium text-sm">{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* 사용자 및 설정 (선택 사항) */}
            <div className="border-t border-gray-700 pt-4 px-2">
                <button className="flex items-center w-full p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                    <Users className="w-5 h-5 mr-3" />
                    <span className="font-medium text-sm">사용자 이름</span>
                </button>
                <button className="flex items-center w-full p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 mt-1">
                    <Settings className="w-5 h-5 mr-3" />
                    <span className="font-medium text-sm">설정</span>
                </button>
            </div>
        </aside>
    );
}