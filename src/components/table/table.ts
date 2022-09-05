
import "./table.css";
import { Component } from "../components";
import { Th } from './th';
import { Tr } from './tr';
import { Td } from './td';

export class Table extends Component {

    constructor(parentNode: HTMLElement, styles: string[] = []) {
        super(parentNode, "table")

        this.element.classList.add(...styles)
    }
}