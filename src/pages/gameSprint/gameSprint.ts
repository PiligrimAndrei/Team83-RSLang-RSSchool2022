import "./gameSprint.css";
import { Component } from "../../components/components";
import { GameSprint } from "../../components/gameSprint/gameSprintComponents";
import { Link } from "../../components/link/link";
import { SprintGameDescription } from '../../components/sprintGameDescription/sprintGameDescription'
import { SprintGameMain } from "../../components/sprintGameMain/sprintGameMain";
import { getWords } from "../../api/api";
export class GameSprintPage extends Component {
  //private gameSprintPage: Component;
  private SprintGameStartWrapper: Component;
  private SprintGameCloseLink: Link;
  private startButton: HTMLElement | null;
  private SprintGameWrapper: Component | undefined;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['gameSprint']);

    this.SprintGameCloseLink = new Link(
      this.element,
      "#/games",
      ["SprintGameCloseLink"],
      "X"
    );

    // this.gameSprintPage = new GameSprint(this.element);

    this.SprintGameStartWrapper = new SprintGameDescription(this.element);

    this.startButton = this.SprintGameStartWrapper.element
      .lastElementChild as HTMLElement;
    this.startButton.onclick = this.startGame.bind(this);

    this.SprintGameCloseLink.element.addEventListener('click', () => {
      let header = document.querySelector(".header") as HTMLHeadElement;
      let footer = document.querySelector(".footer") as HTMLDivElement;
      header.style.display = 'flex';
      footer.style.display = 'flex';
    })
  }
  hideStartWrapper() {
    this.SprintGameStartWrapper.element.style.display = "none";
    this.SprintGameWrapper!.element.style.display = "flex";
  }
  async loadWords() {
    const pageNum = Number(localStorage.getItem("pageNumber"));
    const difficulty = Number(localStorage.getItem("difficultyLevel"));

    const response = await getWords(difficulty, pageNum);
    if (response) {
      this.SprintGameWrapper = new SprintGameMain(this.element, response.words);
    }
  }

  async startGame() {
    await this.loadWords();
    this.hideStartWrapper();
  }
}