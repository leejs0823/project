import styled from 'styled-components';

export const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  box-shadow: 0px 0px 5px 0px rgba(79, 70, 229, 0.2);
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 30px;
`;

export const Nickname = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme, color }) => (color ? theme.colors[color] : 'black')};
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const Point = styled.p`
  font-size: 16px;
  font-weight: 500;
`;
