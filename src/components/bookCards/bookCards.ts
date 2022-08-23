import { Component } from "../components";
import { Cards } from "../cards/cards";
import { Word } from "../word/word"


export class BookCards extends Component {
    private cards: Cards;
    private word: Word;
    constructor (parentNode: HTMLElement) {
        super(parentNode, 'div', ['bookCards']);

        this.cards = new Cards( this.element );
        this.word = new Word( this.element );
    }
}