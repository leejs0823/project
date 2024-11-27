import React from 'react';
import * as S from './InputContainer.styles';

function InputContainer({ icon, title, type }) {
  return (
    <S.Container>
      <S.Icon src={icon} alt="icon" />
      <S.Input type={type} placeholder={title}></S.Input>
    </S.Container>
  );
}

export default InputContainer;
