import React from 'react';
import * as S from './SquareButton.styles';

function SquareButton({ type, title }) {
  return <S.Container type={type}>{title}</S.Container>;
}

export default SquareButton;
