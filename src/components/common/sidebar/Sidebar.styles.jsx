import styled from 'styled-components';

export const Container = styled.div`
  width: 300px;
  background-color: ${({ theme }) => theme.colors.primary1};
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  gap: 30px;
`;

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

export const Logo = styled.img`
  width: 200px;
`;

export const Icon = styled.img`
  width: 20px;
`;

export const MenuText = styled.p`
  font-size: 16px;
  color: white;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  background-color: ${({ isActive, theme }) =>
    isActive === true ? theme.colors.primary2 : theme.colors.primary1};
  width: 100%;
  padding: 13px 20px;
  border-radius: 50px;
  align-items: center;
  cursor: pointer;
`;

export const BottomContainer = styled.div`
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  width: 100%;
`;

export const SettingLogoutButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
  padding: 13px 20px;
  border-radius: 50px;
  align-items: center;
  cursor: pointer;
`;

export const SettingText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.silber};
`;
export const LogoutText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.red};
`;
