import React, { useState, useEffect } from 'react';
import * as S from './Ranking.styles';
import RankingItem from './components/RankingItem';
import { useRecoilValue } from 'recoil';
import {
  myTotalPointState,
  myNicknameState,
  allUserRankingState,
  nicknameColorState,
} from '../../recoil/user';
import { useUserHook } from '../../api/user/user';

function Ranking() {
  const { fetchUsersAPI } = useUserHook();
  const myTotalPoint = useRecoilValue(myTotalPointState);
  const myNickname = useRecoilValue(myNicknameState);
  const allUserRanking = useRecoilValue(allUserRankingState);
  const nicknameColor = useRecoilValue(nicknameColorState);
  const [lankingState, setLankingState] = useState('all');
  const [filteredRanking, setFilteredRanking] = useState([]);

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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (lankingState === 'friend') {
      const myProfile = {
        nickname: myNickname,
        nicknameColor: nicknameColor,
        totalPoints: myTotalPoint,
      };
      const sortedRanking = [myProfile, ...allUserRanking.filter(user => user.isFriend)].sort(
        (a, b) => b.totalPoints - a.totalPoints
      );
      setFilteredRanking(sortedRanking); // 상태에 복사본을 저장
    } else {
      const sortedRanking = [...allUserRanking].sort((a, b) => b.totalPoints - a.totalPoints);
      setFilteredRanking(sortedRanking); // 상태에 복사본을 저장
    }
  }, [lankingState, allUserRanking, myNickname, nicknameColor, myTotalPoint]);

  // 백엔드 수정 반영 예정
  const myRank = filteredRanking.findIndex(user => user.nickname === myNickname) + 1;

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
          nickname={myNickname}
          rank={myRank}
          point={myTotalPoint}
          isMyRanking={true}
          color={nicknameColor}
        />
        {filteredRanking &&
          filteredRanking.map((item, index) => (
            <RankingItem
              key={index}
              nickname={item.nickname}
              rank={index + 1}
              point={item.totalPoints}
              isMyRanking={item.nickname === myNickname ? true : false}
              color={item.nicknameColor}
            />
          ))}
      </S.ListContainer>
    </S.Container>
  );
}

export default Ranking;
