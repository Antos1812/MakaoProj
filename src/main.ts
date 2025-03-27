import kaplay, { GameObj } from "kaplay";
import { Card } from "./card";
import "kaplay/global"; 

kaplay();

loadRoot("./"); 
loadSprite("cards", "sprites/cards.png", {
  sliceX: 9,
  sliceY: 6,
});

const card: Card = new Card("clubs", "2");
const deck: Deck = new Deck();
