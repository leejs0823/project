import React from 'react';
import * as S from './CommunityPage.styles';
import Sidebar from '../../components/common/sidebar/Sidebar';
import Header from '../../components/common/header/Header';
import PostContainer from '../../components/community/PostContainer';

function CommunityPage() {
  return (
    <S.Container>
      <Sidebar />
      <S.MainContainer>
        <Header />
        <S.MainBody>
          <PostContainer />
        </S.MainBody>
      </S.MainContainer>
    </S.Container>
  );
}

export default CommunityPage;
