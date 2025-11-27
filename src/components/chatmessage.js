import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";
import { User, Bot, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ChatMessage({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(
      "flex gap-4 group",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/20">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[75%] relative",
        isUser && "flex flex-col items-end"
      )}>
        <div className={cn(
          "rounded-3xl px-5 py-3.5",
          isUser 
            ? "bg-gradient-to-br from-slate-800 to-slate-900 text-white" 
            : "bg-white border border-slate-200/80 shadow-sm"
        )}>
          {isUser ? (
            <p className="text-[15px] leading-relaxed">{message.content}</p>
          ) : (
            <ReactMarkdown 
              className="text-[15px] prose prose-slate max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-pre:bg-slate-900 prose-pre:text-slate-100"
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        
        {!isUser && (
          <button
            onClick={handleCopy}
            className="absolute -bottom-6 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-slate-100"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
          </button>
        )}
      </div>
      
      {isUser && (
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
}