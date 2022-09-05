import "./SprintGameDescription.css";
import { Component } from "../components";
import { Heading } from "../heading/heading";
import { Paragraph } from "../paragraph/paragraph";
import { Button } from "../button/button";

export class SprintGameDescription extends Component {
  private SprintGameHeading: Heading;
  private SprintGameDescription: Paragraph;
  private SprintGameStartButton: Button;
  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["SprintGameDescription"]);

    this.SprintGameHeading = new Heading(
      this.element,
      "h2",
      ["SprintGameHeading"],
      "Спринт"
    );

    this.SprintGameDescription = new Paragraph(
      this.element,
      ["SprintGameDescriptionText"],
      "Выберите правильный или неправильный перевод слова"
    );

    this.SprintGameStartButton = new Button(
      this.element,
      "button",
      ["SprintGameStartButton"],
      "Начать"
    );
  }
}
