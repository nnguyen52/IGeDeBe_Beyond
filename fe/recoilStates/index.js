import { atom, selectorFamily } from 'recoil';
import axios from 'axios';

const recoilState_justReleasedGames = atom({
  key: 'recoilState_justReleasedGames_Key',
  default: [],
});
const recoilState_comingSoondGames = atom({
  key: 'recoilState_comingSoondGames_Key',
  default: [],
});
const recoilState_mostAnticipatedGames = atom({
  key: 'recoilState_mostAnticipatedGames_Key',
  default: [],
});

const recoilState_justReleaseGamesPagination = atom({
  key: 'recoilState_justReleaseGamesPagination',
  default: [],
});
const recoilState_comingSoonGamesPagination = atom({
  key: 'recoilState_comingSoonGamesPagination',
  default: [],
});
const recoilState_mostAnticipatedGamesPagination = atom({
  key: 'recoilState_mostAnticipatedGamesPagination',
  default: [],
});
// store gameDetail
const recoilState_gameDetails = atom({
  key: 'recoilState_gameDetails',
  default: [],
});

export const recoilState_gameDetails_handler = selectorFamily({
  key: 'recoilState_gameDetails_handler',
  get:
    () =>
    ({ get }) => {
      return get(recoilState_gameDetails);
    },
  set:
    () =>
    ({ get, set }, data) => {
      return set(recoilState_gameDetails, [...get(recoilState_gameDetails), data]);
    },
});

export const recoilState_GamesPagination_Handler = selectorFamily({
  key: 'recoilState_GamesPagination_Handler',
  get:
    (type) =>
    ({ get }) => {
      if (type === 'justReleaseGames') return get(recoilState_justReleaseGamesPagination);
      if (type === 'comingSoon') return get(recoilState_comingSoonGamesPagination);
      if (type === 'mostAnticipated') return get(recoilState_mostAnticipatedGamesPagination);
    },
  set:
    () =>
    ({ get, set }, { data, type }) => {
      if (type == 'justReleaseGames') {
        return set(recoilState_justReleaseGamesPagination, [
          ...get(recoilState_justReleaseGamesPagination),
          ...data,
        ]);
      }
      if (type == 'comingSoon')
        return set(recoilState_comingSoonGamesPagination, [
          ...get(recoilState_comingSoonGamesPagination),
          ...data,
        ]);
      if (type == 'mostAnticipated')
        return set(recoilState_mostAnticipatedGamesPagination, [
          ...get(recoilState_mostAnticipatedGamesPagination),
          ...data,
        ]);
    },
});
export const recoilState_StartUpGames_Handler = selectorFamily({
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
      if (type === 'justReleaseGames') {
        return set(recoilState_justReleasedGames, data);
      }
      if (type === 'comingSoon') return set(recoilState_comingSoondGames, data);
      if (type === 'mostAnticipated') return set(recoilState_mostAnticipatedGames, data);
    },
});
