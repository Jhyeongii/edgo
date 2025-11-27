import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from "../lib/utils";

export default function ChatInput({ onSend, isLoading, placeholder }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder={placeholder || "메시지를 입력하세요..."}
          rows={1}
          className={cn(
            "w-full resize-none rounded-2xl border-2 border-slate-200",
            "bg-white px-5 py-4 pr-14 text-[15px]",
            "placeholder:text-slate-400 focus:outline-none focus:border-violet-400",
            "transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-md",
            "min-h-[56px] max-h-[200px]"
          )}
          style={{ height: 'auto' }}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={cn(
            "absolute right-3 w-10 h-10 rounded-xl flex items-center justify-center",
            "transition-all duration-200",
            input.trim() && !isLoading
              ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:scale-105"
              : "bg-slate-100 text-slate-400"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
}
