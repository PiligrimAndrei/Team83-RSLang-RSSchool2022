import { Component } from '../components';
import { Paragraph } from '../paragraph/paragraph';
import { Image } from '../image/image';
import { BOOK_PAGE_NUMBER } from '../../constants/data';
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
        
        this.pageNumber = new Paragraph(
            this.element,
            ['pageNumber'],
            `${BOOK_PAGE_NUMBER}`
        )

        this.arrowForward = new Image(
            this.element,
            ['arrowForward'],
            './assets/arrowR.png',
            'arrowForward'
        )
    }
}
