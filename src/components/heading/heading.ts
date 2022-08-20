import { Component } from '../../components/components';
import './heading.css'
export class Heading extends Component {
    
    constructor(
        parentNode:HTMLElement,
        size:string, // h1,h2...h6
        styles: string[] = [],
        content:string,
        ){
        super(parentNode, size);

        this.element.textContent = content;
        this.element.classList.add(...styles);
    }
}