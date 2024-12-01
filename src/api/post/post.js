import { sendRequest } from '../request';
import { postInstance } from '../instance';

export const usePostHook = () => {
  const fetchPostDetailAPI = async () => {
    try {
      const response = await sendRequest(postInstance, 'get', ``);
      setItemList(response.data);
      return response.data;
    } catch (error) {
      console.error('❌ 전체 아이템 조회 실패:', error.response || error.message);
      if (!error.response) {
        throw new Error('네트워크 에러: 서버에 연결할 수 없습니다.');
      }
    }
  };

  return {
    fetchPostDetailAPI,
  };
};
