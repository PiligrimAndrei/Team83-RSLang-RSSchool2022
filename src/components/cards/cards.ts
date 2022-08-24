import { Component } from "../components";
import { Paragraph } from "../paragraph/paragraph";
import { Image } from "../image/image";
import { MAX_CARDS_ON_PAGE } from "../../constants/data";
import './cards.css'

export class Cards extends Component {
    private wordName: Paragraph;
    private iconsContainer: Component;
    private cardContainer: any;
    private hardIcoCard: any;
    private learnedIcoCard: any;

    constructor(parentNode: HTMLElement) {

        super(parentNode, 'div', ['cards'])

        for(let i = 0; i < MAX_CARDS_ON_PAGE - 1; i += 1){
            
            this.cardContainer = new Component(
                this.element,
                'div',
                ['cardContainer']
            )
    
            this.wordName = new Paragraph(
                this.cardContainer.element,
                ['wordName'],
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
        this.cardContainer = new Component(
            this.element,
            'div',
            ['cardContainer']
        )

        this.wordName = new Paragraph(
            this.cardContainer.element,
            ['wordName'],
            ''
        )

        this.iconsContainer = new Component(
            this.cardContainer.element,
            'div',
            ['iconsContainer']
        )

        this.hardIcoCard = new Image(
            this.iconsContainer.element,
            ['hardIcoCard'],
            './assets/hardIcoCard.svg',
            'hardIcoCard'
        )

        this.learnedIcoCard = new Image(
            this.iconsContainer.element,
            ['learnedIcoCard'],
            './assets/learnedIcoCard.svg',
            'learnedIcoCard'
        )

    }
}