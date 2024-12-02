import React, { useRef, useEffect, useState } from 'react';
import * as S from './GamePage.styles';
import logo from '../../assets/images/DrawIt-logo.svg';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useUserHook } from '../../api/user/user';
import {
  correctWordDataState,
  currentGameRoomState,
  drawerNicknameState,
  roundNumberState,
} from '../../recoil/game';
import { useRecoilState } from 'recoil';

function GamePage() {
  const { sendImageAPI, downloadImageAPI } = useUserHook();
  const [correctWordData, setCorrectWordData] = useRecoilState(correctWordDataState);
  const [currentGameRoom, setCurrectGameRoom] = useRecoilState(currentGameRoomState);
  const [drawerNickname, setDrawerNickname] = useRecoilState(drawerNicknameState);
  const [roundNumber, setRoundNumber] = useRecoilState(roundNumberState);
  const [guessWord, setGuessWord] = useState('');
  const canvasRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(20); // 제한시간 20초
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000'); // 선택된 컬러
  const [lineWidth, setLineWidth] = useState(5);
  const contextRef = useRef(null); // 캔버스 context 저장
  const stompClientRef = useRef(null);
  const nickname = localStorage.getItem('nickname');
  const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_URL;
  const [currentFileName, setCurrentFileName] = useState(null);
  // const [downloadedImage, setDownloadedImage] = useState(null); // 다운로드된 이미지 상태 추가

  useEffect(() => {
    const connect = () => {
      const socket = new SockJS(`${BASE_URL}/ws`);
      const client = Stomp.over(socket);
      stompClientRef.current = client;
      client.connect(
        {},
        () => {
          console.log('Connected to WebSocket');

          // 게임 시작 알림
          client.subscribe(`/game/gameStart/${nickname}`, message => {
            const data = JSON.parse(message.body);
            console.log('Game started:');
            setTimeLeft(20); // 제한시간 초기화
            setCorrectWordData(data.correctWord);
            setRoundNumber(data.roundNumber);
            setDrawerNickname(data.drawerNickname);
            setCurrectGameRoom(data.roomId);
            console.log(data.roomId);
          });

          // 이미지 수신
          client.subscribe(`/game/getPicture/${nickname}`, message => {
            const data = JSON.parse(message.body);
            console.log('Image received:');
            console.log(`Room ID: ${data.roomId}`);
            console.log(`Image Data:`, data.image);
            // 바이너리 데이터를 Blob으로 변환
            const blob = new Blob([new Uint8Array(data.image)], { type: 'image/png' });
            const url = URL.createObjectURL(blob);

            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const img = new Image();
            img.src = url;

            img.onload = () => {
              context.clearRect(0, 0, canvas.width, canvas.height); // 기존 캔버스 초기화
              context.drawImage(img, 0, 0, canvas.width, canvas.height); // 새로운 이미지 그리기
              URL.revokeObjectURL(url); // 메모리 누수 방지를 위해 URL 해제
            };
            console.log('Binary image received and rendered');
          });

          // 단어 추측 결과
          client.subscribe(`/game/guessResult/${nickname}`, message => {
            const data = JSON.parse(message.body);
            console.log('Guess result:');
            console.log(`Guessed Word: ${data.guessedWord}`);
            console.log(`Similarity: ${data.similarity}`);
            // displayGuessResult(data);
          });

          // 라운드 종료
          client.subscribe(`/game/endRound/${nickname}`, message => {
            const data = JSON.parse(message.body);
            console.log('Round ended:');
            console.log(`Game Room ID: ${data.gameRoomId}`);
            console.log(`Game Round ID: ${data.gameRoundId}`);
            console.log(`Image Path: ${data.imagePath}`);
            console.log('Results:', data.result);
            // displayRoundResult(data);
          });

          // 다음 라운드 시작
          client.subscribe(`/game/gameNextRound/${nickname}`, message => {
            const data = JSON.parse(message.body);
            console.log('Next round started:');
            console.log(`Room ID: ${data.roomId}`);
            console.log(`Round Number: ${data.roundNumber}`);
            console.log(`Drawer Nickname: ${data.drawerNickname}`);
            console.log(`Correct Word: ${data.correctWord}`);
            // displayNextRound(data);
          });

          // 게임 종료
          client.subscribe(`/queue/endGame/${nickname}`, message => {
            const data = JSON.parse(message.body);
            console.log('Game ended:');
            console.log('Final Results:', data);
            Object.entries(data).forEach(([key, value]) => {
              console.log(`${key}:`, value);
            });
            // displayGameEnd(data);
          });

          client.subscribe(`/game/getImageURL/${nickname}`, message => {
            const data = JSON.parse(message.body);
            console.log('Game ended:');
            console.log('Final Results:', data.roomId);
            console.log('Final Results:', data.imageURL);
            setCurrentFileName(data.imageURL);
          });
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
  }, [currentGameRoom, nickname, drawerNickname]);

  useEffect(() => {
    // 타이머 감소 로직
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      console.log('Time is up!');
      // 제한시간 종료 후 처리 로직
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && drawerNickname !== nickname) {
      // 제한 시간 종료 시 추측어 전송
      sendMessage(`/ws/guessWord`, {
        userNickname: nickname,
        roundId: roundNumber,
        guessedWord: guessWord || '', // 추측어 입력이 없으면 빈 문자열 전송
      });
      console.log('Guess submitted:', guessWord);
    }
  }, [timeLeft, roundNumber, drawerNickname, nickname, currentGameRoom, guessWord]);

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
    const canvas = canvasRef.current;
    const fixedWidth = 1280;
    const fixedHeight = 720;
    canvas.width = fixedWidth;
    canvas.height = fixedHeight;

    const context = canvas.getContext('2d');
    contextRef.current = context;
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.strokeStyle = color;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.lineWidth = lineWidth; // 선 굵기 업데이트
    }
  }, [lineWidth]);

  // 색상이 변경될 때마다 strokeStyle 업데이트
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.strokeStyle = color;
  }, [color]);

  // 슬라이더 값으로 선 두께 설정
  const handleLineWidthChange = e => {
    setLineWidth(e.target.value);
  };

  const getMousePosition = e => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) * canvas.width) / rect.width,
      y: ((e.clientY - rect.top) * canvas.height) / rect.height,
    };
  };

  const startDrawing = e => {
    if (nickname !== drawerNickname) return; // 권한 체크
    const context = canvasRef.current.getContext('2d');
    const { x, y } = getMousePosition(e);

    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = e => {
    if (!isDrawing || nickname !== drawerNickname) return; // 권한 체크

    const context = canvasRef.current.getContext('2d');
    const { x, y } = getMousePosition(e);

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (nickname !== drawerNickname) return; // 권한 체크
    setIsDrawing(false);
  };

  const handleColorChange = selectedColor => {
    setColor(selectedColor);
  };

  const clearCanvas = () => {
    if (nickname !== drawerNickname) return; // 권한 체크
    if (contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    } else {
      console.error('Canvas or context is not initialized');
    }
  };

  useEffect(() => {
    let timeoutId;
    const sendImagePeriodically = async () => {
      if (timeLeft > 0 && nickname === drawerNickname) {
        const canvas = canvasRef.current;

        if (!canvas) {
          console.error('Canvas is not initialized.');
          return;
        }

        canvas.toBlob(blob => {
          if (blob) {
            console.log(blob);
            const formData = new FormData();

            formData.append('multipartFile', blob, 'image.png');

            console.log(formData);
            const File = formData.get('multipartFile');
            console.log(File);
            const response = sendImageAPI({
              gameRoomId: currentGameRoom,
              gameRoundId: roundNumber,
              multipartFile: File,
              drawerNickname: drawerNickname,
            });
            setCurrentFileName(response);
            console.log(response);
          }
        }, 'image/png');

        // 다음 호출 예약
        timeoutId = setTimeout(sendImagePeriodically, 3000);
      }
    };
    // 초기 호출
    sendImagePeriodically();
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line
  }, [nickname, roundNumber, drawerNickname, currentGameRoom]);

  useEffect(() => {
    const downloadImage = async () => {
      if (nickname !== drawerNickname && currentFileName) {
        try {
          const response = await downloadImageAPI(currentFileName);
          const blob = new Blob([response], { type: 'image/png' });
          const url = URL.createObjectURL(blob);

          const img = new Image();
          img.src = url;

          img.onload = () => {
            console.log('Image loaded successfully');
            const canvas = canvasRef.current;
            if (canvas) {
              const context = canvas.getContext('2d');
              canvas.width = img.width;
              canvas.height = img.height;
              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(img, 0, 0, img.width, img.height);
              URL.revokeObjectURL(url);
            }
          };

          img.onerror = () => {
            console.error('Error loading image:', url);
          };
        } catch (error) {
          console.error('Error downloading image:', error);
        }
      }
    };

    downloadImage();
    // eslint-disable-next-line
  }, [drawerNickname, nickname, currentFileName]);

  const exportCanvasData = () => {
    if (nickname !== drawerNickname) return; // 권한 체크
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      console.log('Exported Data URL:', dataURL);
    } else {
      console.error('Canvas is not initialized');
    }
  };

  return (
    <S.Container>
      <S.GameContainer>
        <S.Timer>
          제한 시간 <br /> {timeLeft}
        </S.Timer>
        <S.RoundNumberContent>
          <S.RoundNumber>Round {roundNumber}</S.RoundNumber>

          {drawerNickname === nickname ? (
            <S.Drawer>Drawer : {drawerNickname}(me)</S.Drawer>
          ) : (
            <S.Drawer>Drawer : {drawerNickname}</S.Drawer>
          )}
        </S.RoundNumberContent>
        <S.Image src={logo} alt="logo" />
        <S.SketchbookContainer>
          <S.Sidebar>
            <S.ColorContainer>
              <S.ToolLabel>색상</S.ToolLabel>
              <S.ColorPalette>
                {Object.keys(S.COLORS).map(colorKey => (
                  <S.ColorChip
                    key={colorKey}
                    color={S.COLORS[colorKey]}
                    isSelected={color === S.COLORS[colorKey]}
                    onClick={() => handleColorChange(S.COLORS[colorKey])}
                  />
                ))}
              </S.ColorPalette>
            </S.ColorContainer>
            <S.ToolContainer>
              <S.ToolLabel>선 굵기</S.ToolLabel>
              <S.LineWidthSlider
                type="range"
                min="1"
                max="30"
                value={lineWidth}
                onChange={handleLineWidthChange}
              />
              <S.LineWidthValue>{lineWidth}px</S.LineWidthValue>
            </S.ToolContainer>
          </S.Sidebar>
          <S.Sketchbook>
            <S.Word>
              {nickname === drawerNickname ? `제시어: ${correctWordData}` : '그림을 맞춰보세요!'}
            </S.Word>

            <S.Canvas
              ref={canvasRef}
              onMouseDown={nickname === drawerNickname ? startDrawing : undefined}
              onMouseMove={nickname === drawerNickname ? draw : undefined}
              onMouseUp={nickname === drawerNickname ? stopDrawing : undefined}
              onMouseLeave={nickname === drawerNickname ? stopDrawing : undefined}
            />
          </S.Sketchbook>
          <S.ButtonContainer>
            {nickname === drawerNickname ? (
              <>
                <S.ResetButton onClick={clearCanvas}>초기화</S.ResetButton>
                <S.CompleteButton onClick={exportCanvasData}>완료</S.CompleteButton>
              </>
            ) : (
              <>
                <S.Input
                  type="text"
                  placeholder="정답을 입력하세요"
                  value={guessWord}
                  z
                  onChange={e => setGuessWord(e.target.value)}
                />
                <S.CompleteButton
                  onClick={() =>
                    sendMessage(`/ws/guessWord`, {
                      userNickname: nickname,
                      roundId: roundNumber,
                      guessedWord: guessWord || '',
                    })
                  }
                >
                  작성 완료
                </S.CompleteButton>
              </>
            )}
          </S.ButtonContainer>
        </S.SketchbookContainer>
      </S.GameContainer>
    </S.Container>
  );
}

export default GamePage;
