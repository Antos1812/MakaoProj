import kaplay, { GameObj } from "kaplay";
import { Card } from "./card";
import "kaplay/global"; // uncomment if you want to use without the k. prefix
import { Deck } from "./deck";
import {Game} from "./game";

kaplay();

loadRoot("./"); 
loadSprite("cards", "sprites/cards.png", {
  sliceX: 9,
  sliceY: 6,
});

scene("game", () => {
  setBackground(rgb(0, 150, 50));
  
  const game: Game = new Game();
  game.start();
  
  add([
    text(game.players[0].name),
    {}
  ])
});

const card: Card = new Card("clubs", "2");
const deck: Deck = new Deck();
