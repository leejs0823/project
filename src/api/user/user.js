import { sendRequest } from '../request';
import axios from 'axios';
import { userInstance } from '../instance';
import { applyInterceptors } from '../interceptor';
import {
  myCurrentPointState,
  myTotalPointState,
  myNicknameState,
  allUserListState,
  nicknameColorState,
} from '../../recoil/user';
import { useSetRecoilState } from 'recoil';

export const useUserHook = () => {
  const setMyCurrentPoint = useSetRecoilState(myCurrentPointState);
  const setMyTotalPoint = useSetRecoilState(myTotalPointState);
  const setNyNickname = useSetRecoilState(myNicknameState);
  const setAllUserList = useSetRecoilState(allUserListState);
  const setNicknameColor = useSetRecoilState(nicknameColorState);

  const loginAPI = async ({ loginId, password }) => {
    try {
      const response = await sendRequest(userInstance, 'post', '/login', {
        loginId,
        password,
      });

      const accessToken = response.data?.accessToken;
      if (!accessToken) {
        console.warn('Access Token이 반환되지 않아 재발급 요청을 시도합니다.');
        return;
      }
      const nickname = response.data?.nickname;
      localStorage.setItem('nickname', nickname);
      setNyNickname(nickname);
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
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
  const signUpAPI = async ({ loginId, password, nickname }) => {
    try {
      const response = await sendRequest(userInstance, 'post', '/register', {
        loginId,
        password,
        nickname,
      });
      return response.status;
    } catch (error) {
      console.error('❌ 회원가입 실패:', error.response || error.message);
      // 네트워크 에러인 경우 처리
      if (!error.response) {
        throw new Error('네트워크 에러: 서버에 연결할 수 없습니다.');
      }
    }
  };

  const fetchUsersAPI = async () => {
    try {
      applyInterceptors(userInstance);
      const response = await sendRequest(userInstance, 'get', ``);
      setAllUserList(response.data);
      return response.data;
    } catch (error) {
      console.error('❌ 전체 유저 조회 실패:', error.response || error.message);
      if (!error.response) {
        throw new Error('네트워크 에러: 서버에 연결할 수 없습니다.');
      }
    }
  };

  const fetchUserDetailAPI = async nickname => {
    try {
      const myNickname = localStorage.getItem('nickname');
      applyInterceptors(userInstance);
      const response = await sendRequest(userInstance, 'get', `/${nickname}`);
      if (myNickname === nickname) {
        setNyNickname(response.data.nickname);
        setMyCurrentPoint(response.data.currentPoint);
        setMyTotalPoint(response.data.totalPoint);
        setNicknameColor(response.data.nicknameColor);
      }
      return response.data;
    } catch (error) {
      console.error('❌ 유저 조회 실패:', error.response || error.message);
      if (!error.response) {
        throw new Error('네트워크 에러: 서버에 연결할 수 없습니다.');
      }
    }
  };

  const updateNicknameAPI = async nickname => {
    try {
      applyInterceptors(userInstance);
      const response = await sendRequest(userInstance, 'post', `/update/${nickname}`);
      setNyNickname(nickname);
      localStorage.setItem('nickname', nickname);
      return response.data;
    } catch (error) {
      console.error('❌ 요청 실패:', error.response || error.message);
      if (!error.response) {
        throw new Error('네트워크 에러: 서버에 연결할 수 없습니다.');
      }
    }
  };

  const test = async () => {
    applyInterceptors(userInstance);
    const response = await sendRequest(userInstance, 'get', '/test');
    return response.data;
  };

  // const sendImageAPI = async ({ gameRoomId, gameRoundId, multipartFile }) => {
  //   applyInterceptors(defaultInstance);
  //   console.log(gameRoomId);
  //   console.log(gameRoundId);
  //   console.log(multipartFile);
  //   const response = await sendRequest(defaultInstance, 'post', '/sendImage', {
  //     gameRoomId,
  //     gameRoundId,
  //     multipartFile,
  //   });
  //   return response.data;
  // };

  const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

  const sendImageAPI = async ({ gameRoomId, gameRoundId, multipartFile, drawerNickname }) => {
    const response = await axios.post(
      `${BASE_URL}/sendImage`,
      { gameRoomId, gameRoundId, multipartFile, drawerNickname }, // FormData 객체
      {
        headers: {
          'Content-Type': 'multipart/form-data', // 헤더 자동 설정
        },
      }
    );
    return response.data;
  };

  const downloadImageAPI = async fileName => {
    const response = await axios.get(`${BASE_URL}/downloadImage/${fileName}`, {
      headers: {
        responseType: 'blob',
      },
    });
    return response.data;
  };

  const endRoundAPI = async ({ gameRoomId, gameRoundId, multipartFile, drawerNickname }) => {
    const response = await axios.post(
      `${BASE_URL}/endRound`,
      { gameRoomId, gameRoundId, multipartFile, drawerNickname }, // FormData 객체
      {
        headers: {
          'Content-Type': 'multipart/form-data', // 헤더 자동 설정
        },
      }
    );
    return response.data;
  };

  return {
    loginAPI,
    signUpAPI,
    fetchUsersAPI,
    fetchUserDetailAPI,
    updateNicknameAPI,
    test,
    sendImageAPI,
    downloadImageAPI,
    endRoundAPI,
  };
};
