import { atom } from 'recoil';

export const myCurrentPointState = atom({
  key: 'myCurrentPointState',
  default: 0,
});

export const myTotalPointState = atom({
  key: 'myTotalPointState',
  default: 0,
});

export const myNicknameState = atom({
  key: 'myNicknameState',
  default: '',
});
