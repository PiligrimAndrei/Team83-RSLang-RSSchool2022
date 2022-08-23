import { Component } from '../../components/components';
import './input.css'
export class Input extends Component {
    
    constructor(
        parentNode:HTMLElement,
        type:string,
        styles: string[] = [],
        placeholder:string,
        autofocus: string = 'false'
        ){
        super(parentNode, 'input');

        this.element.setAttribute("type",type);
        this.element.setAttribute("placeholder",placeholder);
        this.element.classList.add(...styles);
        if(autofocus) {
            this.element.setAttribute("autofocus", autofocus);
        }
    }
}