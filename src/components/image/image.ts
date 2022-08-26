import "./image.css"
import { Component } from "../components";

export class Image extends Component {
  constructor(
    parentNode: HTMLElement,
    styles: string[],
    src: string,
    alt: string
  ) {
    super(parentNode, "img");
    this.element.classList.add(...styles);
    this.element.setAttribute("src", src);
    this.element.setAttribute("alt", alt);
  }
}
