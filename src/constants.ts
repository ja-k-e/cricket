import { Theme } from './types';

export const CLOSED_0 = 0;
export const CLOSED_1 = 1;

export const HIT_ID_15 = '15';
export const HIT_ID_16 = '16';
export const HIT_ID_17 = '17';
export const HIT_ID_18 = '18';
export const HIT_ID_19 = '19';
export const HIT_ID_20 = '20';
export const HIT_ID_B = 'B';

export const PLAYER_ID_A = 'A';
export const PLAYER_ID_B = 'B';
export const PLAYER_ID_C = 'C';
export const PLAYER_ID_D = 'D';

export const TIE = 'TIE';

export const THEME_ACCENT = '--accent';
export const THEME_COLOR1 = '--color1';
export const THEME_COLOR2 = '--color2';
export const THEME_COLOR3 = '--color3';
export const THEMES: Array<Theme> = [
  {
    [THEME_ACCENT]: 'tomato',
    [THEME_COLOR1]: 'black',
    [THEME_COLOR2]: 'white',
    [THEME_COLOR3]: '#f0f0f0',
  },
  {
    [THEME_ACCENT]: 'hotpink',
    [THEME_COLOR1]: 'black',
    [THEME_COLOR2]: 'white',
    [THEME_COLOR3]: '#f0f0f0',
  },
  {
    [THEME_ACCENT]: '#ffbb00',
    [THEME_COLOR1]: 'black',
    [THEME_COLOR2]: 'white',
    [THEME_COLOR3]: '#f0f0f0',
  },
  {
    [THEME_ACCENT]: 'tomato',
    [THEME_COLOR1]: 'tomato',
    [THEME_COLOR2]: 'black',
    [THEME_COLOR3]: '#191919',
  },
  {
    [THEME_ACCENT]: 'hotpink',
    [THEME_COLOR1]: 'hotpink',
    [THEME_COLOR2]: 'black',
    [THEME_COLOR3]: '#191919',
  },
  {
    [THEME_ACCENT]: '#ffbb00',
    [THEME_COLOR1]: '#ffbb00',
    [THEME_COLOR2]: 'black',
    [THEME_COLOR3]: '#191919',
  },
];
