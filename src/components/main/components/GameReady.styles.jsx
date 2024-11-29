import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary3};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  height: 100%;
  padding: 30px 40px;
  width: 100%;
`;

export const Logo = styled.img`
  width: 220px;
`;

export const Title = styled.p`
  font-size: 22px;
  font-weight: 600;
`;

export const Mention = styled.p`
  font-size: 16px;
`;

export const ReadyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;
`;

export const PlayerInviteContainer = styled.div`
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.colors.primary2};
  padding: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  flex-direction: column;
  box-shadow: 0px 0px 8px 0px rgba(79, 70, 229, 0.3);
`;

export const Content = styled.p`
  font-size: 14px;
`;

export const User = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colors.primary2};
  border-radius: 10px;
  div {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }
`;

export const Image = styled.img`
  width: 40px;
`;

export const Nickname = styled.p`
  font-size: 18px;
`;

export const Tag = styled.div`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.primary2};
  color: white;
  font-size: 10px;
  white-space: nowrap;
  border-radius: 5px;
`;
