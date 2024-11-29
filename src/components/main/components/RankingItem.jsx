import React from 'react';
import * as S from './RankingItem.styles';
import defaultImage from '../../../assets/images/default-profile.svg';

function RankingItem({ rank, nickname, point, isMyRanking, color }) {
  return (
    <S.Container isActive={isMyRanking ? true : false}>
      <S.Rank>{rank}</S.Rank>
      <S.UserContainer>
        <S.ProfileImage src={defaultImage} alt="image" />
        <S.NameAndButton>
          <S.UserName color={color}>{nickname}</S.UserName>
          {!isMyRanking && <S.Button>친구 신청</S.Button>}
        </S.NameAndButton>
      </S.UserContainer>
      <S.Point>{point}</S.Point>
    </S.Container>
  );
}

export default RankingItem;
