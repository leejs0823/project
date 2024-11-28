import React, { useState } from 'react';
import * as S from './SignupPage.styles';
import drawItLogo from '../../assets/images/DrawIt-logo.svg';
import InputContainer from '../../components/common/input/InputContainer';
import lockIcon from '../../assets/images/lock-icon.svg';
import emailIcon from '../../assets/images/mail-icon.svg';
import DrawIt3DImage from '../../assets/images/DrawIt-3D-image.png';
import SquareButton from '../../components/common/button/SquareButton';
import { useNavigate } from 'react-router-dom';
import { signUpAPI } from '../../api/user/user';

function SignupPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState();
  const [loginId, setLoginId] = useState();
  const [password, setPassword] = useState();
  const handleSignup = async e => {
    e.preventDefault(); // 새로고침 방지
    try {
      // 회원가입 API 호출
      const response = await signUpAPI({ loginId, password, nickname });
      if (response === 200) {
        console.log('회원가입 성공:', response);
        navigate('/login');
      }
    } catch (error) {
      console.error('회원가입 실패:', error.message);
      alert(error.message); // 실패 시 사용자에게 알림
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
          <p>회원가입</p>
        </S.Title>
        <S.LoginInputContainer onSubmit={handleSignup}>
          <InputContainer
            title="닉네임"
            type="text"
            icon={emailIcon}
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <InputContainer
            title="아이디"
            type="text"
            icon={lockIcon}
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
          <SquareButton title="회원가입" type="submit" />
        </S.LoginInputContainer>
      </S.RightContainer>
    </S.Container>
  );
}

export default SignupPage;
