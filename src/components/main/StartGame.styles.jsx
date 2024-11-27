import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary3};
  flex: 6;
  border-radius: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 100%;
`;

export const Logo = styled.img`
  width: 260px;
`;

export const Title = styled.p`
  font-size: 30px;
  font-weight: 600;
`;

export const Mention = styled.p`
  font-size: 16px;
`;

export const CreateGameButton = styled.div`
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary2};
  color: white;
  font-weight: 600;
  padding: 15px 30px;
`;
