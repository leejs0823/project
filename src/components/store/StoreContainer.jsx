import React, { useState, useEffect } from 'react';
import * as S from './StoreContainer.styles';
import StoreItem from './components/StoreItem';
import rightArrowIcon from '../../assets/images/right-arrow-icon.svg';
import leftArrowIcon from '../../assets/images/left-arrow-icon.svg';
import { fetchItemsAPI } from '../../api/item/item';

function StoreContainer() {
  const [currentState, setCurrentState] = useState('all');
  const [currentList, setCurrentList] = useState([]);
  useEffect(() => {
    const fetchItemsAsync = async () => {
      try {
        const list = await fetchItemsAPI();
        setCurrentList(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItemsAsync();
  }, []);

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
    setCurrentState('all');
  }, []);

  const handleClick = () => {
    if (currentState === 'all') {
      setCurrentState('private');
      setCurrentList(myItemList);
    } else if (currentState === 'private') {
      setCurrentState('all');
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
          currentList.map(item => (
            <StoreItem
              key={item.id}
              name={item.name}
              color={item.color}
              description={item.description}
              cost={item.point}
              type="first"
              button="구매하기"
            />
          ))}
        {currentState === 'private' &&
          currentList.map((item, index) => (
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
