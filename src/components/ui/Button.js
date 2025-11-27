// Button.js (또는 Button.jsx)
import React from 'react';

// 필요한 props를 구조 분해 할당으로 정의합니다.
const Button = ({ children, onClick, type = 'button', className = '', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`default-button-style ${className}`} // 기본 스타일과 외부 스타일 병합
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;