import { Component } from '../../components/components';
import './paragraph.css'
export class Paragraph extends Component {
    
    constructor(
        parentNode:HTMLElement,
        styles: string[] = [],
        content:string,
        ){
        super(parentNode, 'p');

        this.element.innerHTML = content;
        this.element.classList.add(...styles);
    }
}