import { Component } from "../components";
import { Image } from "../image/image";
import { Heading } from "../heading/heading";
import { Paragraph } from "../paragraph/paragraph";

export class MainPageDescription extends Component {
  descriptionText: Component;
  descriptionHeading: Heading;
  descriptionParagraph: Paragraph;
  descriptionImage: Image;
  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["mainPageDescription"]);

    this.descriptionText = new Component(this.element, "div", [
      "descriptionText",
    ]);

    this.descriptionHeading = new Heading(
      this.descriptionText.element,
      "h1",
      ["descriptionHeading"],
      "Прокачайте свой английский"
    );

    this.descriptionParagraph = new Paragraph(
      this.descriptionText.element,
      ["descriptionParagraph"],
      `Учите слова, которые вам действительно понадобятся,
      и совершенствуйте свой словарный запас всего 
      за 30 минут в день!`
    );

    this.descriptionImage = new Image(
      this.element,
      ["descriptionImage"],
      "./assets/descriptionImage.png",
      "descriptionImage"
    );
  }
}
