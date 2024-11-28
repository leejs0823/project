import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
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
  overflow: hidden;
  height: calc(90%);
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

export const Button = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0px 0px 5px 0px rgba(79, 70, 229, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary3};
  }
`;

export const Icon = styled.img`
  width: 20px;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  right: 40px;
`;

export const BackButton = styled.div`
  position: absolute;
  left: 40px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  p {
    color: ${({ theme }) => theme.colors.primary2};
    font-size: 16px;
  }
`;

export const BackIcon = styled.img`
  width: 24px;
  cursor: pointer;
`;

export const FriendList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 5px 10px;
  gap: 10px;
  overflow-y: auto; /* 세로 스크롤 활성화 */
  height: 100%;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 10px 15px;
  border-radius: 50px;
  width: 70%;
  box-shadow: 0px 0px 5px 0px rgba(79, 70, 229, 0.2);
  gap: 10px;
  img {
    width: 20px;
    cursor: pointer;
  }
  input {
    width: 100%;
    color: ${({ theme }) => theme.colors.primary2};
    font-size: 17px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 90%;
`;

export const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 5px 10px;
  gap: 10px;
  overflow-y: auto; /* 세로 스크롤 활성화 */
  flex: 1; /* 남은 공간을 차지하도록 설정 */
`;
