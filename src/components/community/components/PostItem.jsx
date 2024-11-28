import React from 'react';
import * as S from './PostItem.styles';
import defaultImage from '../../../assets/images/default-profile.svg';

function PostItem({ date, username, imageUrl, content }) {
  return (
    <S.Container>
      <S.ProfileContainer>
        {imageUrl ? (
          <S.ProfileImage src={imageUrl} alt="image" />
        ) : (
          <S.ProfileImage src={defaultImage} alt="image" />
        )}
        <S.UserName>{username}</S.UserName>
        <S.Date>{date}</S.Date>
      </S.ProfileContainer>
      <S.Content>{content}</S.Content>
      <S.DrawImage />
    </S.Container>
  );
}

export default PostItem;
