import type { BusinessId } from './businesses';

export type GameAction =
  | 'move'
  | 'awaitingCustomer'
  | 'collectRaw'
  | 'bringRaw'
  | 'processing'
  | 'ready'
  | 'deliver'
  | 'collectPayment'
  | 'free';

export type GameSnapshot = {
  schemaVersion: 2;
  cash: number;
  served: number;
  queue: number;
  businessId: BusinessId | null;
  businessLevel: number;
  upgradeLevel: number;
  canUpgrade: boolean;
  action: GameAction;
  objective: string;
  message: string;
};

export const initialSnapshot: GameSnapshot = {
  schemaVersion: 2,
  cash: 0,
  served: 0,
  queue: 0,
  businessId: null,
  businessLevel: 1,
  upgradeLevel: 0,
  canUpgrade: false,
  action: 'move',
  objective: 'Mova-se pelo seu primeiro negócio.',
  message: 'Toque no chão para caminhar. As ações acontecem por proximidade.',
};

export const GAME_SAVE_KEY = 'pelotastycoon:v0.1';
export const GAME_STATE_EVENT = 'pelotastycoon:state';
export const GAME_RESET_EVENT = 'pelotastycoon:reset';
