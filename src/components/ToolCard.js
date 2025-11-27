import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../createPageUrl';
import { ChevronRight } from 'lucide-react';
import { cn } from "../lib/utils";

export default function ToolCard({ icon: Icon, title, description, page, color, gradient }) {
  return (
    <Link
      to={createPageUrl(page)}
      className={cn(
        "group relative overflow-hidden rounded-3xl p-6",
        "bg-white border border-slate-200/80",
        "hover:shadow-xl hover:shadow-slate-200/50 hover:border-transparent",
        "transition-all duration-500 hover:-translate-y-1"
      )}
    >
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500",
        gradient
      )} />
      
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center mb-4",
        "transition-transform duration-300 group-hover:scale-110",
        `bg-gradient-to-br ${gradient}`
      )}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      
      <h3 className="font-semibold text-lg text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">{description}</p>
      
      <div className="flex items-center text-sm font-medium text-violet-600 group-hover:text-violet-700">
        <span>사용하기</span>
        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}