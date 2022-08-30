export class Component {
  element: HTMLElement;

  constructor(
    parentNode: HTMLElement,
    tagName: string = 'div',
    styles: string[] = [],
    content = '',
    addNotInEnd: boolean = false,
  ) {
    this.element = document.createElement(tagName);
    this.element.classList.add(...styles);
    this.element.textContent = content;

    if (addNotInEnd) {
      parentNode.firstElementChild?.insertAdjacentElement("afterend", this.element)
    }
    if (parentNode && !addNotInEnd) {
      parentNode.append(this.element);
    }
  }

  destroy(): void {
    this.element.remove();
  }
}

//TODO move to common/basicComponent/components.ts