import { atom } from 'recoil';

export const correctWordDataState = atom({
  key: 'correctWordDataState',
  default: null,
});

export const drawerNicknameState = atom({
  key: 'drawerNicknameState',
  default: null,
});

export const roundNumberState = atom({
  key: 'roundNumberState',
  default: null,
});

export const currentGameRoomState = atom({
  key: 'currentGameRoomState',
  default: null,
});

export const currentGameRoundIdState = atom({
  key: 'currentGameRoundIdState',
  default: null,
});
