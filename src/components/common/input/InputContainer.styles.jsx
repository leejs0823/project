import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  padding: 20px 25px;
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
`;

export const Icon = styled.img`
  width: 20px;
`;

export const Input = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray5};
  font-size: 18px;
`;
