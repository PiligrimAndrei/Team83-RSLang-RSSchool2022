import { Component } from "../components";
import { Cards } from '../cards/cards';
import { Word } from "../word/word"
import './bookCards.css'
import { getWord, getWords } from "../../api/api";
import { IUserWord, IWord } from "../../interfaces/interfaces";
import { getUserWord, getUserWords } from '../../api/userWordApi';


export class BookCards extends Component {
    private cards: Cards;
    private word: Word | undefined;
    constructor (parentNode: HTMLElement, cards: Array<IWord> , currentWord: IWord , userWords: (IUserWord | null)[]) {
        super(parentNode, 'div', ['bookCards'], '', true);

        this.cards = new Cards( this.element , cards, userWords);
        this.word = new Word( this.element , currentWord, 0, userWords[0]);
        this.cards.element.onclick = this.renderWord.bind(this)

    }

    async renderWord(event: Event) {
        let target = event.target as HTMLElement;
        let userId = localStorage.getItem('userId');
        let id: string = String(target.dataset.id);
        let response = await getWord(id);
        let checkInUserWord = await getUserWord(userId!,id);
        let learnedNumber = 0
        if (!checkInUserWord && target.classList.contains("learnedIcoCard")) {
          checkInUserWord = await getUserWord(userId!,id);
          learnedNumber = checkInUserWord.optional.learned
        } else if (!checkInUserWord && target.classList.contains("cardContainer")) {
          learnedNumber = 0
        }
        else {
          checkInUserWord = await getUserWord(userId!,id);
          if (checkInUserWord) {
            learnedNumber = checkInUserWord.optional.learned
          }
        }
        if (response){
          this.word?.destroy()
          this.word = new Word(this.element, response, learnedNumber)
        }
      }
}
