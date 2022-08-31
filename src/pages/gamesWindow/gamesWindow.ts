import "./gamesWindow.css";
import { Component } from "../../components/components";
import { Button } from "../../components/button/button";
import { Heading } from "../../components/heading/heading";
import { DIFFICULTIES } from "../../constants/data";
import { Link } from "../../components/link/link";

export class GamesWindow extends Component {
  private gamesWindowHeading: Heading;
  private langLevelBtns: Button[];
  private linkToSprintGame: Link;
  private linkToAudioGame: Link;
  private langLevelBtn: Button | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["gamesWindow"]);

    this.gamesWindowHeading = new Heading(
      this.element,
      "h2",
      ["gamesWindowHeading"],
      "Выберите уровень сложности"
    );

    this.langLevelBtns = [];

    for (let i = 0; i < DIFFICULTIES.length; i += 1) {
      this.langLevelBtn = new Button(
        this.element,
        "button",
        ["langLevelBtn", `langLevelBtn${DIFFICULTIES[i]}`, "langLevelBtnGames"],
        `${DIFFICULTIES[i]}`
      );
      this.langLevelBtns.push(this.langLevelBtn);
    }

    this.linkToAudioGame = new Link(
      this.element,
      "#/game_audio",
      ["linkToAudioGame", "linkToGame"],
      "Игра “АУДИОВЫЗОВ”"
    );

    this.linkToSprintGame = new Link(
      this.element,
      "#/game_sprint",
      ["linkToSprintGame", "linkToGame"],
      "Игра “СПРИНТ”"
    );
  }
}
