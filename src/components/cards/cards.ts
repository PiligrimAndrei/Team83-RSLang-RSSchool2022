import { Component } from "../components";
import { Paragraph } from "../paragraph/paragraph";
import { Image } from "../image/image";
import { MAX_CARDS_ON_PAGE } from "../../constants/data";
import './cards.css'

export class Cards extends Component {
    private wordNameCard: Paragraph | undefined;
    private iconsContainer: Component | undefined;
    private cardContainer: any;
    private hardIcoCard: any;
    private learnedIcoCard: any;

    constructor(parentNode: HTMLElement) {

        super(parentNode, 'div', ['cards'])

        for(let i = 0; i < MAX_CARDS_ON_PAGE; i += 1){
            
            this.cardContainer = new Component(
                this.element,
                'div',
                ['cardContainer']
            )
    
            this.wordNameCard = new Paragraph(
                this.cardContainer.element,
                ['wordNameCard'],
                'fhdhd'
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
        }
    }
}