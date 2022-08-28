import "./audioGameDescription.css";
import { Component } from "../components";
import { Heading } from "../heading/heading";
import { Paragraph } from "../paragraph/paragraph";
import { Button } from "../button/button";

export class AudioGameDescription extends Component {
  private audioGameHeading: Heading;
  private audioGameDescription: Paragraph;
  private audioGameStartButton: Button;
  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["AudioGameDescription"]);

    this.audioGameHeading = new Heading(
      this.element,
      "h2",
      ["AudioGameHeading"],
      "Аудиовызов"
    );

    this.audioGameDescription = new Paragraph(
      this.element,
      ["AudioGameDescription"],
      "Выберите из предложенных вариантов ответа правильный перевод слова, который услышите"
    );

    this.audioGameStartButton = new Button(
      this.element,
      "button",
      ["AudioGameStartButton"],
      "Начать"
    );
    this.audioGameStartButton.element.addEventListener("click", () => {
      this.element.style.display = "none";
    });
  }
}
