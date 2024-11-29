import styled from 'styled-components';

export const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MainBody = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 30px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  h1 {
    font-size: 30px;
    font-weight: 600;
  }
  p {
    font-size: 18px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const ProfileContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

export const Image = styled.img`
  width: 100px;
`;

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  font-size: 20px;
  padding: 5px;
  width: 100%;
  text-align: center;
`;
