import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 15px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Welcome = styled.p`
  font-size: 20px;
`;

export const CurrentPoint = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

export const SideContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const ProfileImage = styled.img`
  width: 40px;
`;
