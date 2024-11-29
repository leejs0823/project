import React from 'react';
import * as S from './StoreItem.styles';
import { useItemHook } from '../../../api/item/item';

function StoreItem({ itemId, name, description, color, cost, button, type }) {
  const { purchaseItemAPI, applyItemAPI } = useItemHook();
  const handleButtonClick = async e => {
    e.preventDefault(); // 새로고침 방지
    if (type === 'first') {
      const purchaseResponse = await purchaseItemAPI(itemId);
      if (purchaseResponse) {
        confirm('구매 완료');
      } else confirm('돈이 없어요 ㅜㅜ');
    } else if (type === 'second') {
      const useResponse = await applyItemAPI(itemId);
      if (useResponse) {
        confirm('사용 완료');
      } else confirm('사용할 수 없어요 ㅠㅠ');
    }
  };
  return (
    <S.Container>
      <S.Item>
        <S.Color color={color}></S.Color>
        <S.Title>{name}</S.Title>
        <S.Description>{description}</S.Description>
        <S.Point>포인트 : {cost} point</S.Point>
      </S.Item>
      <S.PurchaseButton type={type} onClick={handleButtonClick}>
        {button}
      </S.PurchaseButton>
    </S.Container>
  );
}

export default StoreItem;
