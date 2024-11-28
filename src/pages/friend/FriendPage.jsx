import React from 'react';
import * as S from './FriendPage.styles';
import Sidebar from '../../components/common/sidebar/Sidebar';
import Header from '../../components/common/header/Header';
import FriendList from '../../components/friend/FriendList';

function FriendPage() {
  return (
    <S.Container>
      <Sidebar />
      <S.MainContainer>
        <Header />
        <S.MainBody>
          <FriendList />
        </S.MainBody>
      </S.MainContainer>
    </S.Container>
  );
}

export default FriendPage;
