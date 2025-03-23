import { Card } from "./card";

const SUITS = ["clubs", "diamonds", "hearts", "spades"];
const RANKS = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

export class Deck {
  cards: Array<Card>;
  constructor() {
    this.cards = [];
    let currentFrame = 2;
    for (let suit of SUITS) {
      for (let rank of RANKS) {
        this.cards.push(new Card(suit, rank));
        currentFrame++;
      }
    }
  }

  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  draw(): Card {
    return this.cards.pop();
  }
}
