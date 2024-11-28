import React from 'react';
import * as S from './PostContainer.styles';
import DrawItLogo from '../../assets/images/DrawIt-logo.svg';
import PostItem from './components/PostItem';

function PostContainer() {
  const postList = [
    {
      id: 1,
      content: '나 그럼 너무 잘그렸다! 러키비키니시티',
      username: 'username',
      date: '2024-11-27',
      imageUrl: null,
    },
    {
      id: 2,
      content: '나 그럼 너무 잘그렸다! 러키비키니시티',
      username: 'username',
      date: '2024-11-27',
      imageUrl: null,
    },
    {
      id: 3,
      content: '나 그럼 너무 잘그렸다! 러키비키니시티',
      username: 'username',
      date: '2024-11-27',
      imageUrl: null,
    },
    {
      id: 4,
      content: '나 그럼 너무 잘그렸다! 러키비키니시티',
      username: 'username',
      date: '2024-11-27',
      imageUrl: null,
    },
  ];
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Logo src={DrawItLogo} alt="logo" />
        <S.Title>게시글</S.Title>
      </S.TitleContainer>
      <S.PostList>
        {postList &&
          postList.map(item => (
            <PostItem
              key={item.id}
              username={item.username}
              date={item.date}
              content={item.content}
            />
          ))}
      </S.PostList>
    </S.Container>
  );
}

export default PostContainer;
