import React, { useState, useEffect } from 'react';
import * as S from './MainPage.styles';
import Sidebar from '../../components/common/sidebar/Sidebar';
import Header from '../../components/common/header/Header';
import Ranking from '../../components/main/Ranking';
import StartGame from '../../components/main/StartGame';
import GameReady from '../../components/main/components/GameReady';
import { useWebSocket } from '../../util/websocket';

function MainPage() {
  const [currentGameState, setCurrentGameState] = useState('not-ready');
  const nickname = localStorage.getItem('nickname');
  const { connect } = useWebSocket();

  useEffect(() => {
    connect(nickname);
  }, [nickname]);

  return (
    <S.Container>
      <Sidebar />
      <S.MainContainer>
        <Header />
        <S.MainBody>
          {currentGameState === 'not-ready' && (
            <>
              <StartGame setCurrentGameState={setCurrentGameState} />
              <Ranking />
            </>
          )}
          {currentGameState === 'ready' && <GameReady setCurrentGameState={setCurrentGameState} />}
        </S.MainBody>
      </S.MainContainer>
    </S.Container>
  );
}

export default MainPage;
