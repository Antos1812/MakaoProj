import {Card} from "./card";

export class Player {
    name: string;
    private hand: Card[];

    constructor(name: string) {
        this.name = name;
        this.hand = [];
    }

    addCard(card: Card): void {
        this.hand.push(card);
    }

    removeCard(card: Card): void {
        const index = this.hand.findIndex((c) => {
            return c.rank === card.rank && c.suit === card.suit;
        });

        if(index !== -1) {
            this.hand.splice(index, 1);
        }
    }

    getHand(): Card[] {
        throw new Error("not implemented");
        
        return [...this.hand];
    }
}