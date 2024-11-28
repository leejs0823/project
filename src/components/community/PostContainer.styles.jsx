import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.primary3};
  height: 100%;
  overflow: scroll;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Logo = styled.img`
  width: 200px;
`;

export const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

export const PostList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
