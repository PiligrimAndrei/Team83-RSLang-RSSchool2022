import { Component } from "../components";
import { Paragraph } from "../paragraph/paragraph";
import { Image } from "../image/image";
import { MAX_CARDS_ON_PAGE, DIFFICULTIES, commonUserWord } from "../../constants/data";
import './cards.css'
import { IUserWord, IWord } from "../../interfaces/interfaces";
import { createUserWord, getUserWord, updateUserWord } from "../../api/userWordApi";

export class Cards extends Component {
    private wordNameCard: Paragraph | undefined;
    private iconsContainer: Component | undefined;
    private cardContainer: Component | undefined;
    private hardIcoCard: Image | undefined;
    private learnedIcoCard: Image | undefined;
    private cardsNumber: number;
    private allCards;

    constructor(parentNode: HTMLElement, cards: Array<IWord>, userWords: (IUserWord | null)[]) {

        super(parentNode, 'div', ['cards'])

        this.cardsNumber = localStorage.getItem('onpage') === 'user' ? cards.length : MAX_CARDS_ON_PAGE;
        this.allCards = [];

        for(let i = 0; i < this.cardsNumber; i += 1){
            
            this.cardContainer = new Component(
                this.element,
                'div',
                ['cardContainer']
            )
    
            this.wordNameCard = new Paragraph(
                this.cardContainer.element,
                ['wordNameCard'],
                cards[i].word
            )
    
            this.iconsContainer = new Component(
                this.cardContainer.element,
                'div',
                ['iconsContainer']
            )
    
            this.hardIcoCard = new Image(
                this.iconsContainer.element,
                ['hardIcoCard'],
                './assets/hard.png',
                'hardIcoCard'
            )
    
            this.learnedIcoCard = new Image(
                this.iconsContainer.element,
                ['learnedIcoCard'],
                './assets/learned.png',
                'learnedIcoCard'
            )
            if (userWords[i] !== null) {
                userWords[i]?.difficulty === "hard" ? this.hardIcoCard.element.classList.add('active') : null;
                userWords[i]?.optional.learned! > 2 ? this.learnedIcoCard.element.classList.add('active') : null;
            }

            this.cardContainer.element.dataset.id = cards[i].id
            this.hardIcoCard.element.dataset.id = cards[i].id
            this.learnedIcoCard.element.dataset.id = cards[i].id
            this.wordNameCard.element.dataset.id = cards[i].id
            
            this.allCards.push(this.cardContainer)   

            this.hardIcoCard.element.onclick = this.hardWord.bind(this)
            this.learnedIcoCard.element.onclick = this.learnedWord.bind(this)

        }
        if (localStorage.getItem('onpage') === 'user') {
            this.allCards[0].element.classList.add(`active${localStorage.getItem('userdifficulty')}`)
        } else {
        this.allCards[0].element.classList.add(`active${DIFFICULTIES[cards[0].group]}`)
        }
        this.allCards.map((card) => {
            card.element.addEventListener('click', ()=>{ 
                this.allCards.map((card) => { 
                    let classNames = Array.from(card.element.classList);
                    let activeClass = classNames.filter(name => name.includes("active"));
                    card.element.classList.remove(activeClass[0])
                })
                if (localStorage.getItem('onpage') === 'user') {
                    card.element.classList.add(`active${localStorage.getItem('userdifficulty')}`) 
                } else {
                card.element.classList.add(`active${DIFFICULTIES[cards[0].group]}`) 
                }
            })
        })
    }
    async hardWord(event: Event){
        let target = event.target as HTMLImageElement
        const userId = localStorage.getItem('userId');
        let wordId = target.dataset.id
        let response = await getUserWord(userId!, wordId!);

        if(response) {
          delete response.id;
          delete response.wordId;
          response.difficulty = response.difficulty === "hard" ? "easy" : "hard"  ;
          response.optional.learned = 0;  
          let updateResponse = await updateUserWord(userId!, wordId!, response);
          if(updateResponse){
            updateResponse.difficulty === "hard" ? target.classList.add('active') : target.classList.remove('active');
            target.nextElementSibling!.classList.remove('active');
          }
        } else { 
        let body = Object.assign({}, commonUserWord)
        body.difficulty = "hard"
        let response = await createUserWord(userId!, wordId!, body);
        if (response) {
            target.classList.add('active')
        }
        }

    }
    async learnedWord(event: Event){
        let target = event.target as HTMLImageElement
        const userId = localStorage.getItem('userId');
        let wordId = target.dataset.id
        let response = await getUserWord(userId!, wordId!);

        if(response) {
          delete response.id;
          delete response.wordId;
          response.optional.learned = response.optional.learned < 3 ? 3 : 0 
          response.difficulty = "easy";
          let updateResponse = await updateUserWord(userId!, wordId!, response);
          if(updateResponse){
            updateResponse.optional.learned < 3 ? target.classList.remove('active') : target.classList.add('active'); 
            target.previousElementSibling!.classList.remove('active');
          }
        } else { 
        let body = Object.assign({}, commonUserWord)
        body.optional.learned = 3
        let response = await createUserWord(userId!, wordId!, body);
        if (response) {
            target.classList.add('active');
        }
        }
    }
}
