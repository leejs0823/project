//import { reissueToken } from './user/user';

export const applyInterceptors = instance => {
  // 요청 인터셉터
  instance.interceptors.request.use(
    config => {
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken);
      // Access Token이 존재하고 유효할 경우 헤더에 추가
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return config;
    },
    error => {
      console.error('❌ 요청 인터셉터 에러:', error.message || error);
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    response => {
      return response; // 성공적인 응답은 그대로 반환
    },
    async error => {
      const originalRequest = error.config;

      // Access Token 만료 처리 (401 Unauthorized)
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Refresh Token을 사용해 토큰 재발급 요청
          //await reissueToken();

          // 재발급 후 원래 요청 다시 시도
          const accessToken = localStorage.getItem('accessToken');
          if (accessToken) {
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          }

          return instance(originalRequest);
        } catch (refreshError) {
          console.error('❌ 토큰 재발급 실패:', refreshError.message || refreshError);
          // Refresh Token 실패 시 로그아웃 처리
          localStorage.removeItem('accessToken');
          //document.cookie = 'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          window.location.href = '/login';

          return Promise.reject(refreshError);
        }
      }

      // 다른 에러 처리
      console.error('❌ 응답 인터셉터 에러:', error.response || error.message);
      return Promise.reject(error);
    }
  );
};
