import "./audioGameMain.css";
import { Component } from "../components";
import { Image } from "../image/image";
import { Paragraph } from "../paragraph/paragraph";
import { Button } from "../button/button";
import {
  MAX_CARDS_ON_AUDIOGAME,
  MAX_DESCRIPTION_FIELDS_ON_CARD,
} from "../../constants/data";

export class AudioGameMain extends Component {
  private audioGamePlaySound: Button;
  private audioGameCards: Component;
  private audioGameCardButton: Button | undefined;
  private audioGameCurrentCard: Component;
  private currentCardImage: Image;
  private currentCardDescription: Component;
  private currentCardAudioButton: Button;
  private currentCardDescriptionField: Paragraph | undefined;
  private audioGameNextButton: Button;
  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["AudioGameMain"]);

    this.audioGamePlaySound = new Button(
      this.element,
      "button",
      ["audioGamePlaySound"],
      ""
    );

    this.audioGameCurrentCard = new Component(this.element, "div", [
      "audioGameCurrentCard",
    ]);

    this.currentCardImage = new Image(
      this.audioGameCurrentCard.element,
      ["currentCardImage"],
      "src",
      "alt"
    );

    this.currentCardDescription = new Component(
      this.audioGameCurrentCard.element,
      "div",
      ["currentCardDescription"]
    );

    this.currentCardAudioButton = new Button(
      this.currentCardDescription.element,
      "button",
      ["currentCardAudioButton"],
      ""
    );

    for (let i = 0; i < MAX_DESCRIPTION_FIELDS_ON_CARD; i += 1) {
      this.currentCardDescriptionField = new Paragraph(
        this.currentCardDescription.element,
        ["currentCardDescriptionField"],
        "word"
      );
    }

    this.audioGameCards = new Component(this.element, "div", [
      "audioGameCards",
    ]);

    for (let i = 0; i < MAX_CARDS_ON_AUDIOGAME; i += 1) {
      this.audioGameCardButton = new Button(
        this.audioGameCards.element,
        "button",
        ["audioGameCardButton"],
        "word"
      );
      this.audioGameCardButton.element.addEventListener("click", () => {
        this.audioGamePlaySound.element.style.display = "none";
        this.audioGameCurrentCard.element.style.display = "flex";
        this.audioGameNextButton.element.innerHTML = "Далее";
      });
    }

    this.audioGameNextButton = new Button(
      this.element,
      "button",
      ["audioGameNextButton"],
      "Не знаю"
    );

    this.audioGameNextButton.element.addEventListener("click", () => {
      this.audioGameCurrentCard.element.style.display = "none";
      this.audioGamePlaySound.element.style.display = "flex";
      this.audioGameNextButton.element.innerHTML = "Не знаю";
    });
  }
}
