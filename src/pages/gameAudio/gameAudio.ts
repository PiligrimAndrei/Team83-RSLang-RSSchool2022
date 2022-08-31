import "./gameAudio.css";
import { AudioGameDescription } from "../../components/audioGameDescription/audioGameDescription";
import { AudioGameMain } from "../../components/audioGameMain/audioGameMain";
import { Component } from "../../components/components";
import { Link } from "../../components/link/link";
import { getWords } from "../../api/api";
import { IWord } from "../../interfaces/interfaces";

export class GameAudio extends Component {
  private AudioGameStartWrapper: Component;
  private AudioGameCloseLink: Link;
  private AudioGameWrapper: Component | undefined;
  private startButton: HTMLElement | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["gameAudio"]);

    this.AudioGameCloseLink = new Link(
      this.element,
      "#/games",
      ["AudioGameCloseLink"],
      "X"
    );

    this.AudioGameStartWrapper = new AudioGameDescription(this.element);

    this.startButton = this.AudioGameStartWrapper.element
      .lastElementChild as HTMLElement;

    this.startButton.onclick = this.startGame.bind(this);
  }

  hideStartWrapper() {
    this.AudioGameStartWrapper.element.style.display = "none";
    this.AudioGameWrapper!.element.style.display = "flex";
  }

  async loadWords() {
    const pageNum = Number(localStorage.getItem("pageNumber"));
    const difficulty = Number(localStorage.getItem("difficultyLevel"));

    const response = await getWords(difficulty, pageNum);
    if (response) {
      this.AudioGameWrapper = new AudioGameMain(this.element, response.words);
    }
  }

  async startGame() {
    await this.loadWords();
    this.hideStartWrapper();
  }
}
