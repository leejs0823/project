import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary3};
  height: 90%;
  overflow: hidden;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

export const ContentContainer = styled.div`
  justify-content: center;
  align-items: center;
  gap: 15px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 1330px) {
    grid-template-columns: repeat(3, 1fr); /* 화면이 작아지면 3개로 조정 */
  }

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr); /* 화면이 더 작아지면 2개로 조정 */
  }

  @media (max-width: 830px) {
    grid-template-columns: 1fr; /* 모바일 화면에서는 1개로 표시 */
  }
`;

export const RightArrowContainer = styled.div`
  position: absolute;
  p {
    color: ${({ theme }) => theme.colors.primary2};
    font-size: 16px;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  right: 40px;
  top: 40px;
  gap: 5px;
`;

export const LeftArrowContainer = styled.div`
  position: absolute;
  p {
    color: ${({ theme }) => theme.colors.primary2};
    font-size: 16px;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  left: 40px;
  top: 40px;
  gap: 5px;
`;

export const Icon = styled.img`
  width: 24px;
  cursor: pointer;
`;
