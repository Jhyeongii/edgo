import React from 'react';
import { cn } from "../lib/utils";
import { Sparkles, Zap } from 'lucide-react';

const models = [
  {
    id: 'gpt',
    name: 'GPT-4',
    description: 'OpenAI의 최신 모델',
    icon: Sparkles,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google의 AI 모델',
    icon: Zap,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700'
  }
];

export default function ModelSelector({ selectedModel, onSelect }) {
  return (
    <div className="flex gap-3">
      {models.map((model) => {
        const Icon = model.icon;
        const isSelected = selectedModel === model.id;
        
        return (
          <button
            key={model.id}
            onClick={() => onSelect(model.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all duration-300",
              "hover:scale-[1.02] active:scale-[0.98]",
              isSelected 
                ? `${model.bgColor} ${model.borderColor} shadow-lg` 
                : "bg-white border-slate-200 hover:border-slate-300"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              isSelected ? `bg-gradient-to-br ${model.color}` : "bg-slate-100"
            )}>
              <Icon className={cn("w-5 h-5", isSelected ? "text-white" : "text-slate-500")} />
            </div>
            <div className="text-left">
              <p className={cn(
                "font-semibold text-sm",
                isSelected ? model.textColor : "text-slate-700"
              )}>
                {model.name}
              </p>
              <p className="text-xs text-slate-500">{model.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}