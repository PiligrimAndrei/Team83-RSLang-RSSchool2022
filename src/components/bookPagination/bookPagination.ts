import { Component } from '../components';
import { Paragraph } from '../paragraph/paragraph';
import { Image } from '../image/image';
import './bookPagination.css'

export class BookPagination extends Component{
    private arrowBack: Image;
    private arrowForward: Image;
    private pageNumber: Paragraph;
    

    constructor(parentNode: HTMLElement){
        super(parentNode, 'div', ['bookPagination'])

        this.arrowBack = new Image(
            this.element,
            ['arrowBack'],
            './assets/arrowL.png',
            'arrowBack'
        )
        if((Number(localStorage.getItem('pageNumber')) === 0) || !localStorage.getItem('pageNumber')){
            this.arrowBack.element.classList.add('disabled')

        }
        
        this.pageNumber = new Paragraph(
            this.element,
            ['pageNumber'],
            `${localStorage.getItem('pageNumber')}`
        )

        this.arrowForward = new Image(
            this.element,
            ['arrowForward'],
            './assets/arrowR.png',
            'arrowForward'
        )
        if(Number(localStorage.getItem('pageNumber')) === 29){
            this.arrowForward.element.classList.add('disabled')

        }

        this.arrowBack.element.onclick = this.changeArrowStyle.bind(this) 
        this.arrowForward.element.onclick = this.changeArrowStyle.bind(this) 

    }
    changeArrowStyle(event: Event){
        let LSpageNumber =  Number(localStorage.getItem('pageNumber'));
        let target = event.target as HTMLElement;
        if(localStorage.getItem('onpage') === 'user'){
            return
        }
        if(target.classList.contains("arrowForward")){
            if(LSpageNumber === 0){
                this.arrowBack.element.classList.remove('disabled')
                this.arrowBack.element.style.pointerEvents = "auto"
            }
            if(LSpageNumber === 28){
                target.classList.add('disabled')
                target.style.pointerEvents = "none"
            }
        }
        if(target.classList.contains("arrowBack")){
            if(LSpageNumber === 29){
                this.arrowForward.element.classList.remove('disabled')
                this.arrowForward.element.style.pointerEvents = "auto"
            }
            if(LSpageNumber === 1){
                target.classList.add('disabled')
                target.style.pointerEvents = "none"
            }
        }
    }
}

