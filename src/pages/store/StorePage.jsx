import React from 'react';
import * as S from './StorePage.styles';
import Sidebar from '../../components/common/sidebar/Sidebar';
import Header from '../../components/common/header/Header';
import StoreContainer from '../../components/store/StoreContainer';

function StorePage() {
  return (
    <S.Container>
      <Sidebar />
      <S.MainContainer>
        <Header />
        <S.MainBody>
          <StoreContainer />
        </S.MainBody>
      </S.MainContainer>
    </S.Container>
  );
}

export default StorePage;
