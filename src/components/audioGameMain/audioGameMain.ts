import "./audioGameMain.css";
import { Component } from "../components";
import { AudioGameCurrentCard } from "../audioGameCurrentCard/audioGameCurrentCard";
import { Button } from "../button/button";
import { IWord } from "../../interfaces/interfaces";
import { AudioGameGuessCards } from "../audioGameGuessCards/audioGameGuessCards";

export class AudioGameMain extends Component {
  private audioGamePlaySound: Button;
  private audioGameCurrentCard: AudioGameCurrentCard;
  private words: Array<IWord>;
  private audioGameGuessCards: AudioGameGuessCards;
  private chosedWords: string[];
  private correctWord: IWord;

  constructor(parentNode: HTMLElement, words: Array<IWord>) {
    super(parentNode, "div", ["AudioGameMain"]);

    this.words = words;
    this.chosedWords = [];

    this.audioGamePlaySound = new Button(
      this.element,
      "button",
      ["audioGamePlaySound"],
      ""
    );
    this.correctWord = words.slice(0, 5)[Math.floor(Math.random() * 5)];

    this.audioGameCurrentCard = new AudioGameCurrentCard(
      this.element,
      this.correctWord
    );
    this.audioGameGuessCards = new AudioGameGuessCards(
      this.element,
      words.slice(0, 5),
      this.correctWord.id
    );
    this.audioGameGuessCards.element.onclick = this.showCurrentCard.bind(this);
  }

  showCurrentCard(event: Event): void {
    const target = event.target as HTMLButtonElement;
    const targetCardId = target.dataset.id;
    if (target.dataset.text === "unknown" && target.dataset.guess === "guess") {
      this.audioGamePlaySound.element.style.display = "flex";
      this.audioGameCurrentCard.element.style.display = "none";
      this.renderGuessCards(this.words);
    } else if (target.dataset.guess === "guess") {
      this.renderCurrentCard(this.correctWord);
      this.audioGamePlaySound.element.style.display = "none";
      this.audioGameCurrentCard.element.style.display = "flex";
      this.chosedWords.push(targetCardId!);
    }
  }

  renderGuessCards(words: Array<IWord>): void {
    const wordsToPlay = words.filter(
      (word) => !this.chosedWords.includes(word.id)
    );
    let fiveWordsToRender: Array<IWord> = [];
    this.shuffleWords(wordsToPlay);
    const nextWord = wordsToPlay[this.getRandomNumber(wordsToPlay.length)];
    this.correctWord = nextWord;
    if (wordsToPlay.length < 5) {
      this.addMoreCardsToPlay(wordsToPlay);
      fiveWordsToRender = wordsToPlay;
    } else {
      fiveWordsToRender = wordsToPlay
        .filter((word) => word.id !== nextWord.id)
        .slice(0, 4);
      fiveWordsToRender.push(nextWord);
      this.shuffleWords(fiveWordsToRender);
    }
    if (this.chosedWords.length === 20) {
      this.audioGameGuessCards.element.style.display = "none";
      this.audioGamePlaySound.element.style.display = "none";
    } else {
      this.audioGameGuessCards.destroy();
      this.audioGameGuessCards = new AudioGameGuessCards(
        this.element,
        fiveWordsToRender,
        nextWord.id
      );
      this.audioGameGuessCards.element.onclick =
        this.showCurrentCard.bind(this);
    }
  }

  renderCurrentCard(correctWord: IWord): void {
    this.audioGameCurrentCard = new AudioGameCurrentCard(
      this.element,
      correctWord
    );
  }

  getRandomNumber(number: number): number {
    return Math.floor(Math.random() * number);
  }

  shuffleWords(words: Array<IWord>): void {
    words.sort(() => Math.random() - 0.5);
  }

  addMoreCardsToPlay(words: Array<IWord>): void {
    const previousIndex: number[] = [];
    while (words.length < 5) {
      const randomIndex = this.getRandomNumber(this.chosedWords.length);
      if (!previousIndex.includes(randomIndex)) {
        previousIndex.push(randomIndex);
        const cardIdToAdd = this.chosedWords[randomIndex];
        const cardToAdd = this.words.find((word) => word.id === cardIdToAdd);
        words.push(cardToAdd!);
      } else {
        this.addMoreCardsToPlay(words);
      }
    }
  }
}
