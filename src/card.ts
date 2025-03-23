import { GameObj } from "kaplay";

export class Card {
  suit: string;
  rank: string;
  gameObj: GameObj<any>;

  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
    this.gameObj = add([sprite("cards", { frame: 2 }), scale(0.5)]);
  }

  moveTo(x: number, y: number): void {
    this.gameObj.pos = vec2(x, y);
  }
  show(): void {
    this.gameObj.hidden = false;
  }
  hide(): void {
    this.gameObj.hidden = true;
  }
}
