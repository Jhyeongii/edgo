import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Languages, ArrowRightLeft, Loader2, Copy, Check, 
  Volume2, FileUp, Sparkles
} from 'lucide-react';
import { cn } from "@/lib/utils";

const languages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: '영어', flag: '🇺🇸' },
  { code: 'ja', name: '일본어', flag: '🇯🇵' },
  { code: 'zh', name: '중국어', flag: '🇨🇳' },
  { code: 'es', name: '스페인어', flag: '🇪🇸' },
  { code: 'fr', name: '프랑스어', flag: '🇫🇷' },
  { code: 'de', name: '독일어', flag: '🇩🇪' },
  { code: 'vi', name: '베트남어', flag: '🇻🇳' }
];

export default function Translate() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ko');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsTranslating(true);
    const sourceName = languages.find(l => l.code === sourceLang)?.name;
    const targetName = languages.find(l => l.code === targetLang)?.name;

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `다음 텍스트를 ${sourceName}에서 ${targetName}로 번역해주세요. 번역만 출력하고 다른 설명은 하지 마세요.\n\n텍스트: ${sourceText}`,
    });

    setTranslatedText(response);
    setIsTranslating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const processFile = async (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsUploading(true);

    const { file_url } = await base44.integrations.Core.UploadFile({ file: selectedFile });
    
    const extractedData = await base44.integrations.Core.ExtractDataFromUploadedFile({
      file_url,
      json_schema: {
        type: "object",
        properties: {
          content: { type: "string", description: "The full text content of the document" }
        }
      }
    });

    if (extractedData.status === "success" && extractedData.output?.content) {
      setSourceText(extractedData.output.content);
    }
    
    setIsUploading(false);
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    await processFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    await processFile(droppedFile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <Languages className="w-4 h-4" />
            <span>번역</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">번역</span>
          </h1>
          <p className="text-slate-500 text-lg">
            문서나 텍스트를 다양한 언어로 번역하세요
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="px-5 py-3 rounded-2xl border-2 border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:border-blue-400 transition-colors"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSwapLanguages}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="px-5 py-3 rounded-2xl border-2 border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:border-blue-400 transition-colors"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Translation Boxes */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Source */}
          <div 
            className={cn(
              "bg-white rounded-3xl border-2 p-6 shadow-sm transition-all duration-300",
              isDragging 
                ? "border-blue-400 bg-blue-50/50 scale-[1.01]" 
                : "border-slate-200/80"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">원문</h3>
              <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
                <FileUp className="w-4 h-4" />
                {isUploading ? '업로드 중...' : '파일 업로드'}
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            {isDragging ? (
              <div className="min-h-[250px] flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-2xl bg-blue-50/50">
                <FileUp className="w-10 h-10 text-blue-500 mb-3" />
                <p className="text-blue-600 font-medium">파일을 여기에 놓으세요</p>
                <p className="text-sm text-blue-500 mt-1">PDF, Word, TXT 지원</p>
              </div>
            ) : (
              <Textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="번역할 텍스트를 입력하거나 파일을 드래그하세요..."
                className="min-h-[250px] border-0 resize-none focus-visible:ring-0 text-[15px] p-0"
              />
            )}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
              <span className="text-sm text-slate-400">{sourceText.length} 자</span>
              <Button
                onClick={handleTranslate}
                disabled={!sourceText.trim() || isTranslating}
                className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 shadow-lg shadow-blue-500/30"
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    번역 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    번역하기
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Target */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">번역</h3>
              {translatedText && (
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
            
            {translatedText ? (
              <div className="min-h-[250px] text-[15px] text-slate-700 leading-relaxed whitespace-pre-wrap">
                {translatedText}
              </div>
            ) : (
              <div className="min-h-[250px] flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                  <Languages className="w-7 h-7 text-slate-400" />
                </div>
                <p className="text-slate-400">번역 결과가 여기에 표시됩니다</p>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-3">💡 번역 팁</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• 긴 문서는 단락별로 나누어 번역하면 더 정확합니다</li>
            <li>• 전문 용어가 있으면 괄호 안에 원어를 함께 표기해두세요</li>
            <li>• PDF, Word 파일을 직접 업로드하여 번역할 수 있습니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}