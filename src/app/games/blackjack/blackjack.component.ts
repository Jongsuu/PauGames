import { Component, OnInit } from '@angular/core';
import { PokerCard, PokerCardSuit } from '../../interfaces/pokerCards.interfaces';
import { BlackjackGameState, BlackjackPlayer } from '../../interfaces/blackjack.interfaces';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dealCardTrigger, fadeInTrigger } from '../../../animations/animations';
import { getRandomInt, initDeck } from '../../../utils/poker';
import { DecimalPipe } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-blackjack',
  standalone: true,
  imports: [
    MatTooltipModule,
    MatButtonModule,
    DecimalPipe,
    MatIconModule
  ],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.css',
  animations: [dealCardTrigger, fadeInTrigger]
})
export class BlackjackComponent implements OnInit {

  private deck: PokerCard[] = [];

  crupier: BlackjackPlayer = {
    cards: [],
    balance: 500,
    total: 0,
    wins: 0
  };

  player: BlackjackPlayer = {
    playerNumber: 1,
    cards: [],
    balance: 200,
    currentBet: 0,
    total: 0,
    wins: 0
  };

  state: BlackjackGameState = BlackjackGameState.NewRound;

  isMobile = false;

  constructor(private snackBar: MatSnackBar, private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.newRound();
    this.responsive.observe("(max-width: 768px)").subscribe(result => {
      this.isMobile = result.matches;
    });
    this.isMobile = this.responsive.isMatched("(max-width: 768px)");
  }

  public newRound(): void {
    this.snackBar.dismiss();
    this.state = BlackjackGameState.NewRound;
    this.crupier.cards = [];
    this.player.cards = [];
    this.player.total = 0;
    this.crupier.total = 0;

    this.shuffleCards();
    this.dealCards();
  }

  private shuffleCards(): void {
    let deck = initDeck();
    this.deck = [];

    let cardIndexes = [...Array(52).keys()];

    for (let i = 0; i < 52; i++) {
      let random = getRandomInt(cardIndexes.length);
      let index = cardIndexes[random];
      cardIndexes.splice(random, 1);
      this.deck.push(deck[index]);
    }
  }

  private dealCards(): void {
    this.crupier.cards.push(this.deck[0]);
    this.deck.splice(0, 1);

    this.player.cards.push(this.deck[0]);
    this.deck.splice(0, 1);

    this.crupier.cards.push(this.deck[0]);
    this.deck.splice(0, 1);

    this.player.cards.push(this.deck[0]);
    this.deck.splice(0, 1);

    setTimeout(() => {
      this.crupier.cards[1].isFaceUp = true;
    }, 500);

    setTimeout(() => {
      this.player.cards[0].isFaceUp = true;
    }, 700);

    setTimeout(() => {
      this.player.cards[1].isFaceUp = true;
      this.player.total = BlackjackComponent.getTotal(this.player.cards);
      this.crupier.total = BlackjackComponent.getTotal(this.crupier.cards);
      this.state = BlackjackGameState.Playing;
      if (this.player.total === 21) {
        this.stand();
      }
    }, 800);
  }

  public getCardImage(card: PokerCard): string {
    let cardValue: string;

    if (card.card === "A") {
      cardValue = "ace";
    }
    else if (card.card === "J") {
      cardValue = "jack";
    }
    else if (card.card === "Q") {
      cardValue = "queen";
    }
    else if (card.card === "K") {
      cardValue = "king";
    }
    else {
      cardValue = card.card;
    }

    return `assets/poker-cards/${cardValue}_of_${PokerCardSuit[card.cardSuit]}.svg`;
  }

  public getFaceDownCard(): string {
    return `astronaut`;
  }

  public getCardKey(card: PokerCard): string {
    let cardValue: string;

    if (card.card === "A") {
      cardValue = "ace";
    }
    else if (card.card === "J") {
      cardValue = "jack";
    }
    else if (card.card === "Q") {
      cardValue = "queen";
    }
    else if (card.card === "K") {
      cardValue = "king";
    }
    else {
      cardValue = card.card;
    }

    return `${cardValue}-of-${PokerCardSuit[card.cardSuit]}`;
  }

  public getCardValue(card: PokerCard): string {
    if (card.card === "A")
      return "1 o 11";
    else if (["J", "Q", "K"].includes(card.card))
      return "10";

    return card.card;
  }

  public stand(): void {
    this.state = BlackjackGameState.getWinners;
    this.crupier.cards[0].isFaceUp = true;
    this.crupier.total = BlackjackComponent.getTotal(this.crupier.cards);

    if (this.crupier.total <= 16) {
      let card = this.deck[0];
      this.deck.splice(0, 1);
      this.crupier.cards.push(card);

      setTimeout(() => {
        card.isFaceUp = true;
        this.crupier.total = BlackjackComponent.getTotal(this.crupier.cards);
        this.determineWinner();
      }, 200);
    }
    else {
      this.determineWinner();
    }
  }

  public askForCard(): void {
    if (this.player.total < 21) {
      let card = this.deck[0];
      this.player.cards.push(card);
      this.deck.splice(0, 1);

      setTimeout(() => {
        card.isFaceUp = true;
        this.player.total = BlackjackComponent.getTotal(this.player.cards);

        if (this.player.total >= 21) {
          this.stand();
        }
      }, 200);
    }
    else {
      this.stand();
    }
  }

  private openSnackBar(message: string, duration: number = 2000) {
    this.snackBar.open(message, undefined, {
      panelClass: "centered-snackbar"
    });
  }

  private determineWinner(): void {
    let result: string;
    if (this.player.total > 21) {
      this.crupier.wins++;
      result = "Te has pasado de 21!";
    }
    else if (this.crupier.total > 21) {
      this.player.wins++;
      result = "Oleee has ganado!";
    }
    else if (this.crupier.total === 21) {
      // Gets bet back
      if (this.player.total === 21) {
        result = "Recuperas la apuesta!";
      }
      // Crupier wins
      else {
        this.crupier.wins++;
        result = "Has perdido tonto";
      }
    }
    else if (this.player.total >= this.crupier.total) {
      this.player.wins++;
      result = "Oleee has ganado!";
    }
    else {
      this.crupier.wins++;
      result = "Has perdido tonto";
    }

    this.openSnackBar(result);
  }

  private static getTotal(cards: PokerCard[]): number {
    let total = 0;

    let sortedCards = [...cards].sort((a, b) => {
      if (a.card === "A")
        return 1;
      else if (b.card === "A")
        return -1;
      else
        return 0;
    });

    sortedCards.forEach(card => {
      if (card.isFaceUp) {
        total += BlackjackComponent.getCardValue(card, total);
      }
    });

    return total;
  }

  private static getCardValue(card: PokerCard, total: number): number {
    if (card.card === "A") {
      if (total < 11)
        return 11;
      else
        return 1;
    }
    else if (["J", "Q", "K"].includes(card.card))
      return 10;
    else
      return Number(card.card);
  }
}
