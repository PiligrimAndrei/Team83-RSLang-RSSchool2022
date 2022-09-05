import "./audioGameGuessCards.css";
import { Component } from "../components";
import { Button } from "../button/button";
import { MAX_CARDS_ON_AUDIOGAME } from "../../constants/data";
import { IWord } from "../../interfaces/interfaces";

export class AudioGameGuessCards extends Component {
  private audioGameCardButton: Button | undefined;
  private audioGameNextButton: Button;
  public audioGameGuessButtons: Array<Button>;
  private audioGameGuessContainer: Component;

  constructor(
    parentNode: HTMLElement,
    words: Array<IWord>,
    correctWordId: string
  ) {
    super(parentNode, "div", ["audioGameGuessCards"]);

    this.audioGameGuessContainer = new Component(this.element, "div", [
      "audioGameGuessContainer",
    ]);

    this.audioGameGuessButtons = [];

    for (let i = 0; i < MAX_CARDS_ON_AUDIOGAME; i += 1) {
      this.audioGameCardButton = new Button(
        this.audioGameGuessContainer.element,
        "button",
        ["audioGameCardButton"],
        words[i].word
      );
      this.audioGameCardButton.element.dataset.guess = "guess";
      this.audioGameCardButton.element.dataset.id = words[i].id;

      this.audioGameGuessButtons.push(this.audioGameCardButton);
      this.audioGameCardButton.element.addEventListener("click", () => {
        this.audioGameNextButton.element.dataset.text = "next";
        this.audioGameNextButton.element.innerHTML = "Далее";
        this.audioGameGuessButtons.forEach((button) => {
          const element = button.element as HTMLButtonElement;
          element.disabled = true;
        });
      });
    }

    this.audioGameNextButton = new Button(
      this.element,
      "button",
      ["audioGameNextButton"],
      "Не знаю"
    );
    this.audioGameNextButton.element.dataset.guess = "guess";
    this.audioGameNextButton.element.dataset.id = correctWordId;

    this.audioGameNextButton.element.addEventListener("click", () => {
      if (this.audioGameNextButton.element.dataset.text === "next") {
        this.audioGameNextButton.element.innerHTML = "Не знаю";
        this.audioGameNextButton.element.dataset.text = "unknown";
        this.audioGameGuessButtons.forEach((button) => {
          const element = button.element as HTMLButtonElement;
          element.disabled = false;
        });
      } else {
        this.audioGameNextButton.element.dataset.text = "next";
        this.audioGameNextButton.element.innerHTML = "Далее";
        this.audioGameGuessButtons.forEach((button) => {
          const element = button.element as HTMLButtonElement;
          element.disabled = true;
        });
      }
    });
  }
}
