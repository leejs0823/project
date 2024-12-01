import React from 'react';
import * as S from './FriendProfile.styles';
import defaultImage from '../../../assets/images/default-profile.svg';

function FriendProfile({
  nickname,
  totalPoint,
  nicknameColor,
  isMyFriend,
  type,
  sendMessage,
  friendshipId,
}) {
  const myNickname = localStorage.getItem('nickname');

  const handleAddFriend = () => {
    sendMessage('/ws/addFriend', { senderNickname: myNickname, receiverNickname: nickname });
    confirm('친구 요청이 완료되었습니다!');
  };

  const handleAccept = () => {
    const currentFriendshipId = friendshipId;
    sendMessage('/ws/respondToFriendRequest', {
      friendshipId: currentFriendshipId,
      senderNickname: myNickname,
      status: 'ACCEPT',
    });
    confirm(`${nickname}님과 친구가 되었습니다!`);
  };

  const handleReject = () => {
    const currentFriendshipId = friendshipId;
    sendMessage('/ws/respondToFriendRequest', {
      friendshipId: currentFriendshipId,
      senderNickname: myNickname,
      status: 'REJECT',
    });
    confirm(`${nickname}님의 친구 요청을 거절하였습니다.`);
  };

  return (
    <S.Container>
      <S.NameContainer>
        <S.ProfileImage src={defaultImage} alt="image" />
        <S.Nickname color={nicknameColor}>{nickname}</S.Nickname>
      </S.NameContainer>
      <S.ButtonContainer>
        <S.Point>{totalPoint} point</S.Point>
        {isMyFriend === false && <S.Button onClick={handleAddFriend}>친구 요청</S.Button>}
        {type === 'alert' && (
          <>
            <S.Button onClick={handleAccept}>수락</S.Button>{' '}
            <S.DenialButton onClick={handleReject}>거절</S.DenialButton>
          </>
        )}
      </S.ButtonContainer>
    </S.Container>
  );
}

export default FriendProfile;
