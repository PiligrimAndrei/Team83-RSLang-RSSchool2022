import "./gameSprint.css";
import { Component } from "../../components/components";
import { GameSprint } from "../../components/gameSprint/gameSprintComponents";
import { Link } from "../../components/link/link";
import { SprintGameDescription } from '../../components/sprintGameDescription/sprintGameDescription'
export class GameSprintPage extends Component {
  //private gameSprintPage: Component;
  private SprintGameStartWrapper: Component;
  private SprintGameCloseLink: Link;
  private startButton: HTMLElement | null;
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
  }
}