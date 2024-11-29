import { atom } from 'recoil';

export const itemListState = atom({
  key: 'itemListState',
  default: [],
});

export const myItemListState = atom({
  key: 'myItemListState',
  default: [],
});
