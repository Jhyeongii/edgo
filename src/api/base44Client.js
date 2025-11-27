// src/api/base44Client.js
// API 클라이언트 모킹 (실제 API 로직은 서버에 있음)

export const base44 = {
  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        console.log(`[MOCK API] Uploading file: ${file.name}`);
        return { file_url: `http://mock-file-url.com/${file.name}` };
      },
      AnalyzeFile: async ({ file_url, analysis_type, model }) => {
        console.log(`[MOCK API] Analyzing file: ${file_url} with ${model}`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기 모킹
        return {
          result: `[${analysis_type.toUpperCase()} 결과] Mock 응답입니다. 실제 API를 연결하면 여기에 분석 내용이 표시됩니다.`,
        };
      },
    },
    AI: {
      Chat: async ({ model, messages, system_prompt }) => {
        console.log(`[MOCK API] Chat with ${model}`);
        await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5초 대기 모킹
        return {
          response: `${model}의 Mock 응답입니다. 질문에 대한 답변이 여기에 표시됩니다.`,
        };
      },
      Translate: async ({ source_lang, target_lang, text }) => {
        console.log(`[MOCK API] Translating from ${source_lang} to ${target_lang}`);
        await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5초 대기 모킹
        return {
          translated_text: `[${source_lang.toUpperCase()} -> ${target_lang.toUpperCase()} 번역 결과] ${text} (Mock)`,
        };
      }
    }
  }
};