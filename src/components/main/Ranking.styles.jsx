import styled from 'styled-components';

export const Container = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;
`;

export const SwitchButton = styled.div`
  border-radius: 20px;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary3 : theme.colors.gray3};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.primary2 : theme.colors.gray5)};
  cursor: pointer;
  padding: 12px 24px;
  white-space: nowrap;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

export const RankUserPoint = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 25px;
  width: 100%;
  p {
    color: ${({ theme }) => theme.colors.primary2};
  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 65%;
  overflow-y: auto;
`;

export const Title = styled.p`
  font-size: 30px;
  font-weight: 800;
  font-family: 'Poppins';
`;
