import { Component } from "../../components/components";
import { GameSprint } from "../../components/gameSprint/gameSprintComponents";
export class GameSprintPage extends Component {
  private gameSprintPage: Component;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['game_sprint_page']);

    this.gameSprintPage = new GameSprint(this.element);
  }
}