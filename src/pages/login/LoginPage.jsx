import React, { useState } from 'react';
import * as S from './LoginPage.styles';
import drawItLogo from '../../assets/images/DrawIt-logo.svg';
import InputContainer from '../../components/common/input/InputContainer';
import lockIcon from '../../assets/images/lock-icon.svg';
import emailIcon from '../../assets/images/mail-icon.svg';
import DrawIt3DImage from '../../assets/images/DrawIt-3D-image.png';
import SquareButton from '../../components/common/button/SquareButton';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../../api/user/user';

function LoginPage() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState();
  const [password, setPassword] = useState();
  const handleLogin = async e => {
    e.preventDefault(); // 새로고침 방지
    await loginAPI({ loginId, password });
    if (localStorage.getItem('accessToken')) {
      navigate('/main');
    } else {
      confirm('로그인 실패');
    }
  };
  return (
    <S.Container>
      <S.LeftSideContainer>
        <S.Logo src={drawItLogo} alt="logo" />
        <S.Image src={DrawIt3DImage} alt="image" />
        <S.Slogan>
          제시어를 정확하게
          <br />
          맞히세요!
        </S.Slogan>
        <S.Ment>
          유사도에 따른 포인트가 지급됩니다! <br />
          내가 그린 그림을 사람들이 얼마나 잘 맞힐까요?
          <br />
          {`\n`}Drawit을 통해 확인하세요!
        </S.Ment>
      </S.LeftSideContainer>

      <S.RightContainer>
        <S.Title>
          <S.Logo src={drawItLogo} alt="logo" />
          <p>회원 로그인</p>
        </S.Title>
        <S.LoginInputContainer onSubmit={handleLogin}>
          <InputContainer
            title="아이디"
            type="text"
            icon={emailIcon}
            value={loginId}
            onChange={e => setLoginId(e.target.value)}
          />
          <InputContainer
            title="비밀번호"
            type="password"
            icon={lockIcon}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <SquareButton title="로그인" type="submit" />
        </S.LoginInputContainer>
        <S.RouteSignup>
          <p>아직 회원이 아니신가요?</p>
          <p onClick={() => navigate('/sign-up')} style={{ fontWeight: '600', cursor: 'pointer' }}>
            회원가입
          </p>
        </S.RouteSignup>
      </S.RightContainer>
    </S.Container>
  );
}

export default LoginPage;
