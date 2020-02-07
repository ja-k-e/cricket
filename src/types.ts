import {
  CLOSED_0,
  CLOSED_1,
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
  TIE,
  THEME_ACCENT,
  THEME_COLOR1,
  THEME_COLOR2,
  THEME_COLOR3,
} from './constants';

export type ClosedType = typeof CLOSED_0 | typeof CLOSED_1;
export type HitIdType =
  | typeof HIT_ID_15
  | typeof HIT_ID_16
  | typeof HIT_ID_17
  | typeof HIT_ID_18
  | typeof HIT_ID_19
  | typeof HIT_ID_20
  | typeof HIT_ID_B;

export type PlayerIdType =
  | typeof PLAYER_ID_A
  | typeof PLAYER_ID_B
  | typeof PLAYER_ID_C
  | typeof PLAYER_ID_D;

export type ThemeVariableType =
  | typeof THEME_ACCENT
  | typeof THEME_COLOR1
  | typeof THEME_COLOR2
  | typeof THEME_COLOR3;

export type TieType = typeof TIE;
export type WinningType = PlayerIdType | TieType;

export type Closed = { [K in HitIdType]: ClosedType };
export type Hits = { [K in HitIdType]: number };
export type PlayerHits = { [K in PlayerIdType]: Hits };
export type Scores = { [K in PlayerIdType]: number };
export type Theme = { [K in ThemeVariableType]: string };

export interface TimelineEntry {
  hitId: HitIdType;
  playerId: PlayerIdType;
}
export type Timeline = Array<TimelineEntry>;
