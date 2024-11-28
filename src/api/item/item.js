import { sendRequest } from '../request';
import { itemInstance } from '../instance';

export const fetchItemsAPI = async () => {
  try {
    const response = await sendRequest(itemInstance, 'get', ``);
    console.log('@', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ 전체 아이템 조회 실패:', error.response || error.message);
    if (!error.response) {
      throw new Error('네트워크 에러: 서버에 연결할 수 없습니다.');
    }
  }
};
