export type GameSnapshot = {
  cash: number;
  served: number;
  queue: number;
  businessOwned: boolean;
  businessLevel: number;
  message: string;
};

export const initialSnapshot: GameSnapshot = {
  cash: 1000,
  served: 0,
  queue: 0,
  businessOwned: false,
  businessLevel: 1,
  message: 'Toque no ponto comercial para começar.',
};

export const GAME_STATE_EVENT = 'pelotastycoon:state';
export const GAME_RESET_EVENT = 'pelotastycoon:reset';
