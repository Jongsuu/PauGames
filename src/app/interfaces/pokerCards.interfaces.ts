export interface PokerCard {
  id: number;
  card: PokerCardValue;
  cardSuit: PokerCardSuit;
  isFaceUp: boolean;
}

export enum PokerCardSuit {
  "clubs", // treboles
  "diamonds", // diamantes
  "hearts", // corazones
  "spades" // picas
}

export type PokerCardValue = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
