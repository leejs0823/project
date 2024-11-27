import React, { useState, useEffect } from 'react';
import * as S from './StoreContainer.styles';
import StoreItem from './components/StoreItem';
import rightArrowIcon from '../../assets/images/right-arrow-icon.svg';
import leftArrowIcon from '../../assets/images/left-arrow-icon.svg';

function StoreContainer() {
  const [currentState, setCurrentState] = useState('all');
  const [currendList, setCurrentList] = useState([]);
  const itemList = [
    {
      color: 'orange',
      description: '내 닉네임의 색깔을 빨간색으로 바꿀 수 있어요!',
      name: '닉네임 색깔 바꾸기 아이템',
      point: 100,
    },
    {
      color: 'yellow',
      description: '내 닉네임의 색깔을 빨간색으로 바꿀 수 있어요!',
      name: '닉네임 색깔 바꾸기 아이템',
      point: 100,
    },
    {
      color: 'pink',
      description: '내 닉네임의 색깔을 빨간색으로 바꿀 수 있어요!',
      name: '닉네임 색깔 바꾸기 아이템',
      point: 100,
    },
    {
      color: 'purple',
      description: '내 닉네임의 색깔을 빨간색으로 바꿀 수 있어요!',
      name: '닉네임 색깔 바꾸기 아이템',
      point: 100,
    },
    {
      color: 'green',
      description: '내 닉네임의 색깔을 빨간색으로 바꿀 수 있어요!',
      name: '닉네임 색깔 바꾸기 아이템',
      point: 100,
    },
    {
      color: 'red',
      description: '내 닉네임의 색깔을 빨간색으로 바꿀 수 있어요!',
      name: '닉네임 색깔 바꾸기 아이템',
      point: 100,
    },
    {
      color: 'primary2',
      description: '내 닉네임의 색깔을 빨간색으로 바꿀 수 있어요!',
      name: '닉네임 색깔 바꾸기 아이템',
      point: 100,
    },
  ];
  const myItemList = [
    {
      color: 'orange',
      description: '내 닉네임의 색깔을 빨간색으로 바꿀 수 있어요!',
      name: '닉네임 색깔 바꾸기 아이템',
      point: 100,
    },

    {
      color: 'purple',
      description: '내 닉네임의 색깔을 빨간색으로 바꿀 수 있어요!',
      name: '닉네임 색깔 바꾸기 아이템',
      point: 100,
    },
    {
      color: 'green',
      description: '내 닉네임의 색깔을 빨간색으로 바꿀 수 있어요!',
      name: '닉네임 색깔 바꾸기 아이템',
      point: 100,
    },
  ];

  useEffect(() => {
    setCurrentList(itemList);
    setCurrentState('all');
  }, []);
  const handleClick = () => {
    if (currentState === 'all') {
      setCurrentState('private');
      setCurrentList(myItemList);
    } else if (currentState === 'private') {
      setCurrentState('all');
      setCurrentList(itemList);
    }
  };

  return (
    <S.Container>
      <S.TitleContainer>
        {currentState === 'all' ? <S.Title>상점</S.Title> : <S.Title>내 아이템 목록</S.Title>}
      </S.TitleContainer>
      {currentState === 'all' && (
        <S.RightArrowContainer>
          <p>내 아이템 목록</p>
          <S.Icon src={rightArrowIcon} alt="arrow" onClick={handleClick} />
        </S.RightArrowContainer>
      )}
      {currentState === 'private' && (
        <S.LeftArrowContainer>
          <S.Icon src={leftArrowIcon} alt="arrow" onClick={handleClick} />
          <p>상점으로 돌아가기</p>
        </S.LeftArrowContainer>
      )}
      <S.ContentContainer>
        {currentState === 'all' &&
          currendList.map((item, index) => (
            <StoreItem
              key={index}
              name={item.name}
              color={item.color}
              description={item.description}
              cost={item.point}
              type="first"
              button="구매하기"
            />
          ))}
        {currentState === 'private' &&
          currendList.map((item, index) => (
            <StoreItem
              key={index}
              name={item.name}
              color={item.color}
              description={item.description}
              cost={item.point}
              type="second"
              button="적용하기"
            />
          ))}
      </S.ContentContainer>
    </S.Container>
  );
}

export default StoreContainer;
