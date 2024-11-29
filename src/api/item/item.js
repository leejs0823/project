import { sendRequest } from '../request';
import { itemInstance, purchaseInstance } from '../instance';
import { myItemListState, itemListState } from '../../recoil/item';
import { useSetRecoilState } from 'recoil';

export const useItemHook = () => {
  const setItemList = useSetRecoilState(itemListState);
  const setMyItemList = useSetRecoilState(myItemListState);

  const fetchItemsAPI = async () => {
    try {
      const response = await sendRequest(itemInstance, 'get', ``);
      setItemList(response.data);
      console.log('@', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ 전체 아이템 조회 실패:', error.response || error.message);
      if (!error.response) {
        throw new Error('네트워크 에러: 서버에 연결할 수 없습니다.');
      }
    }
  };

  const fetchMyItemsAPI = async () => {
    try {
      const response = await sendRequest(itemInstance, 'get', `/myItems`);
      setMyItemList(response.data);
      console.log('@', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ 아이템 조회 실패:', error.response || error.message);
      if (!error.response) {
        throw new Error('네트워크 에러: 서버에 연결할 수 없습니다.');
      }
    }
  };

  const purchaseItemAPI = async itemId => {
    try {
      await sendRequest(purchaseInstance, 'post', ``, { itemId });
      const response = await sendRequest(itemInstance, 'get', `/myItems`);
      setMyItemList(response.data);
      return response.data;
    } catch (error) {
      console.error('❌ 아이템 구매 실패:', error.response || error.message);
      return false;
    }
  };

  const applyItemAPI = async itemId => {
    try {
      const response = await sendRequest(itemInstance, 'post', `/use`, { itemId });
      return response.status;
    } catch (error) {
      console.error('❌ 아이템 사용 실패:', error.response || error.message);
      return false;
    }
  };

  return {
    fetchItemsAPI,
    fetchMyItemsAPI,
    purchaseItemAPI,
    applyItemAPI,
  };
};
