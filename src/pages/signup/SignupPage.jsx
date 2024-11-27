import React from 'react';
import * as S from './SignupPage.styles';
import drawItLogo from '../../assets/images/DrawIt-logo.svg';
import InputContainer from '../../components/common/input/InputContainer';
import lockIcon from '../../assets/images/lock-icon.svg';
import emailIcon from '../../assets/images/mail-icon.svg';
import DrawIt3DImage from '../../assets/images/DrawIt-3D-image.png';
import SquareButton from '../../components/common/button/SquareButton';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  const handleSignup = () => {
    console.log('회원가입 로직');
    navigate('/login');
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
          <InputContainer title="닉네임" type="text" icon={emailIcon} />
          <InputContainer title="아이디" type="text" icon={lockIcon} />
          <InputContainer title="비밀번호" type="password" icon={lockIcon} />
          <InputContainer title="비밀번호 확인" type="password" icon={lockIcon} />
          <SquareButton title="회원가입" type="submit" />
        </S.LoginInputContainer>
      </S.RightContainer>
    </S.Container>
  );
}

export default SignupPage;
