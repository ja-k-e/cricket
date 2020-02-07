import {
  HIT_ID_15,
  HIT_ID_16,
  HIT_ID_17,
  HIT_ID_18,
  HIT_ID_19,
  HIT_ID_20,
  HIT_ID_B,
  PLAYER_ID_A,
  PLAYER_ID_B,
  PLAYER_ID_C,
  PLAYER_ID_D,
} from './constants';
import { Hits, HitIdType, PlayerHits } from './types';

export const emptyHits: Hits = {
  [HIT_ID_20]: 0,
  [HIT_ID_19]: 0,
  [HIT_ID_18]: 0,
  [HIT_ID_17]: 0,
  [HIT_ID_16]: 0,
  [HIT_ID_15]: 0,
  [HIT_ID_B]: 0,
};

export const defaultOrder: ReadonlyArray<HitIdType> = [
  HIT_ID_20,
  HIT_ID_19,
  HIT_ID_18,
  HIT_ID_17,
  HIT_ID_16,
  HIT_ID_15,
  HIT_ID_B,
];

export const defaultPlayerHits: PlayerHits = {
  [PLAYER_ID_A]: Object.assign({}, emptyHits),
  [PLAYER_ID_B]: Object.assign({}, emptyHits),
  [PLAYER_ID_C]: Object.assign({}, emptyHits),
  [PLAYER_ID_D]: Object.assign({}, emptyHits),
};
