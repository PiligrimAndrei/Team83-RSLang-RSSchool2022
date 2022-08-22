import { Component } from '../components';
import { Paragraph } from '../paragraph/paragraph';
import { Image } from '../image/image';
import { BOOK_PAGE_NUMBER } from '../../constants/data';

export class BookPagination extends Component{
    private arrowBack: Image;
    private arrowForward: Image;
    private pageNumber: Paragraph;
    
    constructor(parentNode: HTMLElement){
        super(parentNode, 'div', ['bookPagination'])

        this.arrowBack = new Image(
            this.element,
            ['arrowBack'],
            './assets/arrowBack.svg',
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
            './assets/arrowForward.svg',
            'arrowForward'
        )
    }
}
