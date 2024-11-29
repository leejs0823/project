import React, { useEffect } from 'react';
import * as S from './Header.styles';
import defaultProfile from '../../../assets/images/default-profile.svg';
import { useRecoilValue } from 'recoil';
import { myCurrentPointState, myTotalPointState, nicknameColorState } from '../../../recoil/user';
import { useUserHook } from '../../../api/user/user';

function Header() {
  const { fetchUserDetailAPI } = useUserHook();
  const myCurrentPoint = useRecoilValue(myCurrentPointState);
  const myTotalPoint = useRecoilValue(myTotalPointState);
  const nicknameColor = useRecoilValue(nicknameColorState);
  const myNickname = localStorage.getItem('nickname');

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserDetailAPI(myNickname);
    };
    fetchData();
  }, [myNickname]);

  return (
    <S.Container>
      <S.Welcome color={nicknameColor}>
        🖐️ 안녕하세요, <p>{myNickname}</p> 님!
      </S.Welcome>
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
