import React, { useState, useEffect } from 'react';
import * as S from './StoreContainer.styles';
import StoreItem from './components/StoreItem';
import rightArrowIcon from '../../assets/images/right-arrow-icon.svg';
import leftArrowIcon from '../../assets/images/left-arrow-icon.svg';
import { useItemHook } from '../../api/item/item';
import { useRecoilValue } from 'recoil';
import { myItemListState, itemListState } from '../../recoil/item';

function StoreContainer() {
  const myItemList = useRecoilValue(myItemListState);
  const itemList = useRecoilValue(itemListState);
  const { fetchItemsAPI, fetchMyItemsAPI } = useItemHook();
  const [currentState, setCurrentState] = useState('all');
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    const fetchItemsAsync = async () => {
      try {
        await Promise.all([fetchItemsAPI(), fetchMyItemsAPI()]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItemsAsync();
    setCurrentState('all');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentState === 'all') {
      setCurrentList(itemList);
    } else if (currentState === 'private') {
      setCurrentList(myItemList);
    }
  }, [currentState, itemList, myItemList]);

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
              itemId={item.id}
              name={item.name}
              color={item.color}
              description={item.description}
              cost={item.cost}
              type="first"
              button="구매하기"
            />
          ))}
        {currentState === 'private' &&
          currentList.map((item, index) => (
            <StoreItem
              key={index}
              name={item.name}
              itemId={item.id}
              color={item.color}
              description={item.description}
              cost={item.cost}
              type="second"
              button="적용하기"
            />
          ))}
      </S.ContentContainer>
    </S.Container>
  );
}

export default StoreContainer;
