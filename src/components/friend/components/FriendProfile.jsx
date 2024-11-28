import React from 'react';
import * as S from './FriendProfile.styles';
import defaultImage from '../../../assets/images/default-profile.svg';

function FriendProfile({ nickName, totalPoint }) {
  return (
    <S.Container>
      <S.NameContainer>
        <S.ProfileImage src={defaultImage} alt="image" />
        <S.Nickname>{nickName}</S.Nickname>
      </S.NameContainer>
      <S.Point>{totalPoint} point</S.Point>
    </S.Container>
  );
}

export default FriendProfile;
