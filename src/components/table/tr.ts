
import { Component } from "../components";

export class Tr extends Component {
    constructor(parentNode: HTMLElement, styles: string[] = []) {
        super(parentNode, "tr")

        this.element.classList.add(...styles)
    }
}