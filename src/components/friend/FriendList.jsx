import React, { useState } from 'react';
import * as S from './FriendList.styles';
import bellIcon from '../../assets/images/bell-icon.svg';
import fillBellIcon from '../../assets/images/fill-bell-icon.svg';
import searchIcon from '../../assets/images/search-icon.svg';
import leftArrowIcon from '../../assets/images/left-arrow-icon.svg';
import FriendProfile from './components/FriendProfile';

function FriendList() {
  const [currentState, setCurrentState] = useState('home');
  const [currentTitle, setCurrentTitle] = useState('내 친구 목록');

  const handleMenuClick = menu => {
    setCurrentState(menu);
    if (menu === 'search') {
      setCurrentTitle('전체 유저 조회');
    } else if (menu === 'alert') {
      setCurrentTitle('알림');
    } else if (menu === 'home') {
      setCurrentTitle('내 친구 목록');
    }
  };

  const handleSearch = () => {
    console.log('search logic');
  };
  const friendList = [
    {
      nickName: '이정선',
      totalPoint: 10000,
    },
    {
      nickName: '임준영',
      totalPoint: 2000,
    },
    {
      nickName: '류성호',
      totalPoint: 1000,
    },
    {
      nickName: '박민기',
      totalPoint: 100,
    },
    {
      nickName: '서은정',
      totalPoint: 100,
    },
    {
      nickName: '김소윤',
      totalPoint: 100,
    },
  ];
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>{currentTitle}</S.Title>
        {currentState === 'home' && (
          <S.ButtonContainer>
            <S.Button onClick={() => handleMenuClick('alert')}>
              <S.Icon src={bellIcon} alt="bell" />
            </S.Button>
            <S.Button onClick={() => handleMenuClick('search')}>
              <S.Icon src={searchIcon} alt="search" />
            </S.Button>
          </S.ButtonContainer>
        )}
        {currentState !== 'home' && (
          <S.BackButton>
            <S.BackIcon src={leftArrowIcon} alt="back" onClick={() => handleMenuClick('home')} />
            <p>돌아가기</p>
          </S.BackButton>
        )}
      </S.TitleContainer>
      {currentState === 'home' && (
        <S.FriendList>
          {friendList &&
            friendList.map((item, index) => (
              <FriendProfile key={index} nickName={item.nickName} totalPoint={item.totalPoint} />
            ))}
        </S.FriendList>
      )}
      {currentState === 'search' && (
        <S.SearchContainer>
          <S.FormContainer onSubmit={handleSearch}>
            <input type="text" placeholder="닉네임으로 검색하세요!" />
            <button>
              <img src={searchIcon} alt="search" type="submit" />
            </button>
          </S.FormContainer>
          <S.ScrollContainer>
            {friendList &&
              friendList.map((item, index) => (
                <FriendProfile key={index} nickName={item.nickName} totalPoint={item.totalPoint} />
              ))}
          </S.ScrollContainer>
        </S.SearchContainer>
      )}
    </S.Container>
  );
}

export default FriendList;
