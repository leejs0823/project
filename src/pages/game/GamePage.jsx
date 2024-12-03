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
  currentGameRoundIdState,
} from '../../recoil/game';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

function GamePage() {
  const navigate = useNavigate();
  const [gameResults, setGameResults] = useState([]);
  const [bestGuess, setBestGuess] = useState({ similarity: 0, guessedWord: '' });
  const { sendImageAPI, endRoundAPI } = useUserHook();
  const [currentGameRoundId, setCurrentGameRoundId] = useRecoilState(currentGameRoundIdState);
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
  const [, setCurrentSendFile] = useState();

  const nickname = localStorage.getItem('nickname');
  const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_URL;
  const [currentFileName, setCurrentFileName] = useState(null);
  const [, setDownloadedImage] = useState(null); // 다운로드된 이미지 상태 추가

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
            setCurrentGameRoundId(data.roundId);
            console.log(data.roomId);
            console.log('roundId:dsosijfoiwjfoi', data.roundId);
          });

          // 단어 추측 결과
          client.subscribe(`/game/guessResult/${nickname}`, message => {
            const data = JSON.parse(message.body);
            console.log('Guess result:');
            console.log(`Guessed Word: ${data.guessedWord}`);
            console.log(`Similarity: ${data.similarity}`);

            if (data.similarity === -1) {
              confirm('해당 단어가 존재하지 않습니다');
              return;
            }

            // 기존 유사도와 비교하여 더 큰 유사도를 가진 단어를 저장
            setBestGuess({
              similarity: Math.floor(data.similarity * 100),
              guessedWord: data.guessedWord,
            });
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
            console.log(`Round Id: ${data.roundId}`);
            setTimeLeft(20); // 제한시간 초기화
            setCorrectWordData(data.correctWord);
            setRoundNumber(data.roundNumber);
            setDrawerNickname(data.drawerNickname);
            setCurrectGameRoom(data.roomId);
            setCurrentGameRoundId(data.roundId);
          });

          // 게임 종료
          client.subscribe(`/game/endGame/${nickname}`, message => {
            const data = JSON.parse(message.body);
            // `roundResults`만 저장
            if (data.gameResults) {
              setGameResults(data.gameResults);
            } else {
              setGameResults([]); // 기본값 설정
            }
            console.log(gameResults);
          });

          client.subscribe(`/game/getImageURL/${nickname}`, message => {
            const data = JSON.parse(message.body);
            console.log('Game ended:');
            console.log('Final Results:', data.roomId);
            console.log('Final Results:', data.imageURL);

            const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_URL;
            const url = `${BASE_URL}/downloadImage/${data.imageURL}`;
            setCurrentFileName(data.imageURL);
            setDownloadedImage(url);
            console.log(data.imageURL);
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
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Clean up the timer
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && drawerNickname !== nickname) {
      // 제한 시간 종료 시 추측어 전송
      console.log('이거 중요', currentGameRoundId);
      sendMessage(`/ws/guessWord`, {
        userNickname: nickname,
        roundId: currentGameRoundId,
        guessedWord: guessWord || '', // 추측어 입력이 없으면 빈 문자열 전송
        roomId: currentGameRoom,
      });
      console.log('Guess submitted:', guessWord);
    }
    // eslint-disable-next-line
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
    if (nickname !== drawerNickname || timeLeft === 0) return; // 권한 체크
    const context = canvasRef.current.getContext('2d');
    const { x, y } = getMousePosition(e);

    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = e => {
    if (!isDrawing || nickname !== drawerNickname || timeLeft === 0) return; // 권한 체크

    const context = canvasRef.current.getContext('2d');
    const { x, y } = getMousePosition(e);

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (nickname !== drawerNickname || timeLeft === 0) return; // 권한 체크
    setIsDrawing(false);
  };

  const handleColorChange = selectedColor => {
    setColor(selectedColor);
  };

  const clearCanvas = () => {
    if (nickname !== drawerNickname || timeLeft === 0) return; // 권한 체크
    if (contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    } else {
      console.error('Canvas or context is not initialized');
    }
  };
  useEffect(() => {
    let intervalId;
    let executionCount = 0; // 실행 횟수를 관리하는 변수

    const sendImagePeriodically = async () => {
      if (nickname !== drawerNickname) {
        console.log('Not the drawer, skipping canvas operations.');
        return;
      }
      if (executionCount >= 10) {
        // 10번 실행 후 멈춤
        console.log('Reached maximum execution count. Stopping periodic execution.');
        clearInterval(intervalId);
        return;
      }

      if (timeLeft > 0 && nickname === drawerNickname) {
        const canvas = canvasRef.current;

        if (!canvas) {
          console.error('Canvas is not initialized.');
          return;
        }

        canvas.toBlob(blob => {
          if (blob) {
            const formData = new FormData();
            formData.crossOrigin = 'Anonymous';
            formData.append('multipartFile', blob, 'image.png');
            const File = formData.get('multipartFile');
            setCurrentSendFile(File);

            const response = sendImageAPI({
              gameRoomId: currentGameRoom,
              gameRoundId: roundNumber,
              multipartFile: File,
              drawerNickname: drawerNickname,
            });
            setCurrentFileName(response);
          }
        }, 'image/png');

        executionCount++; // 실행 횟수 증가
        console.log(`Execution count: ${executionCount}`);
      }
    };

    if (nickname === drawerNickname && timeLeft > 0) {
      intervalId = setInterval(sendImagePeriodically, 2000);
    }

    // Clear interval when timeLeft becomes 0 or on component unmount
    if (timeLeft === 0) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };

    // eslint-disable-next-line
  }, [nickname, roundNumber, drawerNickname, currentGameRoom]);

  useEffect(() => {
    const endRoundAndNextRoundAsync = async () => {
      if (timeLeft === 0 && nickname === drawerNickname) {
        const canvas = canvasRef.current;

        if (!canvas) {
          console.error('Canvas is not initialized.');
          return;
        }

        canvas.toBlob(blob => {
          if (blob) {
            const formData = new FormData();
            formData.crossOrigin = 'Anonymous';
            formData.append('multipartFile', blob, 'image.png');
            const File = formData.get('multipartFile');
            console.log('sdfedfg', currentGameRoundId);
            endRoundAPI({
              gameRoomId: currentGameRoom,
              gameRoundId: currentGameRoundId,
              multipartFile: File,
              drawerNickname: drawerNickname,
            });

            // 캔버스 초기화
            const context = contextRef.current;
            if (context) {
              context.clearRect(0, 0, canvas.width, canvas.height);
              console.log('Canvas cleared successfully.');
            }

            sendMessage('/ws/endGame', {
              gameRoomId: currentGameRoom,
            });
          }
        }, 'image/png');
      }
    };

    endRoundAndNextRoundAsync();
    // eslint-disable-next-line
  }, [timeLeft, nickname, drawerNickname, currentGameRoom, currentGameRoundId]);

  useEffect(() => {
    const downloadImage = async () => {
      if (nickname !== drawerNickname && currentFileName) {
        try {
          const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_URL;
          const url = `${BASE_URL}/downloadImage/${currentFileName}`;
          const img = new Image();
          img.src = url;

          img.onload = () => {
            console.log('Image loaded successfully');
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, img.width, img.height);
            window.URL.revokeObjectURL(url);
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
              {nickname === drawerNickname ? (
                `제시어: ${correctWordData}`
              ) : bestGuess ? (
                <S.Similarity>
                  {bestGuess.guessedWord} | 유사도 : {bestGuess.similarity}%
                </S.Similarity>
              ) : (
                '그림을 맞혀보세요!'
              )}
            </S.Word>

            <S.Canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </S.Sketchbook>
          <S.ButtonContainer>
            {nickname === drawerNickname ? (
              <>
                <S.ResetButton onClick={clearCanvas}>초기화</S.ResetButton>
              </>
            ) : (
              <>
                <S.Input
                  type="text"
                  placeholder="정답을 입력하세요"
                  value={guessWord}
                  onChange={e => setGuessWord(e.target.value)}
                />
                <S.CompleteButton
                  onClick={() =>
                    sendMessage(`/ws/guessWord`, {
                      userNickname: nickname,
                      roundId: currentGameRoundId,
                      guessedWord: guessWord || '',
                      roomId: currentGameRoom,
                    })
                  }
                >
                  맞히기
                </S.CompleteButton>
              </>
            )}
          </S.ButtonContainer>
        </S.SketchbookContainer>
      </S.GameContainer>
      {Array.isArray(gameResults) &&
        gameResults.length > 0 &&
        gameResults.map((round, index) => (
          <S.Popup key={index}>
            <h1>게임 결과</h1>
            <span>
              <p>그림 그린 사람 : </p>
              <S.DrawerName color={round.drawerNicknameColor}>{round.drawerNickname}</S.DrawerName>
            </span>

            <p>정답 : {correctWordData}</p>
            <div>
              <h3>참가자들은 {correctWordData}를 얼마나 많이 맞혔을까요~?</h3>
              <ul>
                {Object.entries(round.participantResults).map(([participant, result], idx) => (
                  <li key={idx}>
                    <S.ParticipantName color={result.nicknameColor}>
                      {' '}
                      {participant}
                    </S.ParticipantName>
                    <p>추측어: {result.guessedWord} </p>
                    <p>유사도: {(result.similarity * 100).toFixed(0)}% </p>
                  </li>
                ))}
              </ul>
            </div>

            <S.Button onClick={() => navigate('/main')}>메인으로</S.Button>
          </S.Popup>
        ))}
    </S.Container>
  );
}

export default GamePage;
