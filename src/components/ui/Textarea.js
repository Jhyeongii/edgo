// src/components/ui/Textarea.js 또는 Textarea.jsx

import React from 'react';

// Textarea 컴포넌트 정의
const Textarea = ({
  id,
  name,
  value,
  onChange,
  placeholder = "여기에 내용을 입력하세요...",
  rows = 4, // 기본 높이 설정
  className = '', // 외부 스타일을 위한 클래스 이름
  disabled = false,
  required = false,
  ...props // 나머지 모든 HTML 속성 (onBlur 등)
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
      // 기본적인 스타일을 정의하거나 외부 className을 적용합니다.
      className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      {...props} // 나머지 HTML 속성 전달
    />
  );
};

export default Textarea;