import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/createPageUrl';
import { base44 } from '@/api/base44Client';
import ModelSelector from '@/components/ModelSelector';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { FileText, Languages, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function Home() {
  const [selectedModel, setSelectedModel] = useState('gpt');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content) => {
    const userMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const systemPrompt = selectedModel === 'gpt' 
      ? "당신은 GPT-4입니다. 대학생들의 학습과 연구를 돕는 친절하고 유능한 AI 어시스턴트입니다. 한국어로 답변해주세요."
      : "당신은 Google Gemini입니다. 대학생들의 학습과 연구를 돕는 친절하고 유능한 AI 어시스턴트입니다. 한국어로 답변해주세요.";

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `${systemPrompt}\n\n이전 대화:\n${messages.map(m => `${m.role}: ${m.content}`).join('\n')}\n\nuser: ${content}`,
    });

    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-white to-violet-50/30 flex">
      {/* Sidebar - Tools */}
      <div className="w-64 border-r border-slate-200/80 bg-white/50 backdrop-blur-sm p-4 flex flex-col">
        <div className="mb-4">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3 px-2">도구</p>
          <div className="space-y-2">
            <Link
              to={createPageUrl('PDFTools')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-rose-50 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-sm">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 group-hover:text-rose-700">PDF 분석</p>
                <p className="text-xs text-slate-400">요약, Q&A 생성</p>
              </div>
            </Link>
            <Link
              to={createPageUrl('Translate')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-sm">
                <Languages className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 group-hover:text-blue-700">문서 번역</p>
                <p className="text-xs text-slate-400">다국어 번역</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3 px-2">AI 모델</p>
          <div className="space-y-2">
            {['gpt', 'gemini'].map((model) => (
              <button
                key={model}
                onClick={() => setSelectedModel(model)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                  selectedModel === model 
                    ? "bg-violet-100 text-violet-700" 
                    : "hover:bg-slate-100 text-slate-600"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  selectedModel === model 
                    ? "bg-gradient-to-br from-violet-500 to-purple-600" 
                    : "bg-slate-200"
                )}>
                  {model === 'gpt' ? (
                    <Sparkles className={cn("w-4 h-4", selectedModel === model ? "text-white" : "text-slate-500")} />
                  ) : (
                    <span className={cn("text-xs font-bold", selectedModel === model ? "text-white" : "text-slate-500")}>G</span>
                  )}
                </div>
                <span className="text-sm font-medium">
                  {model === 'gpt' ? 'GPT-4' : 'Gemini'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-violet-500/30">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                {selectedModel === 'gpt' ? 'GPT-4' : 'Gemini'}에게 질문하세요
              </h3>
              <p className="text-slate-500 max-w-md mb-6">
                과제, 논문 작성, 개념 설명 등 무엇이든 물어보세요
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {['에세이 주제 추천해줘', '이 개념을 쉽게 설명해줘', '영어 문법 검토해줘'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-600 hover:border-violet-300 hover:text-violet-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))
          )}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center animate-pulse">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl px-5 py-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-slate-100">
          <div className="max-w-3xl mx-auto">
            <ChatInput 
              onSend={handleSend} 
              isLoading={isLoading}
              placeholder={`${selectedModel === 'gpt' ? 'GPT-4' : 'Gemini'}에게 메시지 보내기...`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}