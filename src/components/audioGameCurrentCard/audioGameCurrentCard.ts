import "./audioGameCurrentCard.css";
import { Component } from "../components";
import { Image } from "../image/image";
import { Button } from "../button/button";
import { Paragraph } from "../paragraph/paragraph";
import { IWord } from "../../interfaces/interfaces";

export class AudioGameCurrentCard extends Component {
  private currentCardImage: Image;
  private currentCardDescription: Component;
  private currentCardAudioButton: Button;
  private currentCardDescriptionWord: Paragraph;
  private currentCardDescriptionTranscription: Paragraph;
  private currentCardDescriptionTranslate: Paragraph;
  private correctWord: IWord;

  constructor(parentNode: HTMLElement, correctWord: IWord) {
    super(parentNode, "div", ["audioGameCurrentCard"]);
    this.currentCardImage = new Image(
      this.element,
      ["currentCardImage"],
      `./${correctWord.image}`,
      "word"
    );
    
    this.correctWord = correctWord

    this.currentCardDescription = new Component(this.element, "div", [
      "currentCardDescription",
    ]);

    this.currentCardAudioButton = new Button(
      this.currentCardDescription.element,
      "button",
      ["currentCardAudioButton"],
      ""
    );

    this.currentCardDescriptionWord = new Paragraph(
      this.currentCardDescription.element,
      ["currentCardDescriptionField", "currentCardDescriptionWord"],
      correctWord.word
    );

    this.currentCardDescriptionTranscription = new Paragraph(
      this.currentCardDescription.element,
      ["currentCardDescriptionField", "currentCardDescriptionTranscription"],
      correctWord.transcription
    );

    this.currentCardDescriptionTranslate = new Paragraph(
      this.currentCardDescription.element,
      ["currentCardDescriptionField", "currentCardDescriptionTranslate"],
      correctWord.wordTranslate
    );

    this.currentCardAudioButton.element.onclick = this.playSound.bind(this)
  }

  playSound() {
    new Audio(`./${this.correctWord.audio}`).play()
  }
}
