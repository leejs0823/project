import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './GameReady.styles';
import DrawItLogo from '../../../assets/images/DrawIt-logo.svg';
import defaultImage from '../../../assets/images/default-profile.svg';
import { useUserHook } from '../../../api/user/user';
import { allUserListState } from '../../../recoil/user';
import { useRecoilValue } from 'recoil';

function GameReady({
  setCurrentGameState,
  sendMessage,
  gameRoomId,
  hostNickname,
  participantNicknameList,
}) {
  const [currentHostNickname, setCurrentHostNickname] = useState();
  const { fetchUsersAPI } = useUserHook();
  const allUserList = useRecoilValue(allUserListState);
  const nickname = localStorage.getItem('nickname');
  const navigate = useNavigate();

  const handleStartClick = () => {
    setCurrentGameState('start');
    console.log('###', gameRoomId);
    sendMessage('/ws/startGame', { gameRoomId });
  };
  console.log(gameRoomId);
  const handleInviteRoom = name => {
    sendMessage(`/ws/inviteRoom`, {
      hostNickname: nickname,
      roomId: gameRoomId,
      receiverNickname: name,
    });
  };

  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        await fetchUsersAPI();
      } catch (error) {
        console.error('리스트를 가져오는 중 에러 발생:', error);
      }
    };
    fetchFriendList();
    if (hostNickname) {
      setCurrentHostNickname(hostNickname);
    } else setCurrentHostNickname(nickname);
    setCurrentHostNickname;
    // eslint-disable-next-line
  }, []);

  // 친구만 필터링
  const friendsList = allUserList.filter(user => user.isFriend);

  return (
    <S.Container>
      <S.Logo src={DrawItLogo} alt="logo" />
      <S.ReadyContainer>
        <S.PlayerContainer>
          <S.Title>2/4 플레이어</S.Title>
          <S.Content>총 4 명의 플레이어와 함께 게임할 수 있습니다!</S.Content>
          <S.UserContainer>
            <S.User>
              <div>
                <S.Image src={defaultImage} alt="image" />
                <S.Nickname>{currentHostNickname}</S.Nickname>
              </div>
              <S.Tag>방장</S.Tag>
            </S.User>
            {participantNicknameList && participantNicknameList.length > 0
              ? participantNicknameList.map((nickname, index) => (
                  <S.User key={index}>
                    <div>
                      <S.Image src={defaultImage} alt="image" />
                      <S.Nickname>{nickname}</S.Nickname>
                    </div>
                    <S.MemberTag>멤버</S.MemberTag>
                  </S.User>
                ))
              : null}
            {/* 남은 빈 슬롯에 "친구를 초대하세요!" 표시 */}
            {Array.from({ length: 3 - (participantNicknameList?.length || 0) }).map((_, index) => (
              <S.User key={`empty-${index}`}>친구를 초대하세요!</S.User>
            ))}
          </S.UserContainer>
        </S.PlayerContainer>
        <S.InviteContainer>
          <S.Title>친구 초대하기</S.Title>
          <S.Content>현재 친구 목록입니다!</S.Content>
          <S.InviteUserContainer>
            {friendsList.length > 0 &&
              friendsList.map((user, index) => (
                <S.User key={index}>
                  <div>
                    <S.Image src={defaultImage} alt="image" />
                    <S.Nickname>{user.nickname}</S.Nickname>
                  </div>
                  <S.Tag onClick={() => handleInviteRoom(user.nickname)}>초대</S.Tag>
                </S.User>
              ))}
          </S.InviteUserContainer>
        </S.InviteContainer>
      </S.ReadyContainer>
      <S.StartButton onClick={handleStartClick}>게임 시작하기</S.StartButton>
    </S.Container>
  );
}

export default GameReady;
