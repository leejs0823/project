import React, { useState } from 'react';
import * as S from './Ranking.styles';
import RankingItem from './components/RankingItem';

function Ranking() {
  const [lankingState, setLankingState] = useState('all');
  const handleLankingClick = lankingSwitch => {
    setLankingState(lankingSwitch);
  };
  const rankingList = [
    {
      rank: 1,
      nickname: 'username',
      point: 10000,
    },
    {
      rank: 2,
      nickname: 'username',
      point: 8000,
    },
    {
      rank: 3,
      nickname: 'username',
      point: 7000,
    },
    {
      rank: 4,
      nickname: 'username',
      point: 6000,
    },
    {
      rank: 5,
      nickname: 'username',
      point: 5000,
    },
  ];
  const myProfile = {
    rank: 17,
    point: 1000,
    nickname: 'username',
  };
  return (
    <S.Container>
      <S.Title>RANKING</S.Title>
      <S.ButtonContainer>
        <S.SwitchButton
          isActive={lankingState === 'all' ? true : false}
          onClick={() => handleLankingClick('all')}
        >
          전체 랭킹
        </S.SwitchButton>
        <S.SwitchButton
          isActive={lankingState === 'friend' ? true : false}
          onClick={() => handleLankingClick('friend')}
        >
          친구 랭킹
        </S.SwitchButton>
      </S.ButtonContainer>
      <S.RankUserPoint>
        <p>RANK</p>
        <p>USER</p>
        <p>POINT</p>
      </S.RankUserPoint>
      <S.ListContainer>
        <RankingItem
          nickname={myProfile.nickname}
          rank={myProfile.rank}
          point={myProfile.point}
          isMyRanking={true}
        />
        {rankingList &&
          rankingList.map(item => (
            <RankingItem
              key={item.rank}
              nickname={item.nickname}
              rank={item.rank}
              point={item.point}
            />
          ))}
      </S.ListContainer>
    </S.Container>
  );
}

export default Ranking;
