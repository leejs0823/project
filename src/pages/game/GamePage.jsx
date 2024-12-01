import React, { useRef, useEffect, useState } from 'react';
import * as S from './GamePage.styles';
import logo from '../../assets/images/DrawIt-logo.svg';

function GamePage() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000'); // 선택된 컬러
  const [lineWidth, setLineWidth] = useState(5);
  const contextRef = useRef(null); // 캔버스 context 저장

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
    const context = canvasRef.current.getContext('2d');
    const { x, y } = getMousePosition(e);

    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = e => {
    if (!isDrawing) return;

    const context = canvasRef.current.getContext('2d');
    const { x, y } = getMousePosition(e);

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleColorChange = selectedColor => {
    setColor(selectedColor);
  };

  const clearCanvas = () => {
    if (contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    } else {
      console.error('Canvas or context is not initialized');
    }
  };

  const exportCanvasData = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Data URL 출력 (Base64 인코딩된 이미지 데이터)
      const dataURL = canvas.toDataURL('image/png');
      const byteString = atob(dataURL.split(',')[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([uint8Array], { type: 'image/png' });

      console.log('Binary Data:', uint8Array); // 바이너리 데이터 출력
    } else {
      console.error('Canvas is not initialized');
    }
  };

  return (
    <S.Container>
      <S.GameContainer>
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
            <S.Word>제시어 : 바보</S.Word>
            <S.Canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </S.Sketchbook>
          <S.ButtonContainer>
            <S.ResetButton onClick={clearCanvas}>초기화</S.ResetButton>
            <S.CompleteButton>완료</S.CompleteButton>
            <S.ExportButton onClick={exportCanvasData}>데이터 추출</S.ExportButton>
          </S.ButtonContainer>
        </S.SketchbookContainer>
      </S.GameContainer>
    </S.Container>
  );
}

export default GamePage;
