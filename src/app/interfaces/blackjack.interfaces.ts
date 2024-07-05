import { PokerCard } from "./pokerCards.interfaces";

export enum BlackjackGameState {
  NewRound,
  Playing,
  getWinners
}

export interface BlackjackPlayer {
  playerNumber?: number;
  cards: PokerCard[];
  currentBet?: number;
  balance: number;
  total: number;
  wins: number;
}
