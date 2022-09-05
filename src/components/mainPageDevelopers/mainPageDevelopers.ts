import { Component } from "../components";
import { Paragraph } from "../paragraph/paragraph";
import { Link } from "../link/link";
import { Image } from "../image/image";
import { Heading } from "../heading/heading";
import { DEVELOPERS } from "../../constants/data";
import './mainPageDevelopers.css'

export class MainPageDevelopers extends Component {
  private developersHeading: Heading;
  private developersCard!: Component;
  private developersGit!: Link;
  private developersContainer!: Component;
  private developersName!: Paragraph;
  private developersImage!: Image;
  private developersAbout: Paragraph | undefined;
  
  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["mainPageDevelopers"]);

    this.developersHeading = new Heading(
      this.element,
      "h2",
      ["developersHeading"],
      "Наша команда"
    );

    for (let i = 0; i < DEVELOPERS.length; i += 1) {
      this.developersCard = new Component(this.element, "div", [
        "developersCard",
      ]);

      this.developersContainer = new Component(
        this.developersCard.element,
        "div",
        ["developerContainer"]
      );

      this.developersName = new Paragraph(
        this.developersContainer.element,
        ["developersName"],
        DEVELOPERS[i].fullname
      );

      this.developersGit = new Link(
        this.developersContainer.element,
        DEVELOPERS[i].github,
        ["developersGit"],
        `@${DEVELOPERS[i].github.split("/").reverse()[0]}`
      );

      this.developersAbout = new Paragraph(
        this.developersContainer.element,
        ["developersAbout"],
        DEVELOPERS[i].about
      );

      this.developersImage = new Image(
        this.developersContainer.element,
        ["developersImage"],
        DEVELOPERS[i].image,
        DEVELOPERS[i].alt
      );
    }
  }
}
