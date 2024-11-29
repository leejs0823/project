import React from 'react';
import * as S from './Header.styles';
import defaultProfile from '../../../assets/images/default-profile.svg';
import { useRecoilValue } from 'recoil';
import { myCurrentPointState, myTotalPointState } from '../../../recoil/user';

function Header() {
  const myCurrentPoint = useRecoilValue(myCurrentPointState);
  const myTotalPoint = useRecoilValue(myTotalPointState);
  const myNickname = localStorage.getItem('nickname');
  return (
    <S.Container>
      <S.Welcome>🖐️ 안녕하세요, {myNickname} 님!</S.Welcome>
      <S.SideContainer>
        <S.Point>사용 가능한 포인트 : {myCurrentPoint} point</S.Point>
        <p>|</p>
        <S.Point>랭킹 포인트 : {myTotalPoint} point</S.Point>
        <S.ProfileImage src={defaultProfile} alt="image" />
      </S.SideContainer>
    </S.Container>
  );
}

export default Header;
