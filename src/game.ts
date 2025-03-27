import { Deck } from "./deck";
import { Player } from "./player";
import { Card } from "./card";
import { log } from "console";


export class Game {
  deck: Deck;
  players: Player[];
  discardPile: Card[];
  currentTurn: number;
  activeRequest: {type: string, value: string} |  null;
  pendingPenalty: number; 
  

  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();
    this.players = [new Player("Gracz 1"), new Player("Gracz 2")];
    this.discardPile = [];
    this.currentTurn = 0;
    this.activeRequest = null ;
    this.pendingPenalty = 0;

    // Rozdaj po 5 kart każdemu graczowi
    for (let i = 0; i < 5; i++) {
      for (const player of this.players) {
        const card = this.deck.draw();

        player.addCard(card);
      }
    }

    // Dodaj jedną kartę na stos odrzuconych
    const firstCard = this.deck.draw();
    if (firstCard) {
      this.discardPile.push(firstCard);
    }
  }

  getCurrentPlayer(): Player {
    return this.players[this.currentTurn];
  }

  // Specjalne karty
  handleSpecialCard(card: Card): void{
    const nextPlayerIndex = (this.currentTurn + 1) % this.players.length;
    const nextPlayer = this.players[nextPlayerIndex];

    switch (card.rank) {
      case "2": //+2
        for (let i =0; i <2; i++){
            const drawnCard = this.deck.draw();
            if (drawnCard) nextPlayer.addCard(drawnCard);   
        }
        break;
      case "3": //+3
        for (let i =0; i <3; i++){
            const drawnCard = this.deck.draw();
            if (drawnCard) nextPlayer.addCard(drawnCard);
        }
        break;
      case "4": // Blok     
        this.currentTurn = nextPlayerIndex; //pominiecie playera
        break;

      case "J": //Żądanie
        const allowedRanks = ["5", "6", "7", "8", "9", "10"];
            const requestedRank = prompt("Wybierz kartę do żądania (5-10):");

            if (requestedRank && allowedRanks.includes(requestedRank)) {
                this.activeRequest = { type: "rank", value: requestedRank };
            } else {
                console.log("Nie możesz żądać tej karty!");
            }
        break;
      case "K": //+5
        
        if (card.suit === "hearts" || card.suit === "spades") {
          // TODO: Następny gracz 5 dobiera da przodu lub tyu
          for(let i = 0; i < 5; i++){
            const drawnCard = this.deck.draw();
            if(drawnCard) nextPlayer.addCard(drawnCard);     
          }
        }
        break;
      case "A": //Żądanie koloru
        const requestedSuit = prompt("wybierz kolor (trefl, pik, kier, karo):");
        if (requestedSuit && ["clubs", "diamonds", "hearts", "spades"].includes(requestedSuit)) {
            this.activeRequest = {type: "suit", value: requestedSuit};
        } else {
            console.log("nie mozesz wybrac tego koloru");
        }
        break;
      default:
        break;
    }
  }


  getTopCard(): Card{
    return this.discardPile[this.discardPile.length - 1];
  }

  // Funkcja sprawdzania czy gracz może postawić karte
  canPlay(card: Card): boolean {
    const topCard = this.getTopCard();

    if(this.activeRequest){
        return (
          (this.activeRequest.type === "rank" && this.activeRequest.value === card.rank) ||
          (this.activeRequest.type === "suit" && this.activeRequest.value === card.suit)
        )
    }
    
    return card.suit === topCard.suit || card.rank === topCard.rank || card.rank === "Q";
  }

  // Funkcja sprawdzania czy gracz moze zagrac
  drawIfNoMove(): void {
    const currentPlayer = this.getCurrentPlayer();
    if (!currentPlayer.getHand().some(card => this.canPlay(card))){
        console.log(`${currentPlayer.name} dobiera karte (nie może zagrać)`);

        const drawnCard = this.deck.draw();
        if(drawnCard){
          currentPlayer.addCard(drawnCard);
          if(!this.canPlay(drawnCard)){
            console.log(`${currentPlayer.name} kolejka przechodzi (dalej nie może zagrać)`);
            this.currentTurn = (this.currentTurn + 1) % this.players.length;
          }
        }
    }
  }

history : string[] = [];

  // Funkcja zagrywania karty
  playCard(card: Card | null): void {
    const currentPlayer = this.getCurrentPlayer();

    if(card === null){
      this.drawIfNoMove();
      return;
    }

    if(!this.canPlay(card)){
        console.log("nie mozesz zagrac tej karty");
        return;
    }

      currentPlayer.removeCard(card);
      this.discardPile.push(card);
      this.history.push(`${currentPlayer.name} zagrał ${card.rank} ${card.suit}`);
      this.handleSpecialCard(card);

      if (this.checkGameEnd()){
        console.log(`${currentPlayer.name} wygrał`);
      } else {
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
      }
  }

  checkGameEnd(): boolean {
    return this.players.some(player => player.getHand().length === 0);
  }
}
