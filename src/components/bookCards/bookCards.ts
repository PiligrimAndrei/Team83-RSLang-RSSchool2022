import { Component } from "../components";
import { Cards } from '../cards/cards';
import { Word } from "../word/word"
import './bookCards.css'
import { getWord, getWords } from "../../api/api";
import { IWord } from "../../interfaces/interfaces";


export class BookCards extends Component {
    private cards: Cards;
    private word: Word | undefined;
    constructor (parentNode: HTMLElement, cards: Array<IWord> , currentWord: IWord ) {
        super(parentNode, 'div', ['bookCards'], '', true);

        this.cards = new Cards( this.element , cards);
        this.word = new Word( this.element , currentWord);
        this.cards.element.onclick = this.renderWord.bind(this)
    }

    async renderWord(event: Event) {
        let target = event.target as HTMLElement;
        let id: string = String(target.dataset.id);
    
        let response = await getWord(id);
        console.log(response)
        
        if (response){
          this.word?.destroy()
          this.word = new Word(this.element, response)
        }
      }
}