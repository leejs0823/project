import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 4px 5px 0px rgba(79, 70, 229, 0.2);
  cursor: pointer;
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const ProfileImage = styled.img`
  width: 30px;
`;

export const UserName = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

export const Date = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray4};
`;

export const Content = styled.p`
  font-size: 18px;
`;

export const DrawImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: gray;
`;
