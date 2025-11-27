// src/components/ui/Button.jsx

import React from 'react';
import { cn } from '../../lib/utils';

const Button = ({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      // cn 함수를 사용하여 외부 클래스와 기본 스타일을 병합합니다.
      className={cn(
        "flex items-center justify-center font-medium text-white transition-all duration-200",
        "px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; // 기본 Export (Default Export)