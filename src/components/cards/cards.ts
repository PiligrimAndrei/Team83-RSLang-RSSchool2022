import { Component } from "../components";
import { Paragraph } from "../paragraph/paragraph";
import { Image } from "../image/image";
import { MAX_CARDS_ON_PAGE, DIFFICULTIES } from "../../constants/data";
import './cards.css'
import { IWord } from "../../interfaces/interfaces";

export class Cards extends Component {
    private wordNameCard: Paragraph | undefined;
    private iconsContainer: Component | undefined;
    private cardContainer: Component | undefined;
    private hardIcoCard: Image | undefined;
    private learnedIcoCard: Image | undefined;;
    private allCards;

    constructor(parentNode: HTMLElement, cards: Array<IWord>) {

        super(parentNode, 'div', ['cards'])

        this.allCards = [];

        for(let i = 0; i < MAX_CARDS_ON_PAGE; i += 1){
            
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

            this.cardContainer.element.dataset.id = cards[i].id
            this.hardIcoCard.element.dataset.id = cards[i].id
            this.learnedIcoCard.element.dataset.id = cards[i].id
            this.wordNameCard.element.dataset.id = cards[i].id
            
            this.allCards.push(this.cardContainer)         
        }

        this.allCards[0].element.classList.add(`active${DIFFICULTIES[cards[0].group]}`)

        this.allCards.map((card) => {
            card.element.addEventListener('click', ()=>{ 
                this.allCards.map((card) => { 
                    let classNames = Array.from(card.element.classList);
                    let activeClass = classNames.filter(name => name.includes("active"));
                    card.element.classList.remove(activeClass[0])
                })
                card.element.classList.add(`active${DIFFICULTIES[cards[0].group]}`) 
            })
        })
    }
    
}