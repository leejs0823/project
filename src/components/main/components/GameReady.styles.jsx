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
  position: relative;
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
  align-items: stretch;
  height: auto;
  height: 100%;
`;

export const InviteContainer = styled.div`
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.colors.primary2};
  padding: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  flex-direction: column;
  box-shadow: 0px 0px 8px 0px rgba(79, 70, 229, 0.3);
  height: 85%;
  overflow-y: auto;
`;

export const PlayerContainer = styled.div`
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.colors.primary2};
  padding: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  flex-direction: column;
  box-shadow: 0px 0px 8px 0px rgba(79, 70, 229, 0.3);
  height: 85%;
  overflow-y: hidden;
`;

export const Content = styled.p`
  font-size: 14px;
`;

export const UserContainer = styled.div`
  display: grid;
  width: 100%;
  gap: 5px;
  grid-template-columns: 1fr; /* 3 열 */
  grid-template-rows: repeat(4, 1fr); /* 2 행 */
`;

export const InviteUserContainer = styled.div`
  height: 100%;
  display: grid;
  width: 100%;
  gap: 5px;
  grid-template-columns: 1fr; /* 3 열 */
  grid-template-rows: repeat(4, 1fr); /* 2 행 */
  overflow-y: auto;
`;

export const User = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
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

export const MemberTag = styled.div`
  padding: 5px 10px;
  background-color: white;
  color: ${({ theme }) => theme.colors.primary2};
  font-size: 10px;
  white-space: nowrap;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary2};
`;

export const StartButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary2};
  color: white;
  font-weight: 600;
  padding: 15px 30px;
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  bottom: 20px;
`;
