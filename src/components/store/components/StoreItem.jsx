import React from 'react';
import * as S from './StoreItem.styles';

function StoreItem({ name, description, color, cost, button, type }) {
  return (
    <S.Container>
      <S.Item>
        <S.Color color={color}></S.Color>
        <S.Title>{name}</S.Title>
        <S.Description>{description}</S.Description>
        <S.Point>포인트 : {cost} point</S.Point>
      </S.Item>
      <S.PurchaseButton type={type}>{button}</S.PurchaseButton>
    </S.Container>
  );
}

export default StoreItem;
