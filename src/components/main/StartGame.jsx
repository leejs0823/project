import React, { useState } from 'react';
import * as S from './StartGame.styles';
import DrawItLogo from '../../assets/images/DrawIt-logo.svg';

function StartGame() {
  const [isReady, setIsReady] = useState(false);
  const handleStartGame = () => {
    setIsReady(true);
    console.log('start game');
  };
  return (
    <S.Container>
      <S.Content>
        <S.Logo src={DrawItLogo} alt="logo" />
        {isReady === false && (
          <>
            <S.Title>게임 시작하기</S.Title>
            <S.Mention>
              디스코드를 연결하여 친구들과 함께 이야기하며 게임하면 훨씬 재밌어요!
            </S.Mention>
          </>
        )}

        <S.CreateGameButton onClick={handleStartGame}>게임 방 생성하기</S.CreateGameButton>
      </S.Content>
    </S.Container>
  );
}

export default StartGame;