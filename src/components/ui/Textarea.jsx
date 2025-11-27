// src/components/ui/Textarea.jsx

import React from 'react';
import { cn } from '../../lib/utils';

const Textarea = ({
  id,
  name,
  value,
  onChange,
  placeholder = "여기에 내용을 입력하세요...",
  rows = 4,
  className = '',
  disabled = false,
  required = false,
  ...props
}) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      required={required}
      // cn 함수를 사용하여 스타일을 적용합니다.
      className={cn(
        "w-full p-3 border border-slate-300 rounded-lg text-slate-700",
        "focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500",
        "resize-none transition-colors duration-200",
        className
      )}
      {...props}
    />
  );
};

export default Textarea; // 기본 Export (Default Export)