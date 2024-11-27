import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  display: flex;
  flex-direction: row;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 28px;
    font-weight: 500;
  }
`;

export const Logo = styled.img`
  width: 260px;
`;

export const LoginInputContainer = styled.form`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const LeftSideContainer = styled.div`
  height: 100%;
  left: 0;
  width: 30%;
  background-color: ${({ theme }) => theme.colors.primary1};
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  min-width: 350px;
  padding: 10px;
`;

export const RightContainer = styled.div`
  height: 100%;
  width: 70%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  justify-content: center;
`;

export const Image = styled.img`
  width: 100%;
`;

export const Slogan = styled.p`
  font-size: 40px;
  font-weight: 600;
  color: white;
  text-align: center;
  line-height: 50px;
`;

export const Ment = styled.p`
  color: ${({ theme }) => theme.colors.gray1};
  font-size: 16px;
  text-align: center;
  line-height: 20px;
`;
