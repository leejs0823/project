import React from 'react';
import * as S from './InputContainer.styles';

function InputContainer({ icon, title, type, value, onChange }) {
  return (
    <S.Container>
      <S.Icon src={icon} alt="icon" />
      <S.Input type={type} placeholder={title} value={value} onChange={onChange}></S.Input>
    </S.Container>
  );
}

export default InputContainer;
