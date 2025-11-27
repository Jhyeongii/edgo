// src/page/PDFTools.jsx

import React, { useState, useMemo } from 'react';
import { base44 } from '../api/base44Client';

import Button from "../components/ui/Button"; 
import Textarea from "../components/ui/Textarea"; 

import { 
    FileText, Upload, Loader2, Sparkles, 
    FileSearch, BookOpen, ListChecks, MessageSquare,
    Copy, Check, XCircle
} from 'lucide-react';
import { cn } from "../lib/utils";
import ReactMarkdown from 'react-markdown';

const analysisTypes = [
    { id: 'summary', icon: BookOpen, label: '요약', prompt: '이 문서의 핵심 내용을 3-5개의 주요 포인트로 요약해주세요.' },
    { id: 'keypoints', icon: ListChecks, label: '핵심 포인트', prompt: '이 문서에서 가장 중요한 키워드와 개념들을 추출해주세요.' },
    { id: 'qa', icon: MessageSquare, label: 'Q&A 생성', prompt: '이 문서 내용을 바탕으로 시험에 나올 수 있는 질문과 답변 5개를 만들어주세요.' },
    { id: 'explain', icon: Sparkles, label: '쉽게 설명', prompt: '이 문서의 내용을 고등학생도 이해할 수 있게 쉽게 설명해주세요.' }
];

export default function PDFTools() {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [selectedType, setSelectedType] = useState('summary');
    const [customPrompt, setCustomPrompt] = useState(''); // 💡 추가: 커스텀 프롬프트 상태
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState = useState(false);
    const [error, setError] = useState(null); // 💡 추가: 에러 상태

    // 💡 useMemo를 사용하여 현재 선택된 분석 유형의 프롬프트를 계산
    const currentTypePrompt = useMemo(() => {
        return analysisTypes.find(t => t.id === selectedType)?.prompt || '';
    }, [selectedType]);

    // 💡 새로운 핸들러: 파일 업로드 인풋을 초기화하는 함수
    const handleReset = () => {
        setFile(null);
        setFileUrl('');
        setResult('');
        setError(null);
        setCustomPrompt('');
        setSelectedType('summary');
        // 파일 인풋의 value를 초기화 (React에서 DOM 요소에 접근)
        const fileInput = document.getElementById('pdf-upload-input');
        if (fileInput) fileInput.value = '';
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        handleReset(); // 기존 상태 초기화
        setFile(selectedFile);
        setIsUploading(true);
        setError(null);

        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file: selectedFile });
            setFileUrl(file_url);
        } catch (err) {
            console.error("File upload failed:", err);
            setError("파일 업로드에 실패했습니다. (콘솔 확인)");
            setFile(null);
        } finally {
            setIsUploading(false);
        }
    };

    const handleAnalyze = async () => {
        if (!fileUrl) return;

        setIsAnalyzing(true);
        setResult('');
        setError(null);
        
        // 최종 프롬프트: 유형 프롬프트와 사용자 정의 프롬프트를 조합
        const finalPrompt = customPrompt 
            ? customPrompt 
            : currentTypePrompt;
        
        const fullPrompt = `다음은 PDF 문서의 내용입니다. ${finalPrompt}\n\n결과는 Markdown 형식으로 작성하고, 한국어로 답변해주세요.`;
        
        try {
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: fullPrompt,
                file_urls: [fileUrl]
            });

            setResult(response);
        } catch (err) {
            console.error("Analysis failed:", err);
            setError(`분석 중 오류가 발생했습니다: ${err.message || 'API 호출 실패'}`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-700 text-sm font-medium mb-4">
                        <FileText className="w-4 h-4" />
                        <span>PDF 도구</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                        PDF 문서 <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">분석</span>
                    </h1>
                    <p className="text-slate-500 text-lg">
                        PDF를 업로드하고 AI로 요약, 분석, Q&A를 생성하세요
                    </p>
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
                                {/* 💡 추가: 파일 초기화 버튼 */}
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
                                                setCustomPrompt(''); // 유형 선택 시 커스텀 프롬프트 초기화
                                            }}
                                            className={cn(
                                                "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200",
                                                selectedType === type.id && !customPrompt // 커스텀 프롬프트가 없을 때만 활성화
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

                        {/* 💡 추가: 커스텀 프롬프트 입력 영역 */}
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
                                        setSelectedType(''); // 커스텀 프롬프트 입력 시 유형 선택 해제
                                    } else {
                                        setSelectedType(analysisTypes[0].id); // 비어있으면 기본 유형으로
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
            </div>
        </div>
    );
}