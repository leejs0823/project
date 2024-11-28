import React, { useEffect, useState } from 'react';
import * as S from './FriendList.styles';
import bellIcon from '../../assets/images/bell-icon.svg';
import fillBellIcon from '../../assets/images/fill-bell-icon.svg';
import searchIcon from '../../assets/images/search-icon.svg';
import leftArrowIcon from '../../assets/images/left-arrow-icon.svg';
import FriendProfile from './components/FriendProfile';
import { fetchUsersAPI } from '../../api/user/user';
import { fetchUserDetailAPI } from '../../api/user/user';

function FriendList() {
  const [currentState, setCurrentState] = useState('home');
  const [currentTitle, setCurrentTitle] = useState('내 친구 목록');
  const [currentList, setCurrentList] = useState();
  const [searchNickname, setSearchNickname] = useState();

  const handleMenuClick = async menu => {
    setCurrentState(menu);
    if (menu === 'search') {
      setCurrentTitle('전체 유저 조회');
      const list = await fetchUsersAPI();
      setCurrentList(list);
    } else if (menu === 'alert') {
      setCurrentTitle('알림');
    } else if (menu === 'home') {
      setCurrentTitle('내 친구 목록');
    }
  };

  const handleSearch = async e => {
    e.preventDefault();
    try {
      const searchList = await fetchUserDetailAPI(searchNickname);
      // 검색 결과를 배열로 설정
      setCurrentList([searchList]);
    } catch (error) {
      setCurrentList([]);
      console.log('검색 실패');
    }
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
            <input
              type="text"
              placeholder="닉네임으로 검색하세요!"
              value={searchNickname}
              onChange={e => setSearchNickname(e.target.value)}
            />
            <button>
              <img src={searchIcon} alt="search" type="submit" />
            </button>
          </S.FormContainer>
          <S.ScrollContainer>
            {currentList.length > 0 ? (
              currentList.map((item, index) => (
                <FriendProfile
                  key={index}
                  nickname={item.nickname}
                  totalPoint={item.totalPoint}
                  chattingColor={item.chattingColor}
                  nicknameColor={item.nicknameColor}
                />
              ))
            ) : (
              <p>해당 닉네임의 유저가 존재하지 않습니다!</p>
            )}
          </S.ScrollContainer>
        </S.SearchContainer>
      )}
    </S.Container>
  );
}

export default FriendList;
