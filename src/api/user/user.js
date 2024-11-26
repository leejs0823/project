import { sendRequest } from '../request';
import { defaultInstance, memberInstance } from '../instance';
import axios from 'axios';

const API_ENDPOINTS = {
  LOGIN: '/login',
  SIGN_UP: '/join',
};

export const login = async (username, password) => {
  try {
    const response = await sendRequest(
      defaultInstance,
      'post',
      API_ENDPOINTS.LOGIN,
      {
        username,
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
    localStorage.setItem('username', username);
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
export const signUp = async ({
  name,
  phoneNumber,
  email,
  username,
  password,
  nickname,
  province,
  city,
}) => {
  try {
    const requestBody = { name, phoneNumber, email, username, password, nickname, province, city };

    const response = await sendRequest(memberInstance, 'post', API_ENDPOINTS.SIGN_UP, requestBody);

    if (response.data.isSuccess) {
      console.log('✅ 회원가입 성공:', response.data);
      return response.data;
    }

    throw new Error(response.data.message || '회원가입에 실패했습니다.');
  } catch (error) {
    console.error('❌ 회원가입 실패:', error.response || error.message);
    throw new Error(
      error.response?.data?.message || error.message || '회원가입 중 문제가 발생했습니다.'
    );
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
