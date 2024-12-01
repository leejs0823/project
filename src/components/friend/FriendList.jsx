import React, { useState, useEffect, useRef } from 'react';
import * as S from './FriendList.styles';
import bellIcon from '../../assets/images/bell-icon.svg';
import searchIcon from '../../assets/images/search-icon.svg';
import leftArrowIcon from '../../assets/images/left-arrow-icon.svg';
import FriendProfile from './components/FriendProfile';
import { useUserHook } from '../../api/user/user';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function FriendList() {
  const { fetchUserDetailAPI, fetchUsersAPI } = useUserHook();
  const [currentState, setCurrentState] = useState('home');
  const [currentTitle, setCurrentTitle] = useState('내 친구 목록');
  const [currentList, setCurrentList] = useState([]);
  const [alertList, setAlertList] = useState([]); // 알림 상태의 리스트
  const [searchNickname, setSearchNickname] = useState();
  const nickname = localStorage.getItem('nickname');
  const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

  const stompClientRef = useRef(null);

  const sendMessage = (destination, payload) => {
    const stompClient = stompClientRef.current;
    if (stompClient && stompClient.connected) {
      console.log('Sending message to:', destination);
      stompClient.send(destination, {}, JSON.stringify(payload));
    } else {
      console.error('WebSocket is not connected. Unable to send message.');
    }
  };

  useEffect(() => {
    const connect = () => {
      const socket = new SockJS(`${BASE_URL}/ws`);
      const client = Stomp.over(socket);
      stompClientRef.current = client;
      client.connect({}, () => {
        console.log('Connected to WebSocket');

        // 친구 요청 수신 구독
        client.subscribe(`/queue/friendRequests/${nickname}`, message => {
          const payload = JSON.parse(message.body);
          if (payload && payload.length > 0) {
            // 중복 데이터 방지
            setAlertList(prev => {
              const exists = prev.some(item => item.senderNickname === payload.senderNickname);
              if (!exists) {
                return [...prev, payload];
              }
              return prev;
            });
          }
          alert(`Friend Request from: ${payload.senderNickname}`);
        });

        // 친구 요청 응답 수신 구독
        client.subscribe(`/queue/friendResponses/${nickname}`, message => {
          const payload = JSON.parse(message.body);
          alert(`Friend Request ${payload.status}: ${payload.friendshipId}`);
        });

        // 대기 중인 요청 수신 구독
        client.subscribe(`/queue/pendingFriendRequests/${nickname}`, message => {
          const pendingRequests = JSON.parse(message.body);
          // 중복 데이터 방지
          if (pendingRequests && pendingRequests.length > 0) {
            // 중복 데이터 방지
            setAlertList(prev => {
              const newRequests = pendingRequests.filter(
                req => !prev.some(item => item.senderNickname === req.senderNickname)
              );
              return [...prev, ...newRequests];
            });
          }
        });
      });
    };
    connect();
    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      const stompClient = stompClientRef.current;
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log('WebSocket disconnected');
        });
      }
    };
    // eslint-disable-next-line
  }, [nickname]);

  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const list = await fetchUsersAPI();
        const friendList = list.filter(user => user.isFriend); // isFriend가 true인 사용자 필터링
        setCurrentList(friendList); // currentList에 저장
      } catch (error) {
        console.error('친구 목록을 가져오는 중 에러 발생:', error);
      }
    };

    if (currentState === 'home') {
      fetchFriendList(); // 초기 화면에서 친구 목록 로드
    }
    // eslint-disable-next-line
  }, []);

  const handleMenuClick = async menu => {
    setCurrentState(menu);
    if (menu === 'search') {
      setCurrentTitle('전체 유저 조회');
      const list = await fetchUsersAPI();
      setCurrentList(list);
    } else if (menu === 'alert') {
      setCurrentTitle('알림');
      sendMessage('/ws/getPendingRequests', { receiverNickname: nickname });
      console.log('@');
    } else if (menu === 'home') {
      setCurrentTitle('내 친구 목록');
      const list = await fetchUsersAPI();
      const friendList = list.filter(user => user.isFriend);
      setCurrentList(friendList);
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
          {currentList.length > 0 &&
            currentList.map((item, index) => (
              <FriendProfile key={index} nickname={item.nickname} totalPoint={item.totalPoints} />
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
                  totalPoint={item.totalPoints}
                  chattingColor={item.chattingColor}
                  nicknameColor={item.nicknameColor}
                  isMyFriend={false}
                  sendMessage={sendMessage}
                />
              ))
            ) : (
              <p>해당 닉네임의 유저가 존재하지 않습니다!</p>
            )}
          </S.ScrollContainer>
        </S.SearchContainer>
      )}
      {currentState === 'alert' && (
        <S.FriendList>
          {alertList &&
            alertList.map((item, index) => (
              <FriendProfile
                key={index}
                nickname={item.senderNickname}
                totalPoint={item.totalPoints}
                friendshipId={item.friendshipId}
                type="alert"
                sendMessage={sendMessage}
              />
            ))}
        </S.FriendList>
      )}
    </S.Container>
  );
}

export default FriendList;
