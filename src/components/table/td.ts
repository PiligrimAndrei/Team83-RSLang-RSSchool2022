
import { Component } from "../components";

export class Td extends Component {
    constructor(parentNode: HTMLElement, styles: string[] = [],
        content:string, ) {
        super(parentNode, "td")

        this.element.classList.add(...styles)
        this.element.innerHTML = content
    }
}