import { sendRequest } from '../request';
import { userInstance } from '../instance';
import axios from 'axios';

export const loginAPI = async (loginId, password) => {
  try {
    const response = await sendRequest(
      userInstance,
      'post',
      '/login',
      {
        loginId,
        password,
      },
      {
        withCredentials: true,
      }
    );

    const accessToken = response.headers?.access;

    if (!accessToken) {
      console.warn('Access Token이 반환되지 않아 재발급 요청을 시도합니다.');

      return;
    }

    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    console.log('✅ 로그인 성공');
    return response.data;
  } catch (error) {
    console.error('❌ 로그인 에러:', error.response || error.message);
    throw new Error(
      error.response?.data?.message || error.message || '로그인 중 문제가 발생했습니다.'
    );
  }
};

// 회원가입 API
export const signUpAPI = async ({ loginId, password, nickname }) => {
  try {
    const requestBody = {
      loginId: loginId,
      password: password,
      nickname: nickname,
    };
    console.log('회원가입 요청 데이터:', requestBody);
    const response = await sendRequest(userInstance, 'post', '/register', requestBody);
    // 디버깅 로그
    if (response.status === 401) {
      console.log('401');
    } else if (response.status === 200) {
      console.log('200');
    }
    console.log('Response:', response);
    console.log('Response Data:', response.data);
    return response;
  } catch (error) {
    console.error('❌ 회원가입 실패:', error.response || error.message);
    // 네트워크 에러인 경우 처리
    if (!error.response) {
      throw new Error('네트워크 에러: 서버에 연결할 수 없습니다.');
    }
  }
};

// 토큰 재발급 API
// export const reissueToken = async () => {
//   try {
//     const response = await sendRequest(defaultInstance, 'post', API_ENDPOINTS.REISSUE, {});

//     const newAccessToken = response.headers?.access;
//     if (!newAccessToken) {
//       throw new Error('토큰 재발급 실패: 서버에서 반환된 Access Token이 없습니다.');
//     }

//     // Local Storage 및 Axios 헤더 업데이트
//     localStorage.setItem('accessToken', newAccessToken);
//     axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

//     console.log('✅ 토큰 재발급 성공');
//     return response.data;
//   } catch (error) {
//     console.error('❌ 토큰 재발급 실패:', error.response || error.message);
//     throw new Error(
//       error.response?.data?.message || error.message || '토큰 재발급 중 문제가 발생했습니다.'
//     );
//   }
// };
