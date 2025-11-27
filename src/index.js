// src/utils/index.js
// 이 함수는 NavLink URL을 생성하는 역할을 합니다.
export const createPageUrl = (pageName) => `/${pageName.toLowerCase().replace('tools', 'tools')}`;