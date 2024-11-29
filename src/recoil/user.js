import { atom, selector } from 'recoil';

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

export const allUserListState = atom({
  key: 'allUserListState',
  default: [],
});

export const allUserRankingState = selector({
  key: 'allUserRankingState',
  get: ({ get }) => {
    const userList = get(allUserListState); // allUserListState 읽기

    // totalPoint 기준으로 내림차순 정렬
    const sortedList = [...userList].sort((a, b) => b.totalPoint - a.totalPoint);
    return sortedList;
  },
});
