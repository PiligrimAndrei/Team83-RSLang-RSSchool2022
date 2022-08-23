import { Component } from "../components";
import { Heading } from "../heading/heading";
import { Paragraph } from "../paragraph/paragraph";
import { Image } from "../image/image";
import { ADVANTAGES_CARDS_CONTENT } from "../../constants/data";

export class MainPageAdvantages extends Component {
  private advantagesHeading: Heading;
  private advantagesCardContainer: Component;
  private advantagesCard: Component | undefined;
  private advantagesCardHeading: Heading | undefined;
  private advatagesParagraph: Paragraph | undefined;
  private advatagesImage: Image | undefined;
  
  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["mainPageAdvantages"]);

    this.advantagesHeading = new Heading(
      this.element,
      "h2",
      ["advantagesHeading"],
      "Оцените привемущества приложения"
    );

    this.advantagesCardContainer = new Component(this.element, "div", [
      "advantagesCardContainer",
    ]);

    for (let i = 0; i < ADVANTAGES_CARDS_CONTENT.length; i += 1) {
      this.advantagesCard = new Component(
        this.advantagesCardContainer.element,
        "div",
        ["advantagesCard"]
      );

      this.advatagesImage = new Image(
        this.advantagesCard.element,
        ["advatagesImage"],
        ADVANTAGES_CARDS_CONTENT[i].src,
        ADVANTAGES_CARDS_CONTENT[i].alt
      )

      this.advantagesCardHeading = new Heading(
        this.advantagesCard.element,
        "h2",
        ["advantagesCardHeading"],
        ADVANTAGES_CARDS_CONTENT[i].heading
      );

      this.advatagesParagraph = new Paragraph(
        this.advantagesCard.element,
        ["advatagesParagraph"],
        ADVANTAGES_CARDS_CONTENT[i].text
      );
    }
  }
}
