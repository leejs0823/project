import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './GameReady.styles';
import DrawItLogo from '../../../assets/images/DrawIt-logo.svg';
import defaultImage from '../../../assets/images/default-profile.svg';

function GameReady({ setCurrentGameState }) {
  const navigate = useNavigate();
  const handleStartClick = () => {
    setCurrentGameState('start');
    navigate('/game');
  };
  return (
    <S.Container>
      <S.Logo src={DrawItLogo} alt="logo" />
      <S.ReadyContainer>
        <S.PlayerInviteContainer>
          <S.Title>2/4 플레이어</S.Title>
          <S.Content>총 4 명의 플레이어와 함께 게임할 수 있습니다!</S.Content>
          <S.User>
            <div>
              <S.Image src={defaultImage} alt="image" />
              <S.Nickname>username</S.Nickname>
            </div>
            <S.Tag>멤버</S.Tag>
          </S.User>
          <S.User>
            <div>
              <S.Image src={defaultImage} alt="image" />
              <S.Nickname>username</S.Nickname>
            </div>
            <S.Tag>멤버</S.Tag>
          </S.User>
        </S.PlayerInviteContainer>
        <S.PlayerInviteContainer>
          <S.Title>친구 초대하기</S.Title>
          <S.Content>현재 접속되어 있는 친구 목록입니다!</S.Content>
          <S.User>
            <div>
              <S.Image src={defaultImage} alt="image" />
              <S.Nickname>username</S.Nickname>
            </div>
            <S.Tag>초대</S.Tag>
          </S.User>
          <S.User>
            <div>
              <S.Image src={defaultImage} alt="image" />
              <S.Nickname>username</S.Nickname>
            </div>
            <S.Tag>초대</S.Tag>
          </S.User>
        </S.PlayerInviteContainer>
      </S.ReadyContainer>
      <button onClick={handleStartClick}>게임 시작하기</button>
    </S.Container>
  );
}

export default GameReady;
