import React from 'react';
import * as S from './StoreItem.styles';
import { useItemHook } from '../../../api/item/item';

function StoreItem({ itemId, name, description, color, cost, button, type }) {
  const { purchaseItemAPI } = useItemHook();
  const handleButtonClick = async e => {
    e.preventDefault(); // 새로고침 방지
    if (type === 'first') {
      await purchaseItemAPI(itemId);
      confirm('구매 완료');
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
