import { Component } from '../../components/components';
import './form.css'
export class Form extends Component {
    
    constructor(
        parentNode:HTMLElement,
        styles: string[] = [],
        ){
        super(parentNode, "form");

        this.element.classList.add(...styles);
    }
}