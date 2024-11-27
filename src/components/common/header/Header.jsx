import React from 'react';
import * as S from './Header.styles';
import defaultProfile from '../../../assets/images/default-profile.svg';

function Header() {
  const username = '이정선';
  const currentPoint = 800;
  return (
    <S.Container>
      <S.Welcome>🖐️ 안녕하세요, {username} 님!</S.Welcome>
      <S.SideContainer>
        <S.CurrentPoint>내 포인트 : {currentPoint} point</S.CurrentPoint>
        <S.ProfileImage src={defaultProfile} alt="image" />
      </S.SideContainer>
    </S.Container>
  );
}

export default Header;
