import kaplay, { GameObj } from "kaplay";
import { Card } from "./card";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

kaplay();

loadRoot("./"); // A good idea for Itch.io publishing later
loadSprite("cards", "sprites/cards.png", {
  sliceX: 9,
  sliceY: 6,
});

const card: Card = new Card("clubs", "2");
const deck: Deck = new Deck();
