import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.primary3 : 'white')};
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const Rank = styled.p`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  flex: 2;
`;

export const ProfileImage = styled.img`
  width: 40px;
`;

export const NameAndButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  flex: 6;
`;
export const UserName = styled.p`
  font-size: 16px;
  font-weight: 500;
`;
export const Button = styled.div`
  background-color: ${({ theme }) => theme.colors.primary2};
  padding: 5px 10px;
  border-radius: 50px;
  white-space: nowrap;
  font-size: 10px;
  color: white;
  cursor: pointer;
`;

export const Point = styled.p`
  font-size: 12px;
  font-weight: 600;
  flex: 2;
`;
