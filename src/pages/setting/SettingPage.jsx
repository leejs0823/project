import React, { useState } from 'react';
import * as S from './SettingPage.styles';
import Sidebar from '../../components/common/sidebar/Sidebar';
import Header from '../../components/common/header/Header';
import defaultImage from '../../assets/images/default-profile.svg';
import { myNicknameState } from '../../recoil/user';
import { useRecoilValue } from 'recoil';
import SquareButton from '../../components/common/button/SquareButton';
import { useUserHook } from '../../api/user/user';
import { useNavigate } from 'react-router-dom';

function SettingPage() {
  const navigate = useNavigate();
  const myNickname = useRecoilValue(myNicknameState);
  const [modifyNickname, setModifyNickname] = useState(myNickname);
  const { updateNicknameAPI } = useUserHook();

  const handleUpdate = async e => {
    e.preventDefault(); // 새로고침 방지
    await updateNicknameAPI(modifyNickname);
    confirm('수정 완료!');
    navigate('/main');
  };

  return (
    <S.Container>
      <Sidebar />
      <S.MainContainer>
        <Header />
        <S.MainBody>
          <S.ProfileContainer>
            <S.Title>
              <h1>프로필 수정하기</h1>
              <p>프로필 닉네임을 수정할 수 있습니다!</p>
            </S.Title>
            <S.Image src={defaultImage} alt="image" />
            <S.FormContainer onSubmit={handleUpdate}>
              <S.Input
                type="text"
                value={modifyNickname}
                onChange={e => setModifyNickname(e.target.value)}
                placeholder="닉네임"
              />
              <SquareButton type="submit" title="수정하기" />
            </S.FormContainer>
          </S.ProfileContainer>
        </S.MainBody>
      </S.MainContainer>
    </S.Container>
  );
}

export default SettingPage;
