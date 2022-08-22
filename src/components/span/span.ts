import { Component } from '../../components/components';
import './span.css'
export class Span extends Component {
    
    constructor(
        parentNode:HTMLElement,
        styles: string[],
        content:string,
        ){
        super(parentNode, "span");

        this.element.textContent = content;
        this.element.classList.add(...styles);
    }
}