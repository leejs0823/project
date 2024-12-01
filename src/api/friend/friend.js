import { sendRequest } from '../request';
import { defaultInstance } from '../instance';

export const useItemHook = () => {
  const setItemList = useSetRecoilState(itemListState);
  const setMyItemList = useSetRecoilState(myItemListState);

  const fetchItemsAPI = async () => {
    try {
      const response = await sendRequest(itemInstance, 'get', ``);
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
    fetchItemsAPI,
    fetchMyItemsAPI,
    purchaseItemAPI,
    applyItemAPI,
  };
};
