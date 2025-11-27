// src/lib/utils.js
// 이 함수는 Tailwind CSS 클래스를 조건부로 병합하는 역할을 합니다.
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}