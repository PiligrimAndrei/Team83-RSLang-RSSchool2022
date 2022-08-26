import "./gamesWindow.css";
import { Component } from "../../components/components";
import { Button } from "../../components/button/button";
import { Heading } from "../../components/heading/heading";
import { DIFFICULTIES } from "../../constants/data";
import { Link } from "../../components/link/link";

export class GamesWindow extends Component {
  gamesWindowHeading: Heading;
  langLevelBtns: Button[];
  linkToSprintGame: Link;
  linkToAudioGame: Link;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["gamesWindow"]);

    this.gamesWindowHeading = new Heading(
      this.element,
      "h2",
      ["gamesWindowHeading"],
      "Выберите уровень сложности"
    );

    this.langLevelBtns = [];

    DIFFICULTIES.map((difficulty) => {
      const langLevelBtn = new Button(
        this.element,
        "button",
        ["langLevelBtn", `langLevelBtn${difficulty}`, "langLevelBtnGames"],
        `${difficulty}`
      );
      this.langLevelBtns.push(langLevelBtn);
    });

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
