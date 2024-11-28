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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
  overflow-y: auto;
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
