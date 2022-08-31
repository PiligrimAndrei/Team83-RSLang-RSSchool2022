import { Component } from "../components";

export class Canvas extends Component{
    constructor(parentNode: HTMLElement, id: string){
        super(parentNode, 'canvas', ['canvas'])

        this.element.setAttribute('id', id)
    }
} 