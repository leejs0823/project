import React, { useState } from 'react';
import * as S from './Sidebar.styles';
import DrawItLogo from '../../../assets/images/DrawIt-logo.svg';
import communityIcon from '../../../assets/images/community-icon.svg';
import storeIcon from '../../../assets/images/store-icon.svg';
import friendIcon from '../../../assets/images/friend-icon.svg';
import reductionIcon from '../../../assets/images/reduction-icon.svg';
import homeIcon from '../../../assets/images/home-icon.svg';
import settingIcon from '../../../assets/images/setting-icon.svg';
import logoutIcon from '../../../assets/images/logout-icon.svg';
import { useRecoilState } from 'recoil';
import { currentMenuState } from '../../../recoil/menu';

function Sidebar() {
  const [currentMenu, setCurrentMenu] = useRecoilState(currentMenuState);
  const logout = () => {
    console.log('logout');
  };

  const handleMenuClick = name => {
    console.log(name);
    setCurrentMenu(name);
  };

  return (
    <S.Container>
      <S.Logo src={DrawItLogo} />
      <S.SidebarContainer>
        <S.ButtonContainer
          isActive={currentMenu === 'home' ? true : false}
          onClick={() => handleMenuClick('home')}
        >
          <S.Icon src={homeIcon} alt="home" />
          <S.MenuText>홈</S.MenuText>
        </S.ButtonContainer>
        <S.ButtonContainer
          isActive={currentMenu === 'community' ? true : false}
          onClick={() => handleMenuClick('community')}
        >
          <S.Icon src={communityIcon} alt="community" />
          <S.MenuText>게시판</S.MenuText>
        </S.ButtonContainer>
        <S.ButtonContainer
          isActive={currentMenu === 'friend' ? true : false}
          onClick={() => handleMenuClick('friend')}
        >
          <S.Icon src={friendIcon} alt="friend" />
          <S.MenuText>친구</S.MenuText>
        </S.ButtonContainer>
        <S.ButtonContainer
          isActive={currentMenu === 'store' ? true : false}
          onClick={() => handleMenuClick('store')}
        >
          <S.Icon src={storeIcon} alt="store" />
          <S.MenuText>상점</S.MenuText>
        </S.ButtonContainer>
      </S.SidebarContainer>
      <S.BottomContainer>
        <S.SettingLogoutButton>
          <S.Icon src={settingIcon} alt="setting" />
          <S.SettingText>설정</S.SettingText>
        </S.SettingLogoutButton>
        <S.SettingLogoutButton>
          <S.Icon src={logoutIcon} alt="setting" />
          <S.LogoutText onClick={logout}>로그아웃</S.LogoutText>
        </S.SettingLogoutButton>
      </S.BottomContainer>
    </S.Container>
  );
}
export default Sidebar;
