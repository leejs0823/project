import React from 'react';
import * as S from './MainPage.styles';
import Sidebar from '../../components/common/sidebar/Sidebar';
import Header from '../../components/common/header/Header';
import Ranking from '../../components/main/Ranking';
import StartGame from '../../components/main/StartGame';

function MainPage() {
  return (
    <S.Container>
      <Sidebar />
      <S.MainContainer>
        <Header />
        <S.MainBody>
          <StartGame />
          <Ranking />
        </S.MainBody>
      </S.MainContainer>
    </S.Container>
  );
}

export default MainPage;
