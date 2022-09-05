import "./sprintGameMain.css";
import { getRefreshToken, getWord, getWords } from "../../api/api";
import { createUserWord, getUserWords } from "../../api/userWordApi";
import { GameSprintWindow } from "../../components/gameSprint/gameSprintWindow"
import { Button } from "../../components/button/button";
import { Component } from "../../components/components";
import { Paragraph } from "../../components/paragraph/paragraph";
import { Span } from "../../components/span/span";
import { TAG } from "../../constants/constants";
import { IUserWord, IWord } from "../../interfaces/interfaces";
import '../gameSprint/gameSprint.css'
import correct from '../../assets/sounds/correct.mp3'
import wrong from '../../assets/sounds/wrong.mp3'

export class SprintGameMain extends Component {
  private gameSprintWindow: GameSprintWindow;
  private words: IWord[];

  constructor(parentNode: HTMLElement, words: Array<IWord>) {
    super(parentNode, 'div', ['sprintGameMain']);

    this.words = words;

    this.gameSprintWindow = new GameSprintWindow(
      this.element, words)


  }
}
