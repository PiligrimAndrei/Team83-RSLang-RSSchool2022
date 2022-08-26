import { getWord, getWords } from "../../api/api";
import { Button } from "../../components/button/button";
import { Component } from "../../components/components";
import { Paragraph } from "../../components/paragraph/paragraph";
import { Span } from "../../components/span/span";
import { IWord } from "../../interfaces/interfaces";
import '../gameSprint/gameSprint.css'
export class GameSprint extends Component {
  private counter: Span;
  private counterContainer: Component;
  private scoreWord: Paragraph;
  private totalScore: Paragraph;
  private progressBar!: Component;
  private progressBarContainer: Component;
  private translateWord: Paragraph;
  private currentWord: Paragraph;
  private buttonYes: Button;
  private buttonNo: Button;
  group = 1;
  page = 1;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['game_sprint']);
    this.getWordsForGame(this.group, this.page,);

    this.counterContainer = new Component(
      this.element,
      "div",
      ["counterConteiner"]
    );
    this.counter = new Span(
      this.counterContainer.element,
      ["counter"],
      "60"
    );

    this.scoreWord = new Paragraph(
      this.element,
      ['scoreWord'],
      '+10 баллов за слово'
    )
    this.totalScore = new Paragraph(
      this.element,
      ['totalScore'],
      '0 баллов'
    )

    this.progressBarContainer = new Component(
      this.element,
      'div',
      ['progress__bar-container']
    );

    for (let i = 0; i < 3; i++) {
      this.progressBar = new Component(
        this.progressBarContainer.element,
        'div',
        ['progress__bar'],
        '0'
      );
    }

    this.translateWord = new Paragraph(
      this.element,
      ['translate__word'],
      'five'
    );

    this.currentWord = new Paragraph(
      this.element,
      ['current__word'],
      'пять'
    );

    this.buttonYes = new Button(
      this.element,
      'submit',
      ['button__yes'],
      'ДА'
    );

    this.buttonNo = new Button(
      this.element,
      'submit',
      ['button__no'],
      'НЕТ'
    );
  }

  private async getWordsForGame(group: number, page: number): Promise<void> {
    const data = await getWords(1, 1);

    if (data) {
      const wordArr: Array<IWord> = data.words
    }
  }
}