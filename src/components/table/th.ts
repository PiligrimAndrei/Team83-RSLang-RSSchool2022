
import { Component } from "../components";

export class Th extends Component {
    constructor(parentNode: HTMLElement, styles: string[] = [],
        content:string, ) {
        super(parentNode, "th")

        this.element.classList.add(...styles)
        this.element.innerHTML = content
    }
}