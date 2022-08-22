import { Component } from '../../components/components';
import './link.css'
export class Link extends Component {
    addEventListen: any;
    
    constructor(
        parentNode:HTMLElement,
        href:string,
        styles: string[] = [],
        content:string,
        ){
        super(parentNode, 'a');

        this.element.setAttribute("href",href);
        this.element.textContent = content;
        this.element.classList.add(...styles);
    }
}