// src/page/PDFTools.jsx

import React, { useState, useMemo } from 'react';
import { base44 } from '../api/base44Client.js';

// 🚨 확장자가 .jsx로 변경되었을 것으로 가정합니다.
import Button from "../components/ui/Button.jsx"; 
import Textarea from "../components/ui/Textarea.jsx"; 

import { 
    FileText, Upload, Loader2, Sparkles, 
    FileSearch, BookOpen, ListChecks, MessageSquare,
    Copy, Check, XCircle
} from 'lucide-react';
import { cn } from "../lib/utils.js";
import ReactMarkdown from 'react-markdown';

// analysisTypes 배열 (예시)
const analysisTypes = [
    { id: 'summary', label: '요약 및 핵심 추출', prompt: '문서의 내용을 간결하게 요약하고 핵심 내용을 추출해 주세요.', icon: BookOpen },
    { id: 'qna', label: 'Q&A 생성', prompt: '문서의 내용에 기반한 질문과 답변을 5개 생성해 주세요.', icon: MessageSquare },
    { id: 'checklist', label: '실행 목록 생성', prompt: '문서에서 즉시 실행 가능한 행동 항목(Actionable Checklist)을 5가지 생성해 주세요.', icon: ListChecks },
];

export default function PDFTools() {
    // 🚨 ReferenceError를 해결하기 위해 누락된 상태들을 모두 정의합니다.
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    // 🚨 문제의 원인이었던 error 변수 상태
    const [error, setError] = useState(null); 
    const [selectedType, setSelectedType] = useState(analysisTypes[0].id);
    const [customPrompt, setCustomPrompt] = useState('');

    const currentTypePrompt = useMemo(() => {
        const type = analysisTypes.find(t => t.id === selectedType);
        return type ? type.prompt : analysisTypes[0].prompt;
    }, [selectedType]);
    
    // 임시 핸들러 (에러 방지용)
    const handleReset = () => {
        setFile(null);
        setFileUrl('');
        setResult('');
        setError(null);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileUrl('temp-url-for-analysis'); // 실제 업로드 로직 필요
        }
    };

    const handleAnalyze = async () => {
        if (!fileUrl) return setError("PDF 파일을 먼저 업로드해주세요.");
        if (isAnalyzing) return;

        setError(null);
        setIsAnalyzing(true);
        setResult('');

        // 여기에 실제 API 호출 로직을 구현해야 합니다.
        setTimeout(() => {
            const prompt = customPrompt || currentTypePrompt;
            setResult(`**[${prompt} 요청에 대한 가상 분석 결과입니다.]**\n\nTailwind CSS와 React 빌드 에러를 모두 해결하신 것을 축하드립니다! 이제는 실제 비즈니스 로직에 집중할 수 있습니다.`);
            setIsAnalyzing(false);
        }, 2000);
    };
    
    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="w-full h-full"> 
            {/* 💡 새로운 상단 헤더 (GPT-4에게 질문하세요) */}
            <div className="mb-8 text-center bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">GPT-4에게 질문하세요</h2>
                <p className="text-gray-500 mb-4">
                    과제, 논문 작성, 개념 설명 등 무엇이든 물어보세요
                </p>
                <div className="flex justify-center flex-wrap gap-2">
                    <button className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors">이 에세이 주제 추천해줘</button>
                    <button className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors">이 개념을 쉽게 설명해줘</button>
                    <button className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors">영어 문법 검토해줘</button>
                </div>
            </div>


            {error && (
                <div className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 flex items-center gap-3">
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{error}</span>
                </div>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Upload & Prompt Section */}
                <div className="space-y-6">
                    {/* File Upload */}
                    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm relative">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-slate-800">파일 업로드</h3>
                            {file && (
                                <Button onClick={handleReset} className="bg-transparent hover:bg-slate-50 text-slate-500 py-1 px-3 h-auto rounded-xl">
                                    <XCircle className="w-4 h-4 mr-1" /> 파일 지우기
                                </Button>
                            )}
                        </div>
                        
                        <label className={cn(
                            "flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300",
                            file 
                                ? "border-rose-300 bg-rose-50/50" 
                                : "border-slate-200 hover:border-rose-300 hover:bg-rose-50/30",
                            isUploading && "pointer-events-none opacity-70"
                        )}>
                            <input
                                id="pdf-upload-input"
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="hidden"
                                disabled={isUploading}
                            />
                            {isUploading ? (
                                <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
                            ) : file ? (
                                <div className="text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-rose-500/30">
                                        <FileText className="w-7 h-7 text-white" />
                                    </div>
                                    <p className="font-medium text-slate-800">{file.name}</p>
                                    <p className="text-sm text-slate-500 mt-1">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                                    <p className="text-slate-600 font-medium">PDF 파일을 드래그하거나 클릭하세요</p>
                                    <p className="text-sm text-slate-400 mt-1">최대 10MB</p>
                                </div>
                            )}
                        </label>
                    </div>

                    {/* Analysis Type */}
                    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
                        <h3 className="font-semibold text-slate-800 mb-4">분석 유형 선택</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {analysisTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => {
                                            setSelectedType(type.id);
                                            setCustomPrompt(''); 
                                        }}
                                        className={cn(
                                            "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200",
                                            selectedType === type.id && !customPrompt 
                                                ? "border-rose-400 bg-rose-50"
                                                : "border-slate-200 hover:border-slate-300"
                                        )}
                                    >
                                        <Icon className={cn(
                                            "w-5 h-5",
                                            selectedType === type.id && !customPrompt ? "text-rose-600" : "text-slate-500"
                                        )} />
                                        <span className={cn(
                                            "font-medium text-sm text-left",
                                            selectedType === type.id && !customPrompt ? "text-rose-700" : "text-slate-700"
                                        )}>
                                            {type.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 커스텀 프롬프트 입력 영역 */}
                    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
                        <h3 className="font-semibold text-slate-800 mb-4 flex justify-between items-center">
                            <span>나만의 분석 요청 (선택)</span>
                            {customPrompt && (
                                <button 
                                    onClick={() => setSelectedType(analysisTypes[0].id)}
                                    className="text-xs text-rose-500 hover:text-rose-600 font-medium"
                                >
                                    기본 유형으로 되돌리기
                                </button>
                            )}
                        </h3>
                        <Textarea
                            placeholder={customPrompt ? customPrompt : `기본 요청: ${currentTypePrompt}`}
                            value={customPrompt}
                            onChange={(e) => {
                                setCustomPrompt(e.target.value);
                                if (e.target.value.trim() !== '') {
                                    setSelectedType(''); 
                                } else {
                                    setSelectedType(analysisTypes[0].id); 
                                }
                            }}
                            rows={5}
                            className={cn(
                                customPrompt && "border-4 border-dashed border-rose-300 bg-rose-50/50"
                            )}
                        />
                        <p className="text-sm text-slate-500 mt-2">
                            {!customPrompt ? `현재 적용될 요청: ${currentTypePrompt}` : `사용자 정의 요청이 적용됩니다.`}
                        </p>
                    </div>
                    
                    <Button
                        onClick={handleAnalyze}
                        disabled={!fileUrl || isAnalyzing || isUploading}
                        className="w-full h-12 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/30"
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                AI가 문서를 분석 중입니다...
                            </>
                        ) : (
                            <>
                                <FileSearch className="w-5 h-5 mr-2" />
                                분석 시작
                            </>
                        )}
                    </Button>
                </div>

                {/* Result Section */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm h-fit">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-800">분석 결과</h3>
                        {result && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 text-green-500" />
                                        복사됨
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        복사
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    {result ? (
                        <div className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600">
                            <ReactMarkdown>{result}</ReactMarkdown>
                        </div>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mb-4">
                                <FileSearch className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-slate-500">
                                PDF를 업로드하고 분석을 시작하세요
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* 💡 새로운 하단 입력창 (디자인 이미지와 일치시키기 위해) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 lg:ml-64 shadow-lg z-10">
                <div className="max-w-4xl mx-auto flex items-center bg-gray-100 rounded-lg p-2">
                    <Textarea 
                        placeholder="GPT-4에게 메시지 보내기..."
                        rows={1}
                        className="flex-1 resize-none bg-transparent border-none focus:ring-0 px-2 py-1"
                    />
                    <Button className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </Button>
                </div>
            </div>
        </div>
    );
}