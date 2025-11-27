// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // 모든 .html 파일과 src 폴더 내의 모든 .js, .jsx 파일 스캔
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // ReactMarkdown에서 생성된 HTML에 스타일을 적용하기 위해 @tailwindcss/typography 플러그인 추가
    require('@tailwindcss/typography'),
  ],
}