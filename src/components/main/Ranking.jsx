import React, { useState, useEffect } from 'react';
import * as S from './Ranking.styles';
import RankingItem from './components/RankingItem';
import { useRecoilValue } from 'recoil';
import { myTotalPointState, myNicknameState, allUserRankingState } from '../../recoil/user';
import { useUserHook } from '../../api/user/user';

function Ranking() {
  const { fetchUsersAPI } = useUserHook();
  const myTotalPoint = useRecoilValue(myTotalPointState);
  const myNickname = useRecoilValue(myNicknameState);
  const allUserRanking = useRecoilValue(allUserRankingState);
  const [lankingState, setLankingState] = useState('all');

  const handleLankingClick = lankingSwitch => {
    setLankingState(lankingSwitch);
  };

  useEffect(() => {
    const fetchRankingList = async () => {
      try {
        await fetchUsersAPI();
      } catch (error) {
        console.error('랭킹 리스트를 가져오는 중 에러 발생:', error);
      }
    };
    fetchRankingList();
  }, []);

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
        <RankingItem nickname={myNickname} rank="1" point={myTotalPoint} isMyRanking={true} />
        {allUserRanking &&
          allUserRanking.map((item, index) => (
            <RankingItem
              key={index}
              nickname={item.nickname}
              rank={index + 1}
              point={item.totalPoint}
              isMyRanking={item.nickname === myNickname ? true : false}
            />
          ))}
      </S.ListContainer>
    </S.Container>
  );
}

export default Ranking;
