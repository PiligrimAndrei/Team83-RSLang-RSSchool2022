import { Component } from '../../components/components';
import './button.css'
export class Button extends Component {
    
    constructor(
        parentNode:HTMLElement,
        type:string,
        styles: string[] = [],
        content:string, 
        ){
        super(parentNode, 'button');

        this.element.setAttribute("type",type);
        this.element.textContent = content;
        this.element.classList.add(...styles);
    }
}