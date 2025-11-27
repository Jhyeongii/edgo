// src/lib/utils.js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  // clsx로 조건부 클래스를 처리하고, twMerge로 Tailwind 클래스를 병합/최적화합니다.
  return twMerge(clsx(inputs));
}