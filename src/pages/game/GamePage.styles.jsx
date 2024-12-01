import styled from 'styled-components';

export const COLORS = {
  red: '#F23D3D',
  pink: '#F05196',
  orange: '#F97316',
  violet: '#A851F0',
  yellow: '#FBAA00',
  black: '#000000',
  green: '#11D874',
  gray: '#878787',
  blue: '#3E72F7',
  white: '#FFFFFF',
};

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary1};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GameContainer = styled.div`
  width: 80%;
  height: 80%;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.primary3};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
  position: relative;
`;

export const Image = styled.img`
  width: 200px;
`;

export const SketchbookContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Sidebar = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  left: 0;
  gap: 30px;
  padding: 10px;
`;

export const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2개의 컬럼 */
  grid-template-rows: repeat(5, auto); /* 5줄 */
  flex-direction: column;
  gap: 10px;
  align-items: center;
  background-color: rgba(79, 70, 229, 0.2);
  padding: 10px;
  border-radius: 10px;
`;

export const ColorChip = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${({ color }) => color};
  border-radius: 2px;
  cursor: pointer;
  border: ${({ isSelected }) => (isSelected ? '2px solid black' : 'none')};
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

export const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ToolContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ToolLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

export const LineWidthSlider = styled.input`
  width: 80px;
  cursor: pointer;
  background-color: white;
  border-radius: 50px;
  appearance: none;
  height: 12px;
`;

export const LineWidthValue = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

export const Sketchbook = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 4px 10px 0px #9e9e9e;
  border-radius: 5px;
`;

export const Word = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primary2};
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

export const Canvas = styled.canvas`
  width: 100%;
  aspect-ratio: 5 / 2; /* 비율 유지 */
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: white;
  touch-action: none;
  /* 캔버스 해상도를 높게 유지 */
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

export const ResetButton = styled.button`
  display: inline-flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.colors.primary2};
  background: white;
  color: ${({ theme }) => theme.colors.primary2};
  font-weight: 500;
  font-size: 16px;
`;
export const CompleteButton = styled.button`
  display: inline-flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary2};
  border: 1.5px solid ${({ theme }) => theme.colors.primary2};
  color: white;
  font-weight: 500;
  font-size: 16px;
`;

export const ExportButton = styled.button`
  display: inline-flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary2};
  border: 1.5px solid ${({ theme }) => theme.colors.primary2};
  color: white;
  font-weight: 500;
  font-size: 16px;
`;
