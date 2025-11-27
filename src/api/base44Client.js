// src/api/base44Client.js

// VITE 환경 변수를 불러옵니다.
const API_KEY = import.meta.env.VITE_BASE44_API_KEY;

// 실제 API 호출 로직이 구현되어 있지 않으므로 isRealApi가 true일 때 Error를 발생시킵니다.
const isRealApi = !!API_KEY && API_KEY !== "f300bae222634840a4c4619e6d442076";

const base44Client = {
    integrations: {
        Core: {
            UploadFile: async ({ file }) => {
                if (isRealApi) {
                    // 🚨 실제 base44 SDK의 UploadFile 호출 로직을 구현하세요.
                    throw new Error("실제 API 호출 함수 (UploadFile)를 구현해야 합니다.");
                } else {
                    console.warn("Mock API: 파일 업로드 (API 키 없음)");
                    // Mock URL 반환
                    return { file_url: `https://mock-url.com/${file.name}` };
                }
            },
            InvokeLLM: async ({ prompt, file_urls }) => {
                if (isRealApi) {
                    // 🚨 실제 base44 SDK의 InvokeLLM 호출 로직을 구현하세요.
                    throw new Error("실제 LLM 호출 함수 (InvokeLLM)를 구현해야 합니다.");
                } else {
                    console.warn("Mock API: LLM 호출 (API 키 없음)");
                    // Mock 응답 반환
                    return `## [Mock] AI 분석 결과 - ${new Date().toLocaleTimeString()}\n\n**요청된 프롬프트:** ${prompt.substring(0, 50)}...\n\n요청하신 PDF 분석이 Mock API를 통해 성공적으로 완료되었습니다. 실제 분석을 위해서는 **Netlify 환경 변수** 또는 **.env 파일**에 \`VITE_BASE44_API_KEY\`를 설정해주세요.`;
                }
            },
        },
    },
};

export const base44 = base44Client;