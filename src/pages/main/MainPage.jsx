import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './MainPage.styles';
import Sidebar from '../../components/common/sidebar/Sidebar';
import Header from '../../components/common/header/Header';
import Ranking from '../../components/main/Ranking';
import StartGame from '../../components/main/StartGame';
import GameReady from '../../components/main/components/GameReady';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import {
  correctWordDataState,
  drawerNicknameState,
  roundNumberState,
  currentGameRoomState,
} from '../../recoil/game';
import { useSetRecoilState } from 'recoil';

function MainPage() {
  const setCorrectWordDataState = useSetRecoilState(correctWordDataState);
  const setDrawerNicknameState = useSetRecoilState(drawerNicknameState);
  const setRoundNumberState = useSetRecoilState(roundNumberState);
  const setCurrentGameRoomState = useSetRecoilState(currentGameRoomState);
  const navigate = useNavigate();
  const [hostNickname, setHostNickname] = useState();
  const [participantNicknameList, setParticipantNicknameList] = useState([]);
  const [currentGameState, setCurrentGameState] = useState('not-ready');
  const [currentGameRoomId, setCurrentGameRoomId] = useState(null);

  const stompClientRef = useRef(null);
  const nickname = localStorage.getItem('nickname');
  const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

  useEffect(() => {
    const connect = () => {
      const socket = new SockJS(`${BASE_URL}/ws`);
      const client = Stomp.over(socket);
      stompClientRef.current = client;
      client.connect(
        {},
        () => {
          console.log('Connected to WebSocket');

          // 방 생성 알림
          client.subscribe(`/queue/roomHost/${nickname}`, message => {
            const payload = JSON.parse(message.body);
            console.log('Room created:', payload);
            const roomId = payload.gameRoomId; // 변수를 통해 즉시 참조
            setCurrentGameRoomId(roomId);
          });

          // 초대 알림
          client.subscribe(`/queue/inviteRoom/${nickname}`, message => {
            const payload = JSON.parse(message.body);
            console.log('Room invite @', payload);
            console.log(
              `Received invite to Room ID: ${payload.roomId} from Host: ${payload.hostNickname}`
            );
            // 초대 알림에서 handleConfirm 호출 시 roomId 전달
            setHostNickname(payload.hostNickname);
            handleConfirm(payload.hostNickname, nickname, payload.roomId);
          });

          // 초대 수락 알림
          client.subscribe(`/queue/newParticipant/${nickname}`, message => {
            const payload = JSON.parse(message.body);
            console.log('@@@Participant joined:', payload);
            console.log(
              `Room ID: ${payload.roomId}, Host: ${payload.hostNickname}, Participants: ${payload.participantNicknameList.join(', ')}`
            );
            setParticipantNicknameList(payload.participantNicknameList);
            // 참가자 목록을 UI에 업데이트
          });

          // 게임 시작 알림
          client.subscribe(`/game/gameStart/${nickname}`, message => {
            const payload = JSON.parse(message.body);
            console.log('@@@Game started:', payload);
            console.log(
              `Room ID: ${payload.roomId}, Round: ${payload.roundNumber}, Drawer: ${payload.drawerNickname} word: ${payload.correctWord}`
            );
            setCorrectWordDataState(payload.correctWord);
            setDrawerNicknameState(payload.drawerNickname);
            setRoundNumberState(payload.roundNumber);
            setCurrentGameRoomState(payload.roomId);

            // 게임 UI 시작
            navigate('/game');
          });

          // 테스트 호출
          // testClientActions();
        },
        function (error) {
          console.error('WebSocket connection error:', error);
        }
      );
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

  const sendMessage = (destination, payload) => {
    const stompClient = stompClientRef.current;
    if (stompClient && stompClient.connected) {
      console.log('Sending message to:', destination);
      stompClient.send(destination, {}, JSON.stringify(payload));
    } else {
      console.error('WebSocket is not connected. Unable to send message.');
    }
  };

  const handleConfirm = (hostNickname, nickname, gameRoomId) => {
    const isAccepted = confirm(
      `${hostNickname}이 ${nickname}을 게임에 초대하였습니다. 함께하시겠습니까?`
    );
    if (isAccepted) {
      // 초대 수락
      sendMessage(`/ws/acceptInvite`, {
        roomId: gameRoomId,
        userNickname: nickname,
      });
      console.log(`${hostNickname}의 게임 초대를 수락하셨습니다.`);
      setCurrentGameState('ready');
    } else {
      // // 초대 거절
      // sendMessage(`/ws/rejectInvite`, {
      //   hostNickname,
      //   receiverNickname: nickname,
      //   status: 'REJECT',
      // });
      // console.log(`Rejected invite from ${hostNickname}`);
    }
  };

  return (
    <S.Container>
      <Sidebar />
      <S.MainContainer>
        <Header />
        <S.MainBody>
          {currentGameState === 'not-ready' && (
            <>
              <StartGame setCurrentGameState={setCurrentGameState} sendMessage={sendMessage} />
              <Ranking />
            </>
          )}
          {currentGameState === 'ready' && (
            <GameReady
              setCurrentGameState={setCurrentGameState}
              sendMessage={sendMessage}
              gameRoomId={currentGameRoomId}
              hostNickname={hostNickname}
              participantNicknameList={participantNicknameList}
            />
          )}
        </S.MainBody>
      </S.MainContainer>
    </S.Container>
  );
}

export default MainPage;
