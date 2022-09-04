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
    this.linkToAudioGame.element.addEventListener('click', () => {
      localStorage.setItem('fromWhereToStart','games')
    })

    this.linkToSprintGame = new Link(
      this.element,
      "#/game_sprint",
      ["linkToSprintGame", "linkToGame"],
      "Игра “СПРИНТ”"
    );
    this.linkToSprintGame.element.addEventListener('click', () => {
      localStorage.setItem('fromWhereToStart','games')
    })

    this.langLevelBtns.map((button,index) => { 
      button.element.dataset.button = "groupLevel";
      button.element.dataset.difficultyLevel = `${index}`;
      button.element.addEventListener('click', ()=>{ 
          localStorage.removeItem('onpage');
          this.langLevelBtns.map((button,index) => { 
              button.element.classList.remove("active") 
          })
          button.element.classList.add("active")
          localStorage.setItem('difficultyLevel',`${index}`)
      })
  })
  }
}
