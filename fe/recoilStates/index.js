import { atom, selectorFamily } from 'recoil';

const recoilState_justReleasedGames = atom({
  key: 'recoilState_justReleasedGames',
  default: [],
});
const recoilState_comingSoondGames = atom({
  key: 'recoilState_comingSoondGames',
  default: [],
});
const recoilState_mostAnticipatedGames = atom({
  key: 'recoilState_mostAnticipatedGames',
  default: [],
});

export const recoilState_justReleasedGames_Handler = selectorFamily({
  key: 'gameListStateHandler',
  get:
    (type) =>
    ({ get }) => {
      if (type == 'justReleaseGames') return get(recoilState_justReleasedGames);
      if (type == 'comingSoon') return get(recoilState_comingSoondGames);
      if (type == 'mostAnticipated') return get(recoilState_mostAnticipatedGames);
    },
  set:
    () =>
    ({ set }, { data, type }) => {
      if (type == 'justReleaseGames') {
        return set(recoilState_justReleasedGames, data);
      }
      if (type == 'comingSoon') return set(recoilState_comingSoondGames, data);
      if (type == 'mostAnticipated') return set(recoilState_mostAnticipatedGames, data);
    },
});
