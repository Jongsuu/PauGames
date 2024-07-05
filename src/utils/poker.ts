import { PokerCard, PokerCardSuit, PokerCardValue } from "../app/interfaces/pokerCards.interfaces";

export function getRandomInt(max: number, min: number = 0): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function initDeck(): PokerCard[] {
  let deck: PokerCard[] = [];
  let counter = 1;

  for (let suit = 0; suit < 4; suit++) {
    let cardSuit = suit as PokerCardSuit;

    for (let i = 1; i <= 13; i++) {
      let cardValue: PokerCardValue;

      if (i === 1)
        cardValue = "A";
      else if (i <= 10)
        cardValue = i.toString() as PokerCardValue;
      else if (i === 11)
        cardValue = "J";
      else if (i === 12)
        cardValue = "Q";
      else
        cardValue = "K";

      let card: PokerCard = {
        id: counter,
        card: cardValue,
        cardSuit: cardSuit,
        isFaceUp: false
      };

      deck.push(card);
      counter++;
    }
  }

  return deck;
}
