export const GAME_STATES = {
  NEW: 'NEW',
  ACTIVE: 'ACTIVE',
  BOARD_FULL: 'BOARD_FULL',
  NO_MOVES: 'NO_MOVES'
};

export const GAME_END_STATES = [
  GAME_STATES.NO_MOVES,
  GAME_STATES.BOARD_FULL
];
