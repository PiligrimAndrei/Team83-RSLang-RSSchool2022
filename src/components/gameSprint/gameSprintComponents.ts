import { getRefreshToken, getWord, getWords } from "../../api/api";
import { createUserWord, getUserWords } from "../../api/userWordApi";
import { Button } from "../../components/button/button";
import { Component } from "../../components/components";
import { Paragraph } from "../../components/paragraph/paragraph";
import { Span } from "../../components/span/span";
import { TAG } from "../../constants/constants";
import { IUserWord, IWord } from "../../interfaces/interfaces";
import '../gameSprint/gameSprint.css'

export class GameSprint extends Component {
  private counter: Span;
  private counterContainer: Component;
  private scoreWordTag: Paragraph;
  private scoreWord: number = 10;
  private totalScoreTag: Paragraph;
  private totalScore: number = 0;
  private progressBar!: Component;
  private progressBarContainer: Component;
  private scoreContainer: Component;
  private buttonContainer: Component;
  private translateWord: Span;
  private currentWord: Span;
  private defis: Span;
  private words: Paragraph;
  private buttonYes: Button;
  private buttonNo: Button;
  private timer: string = '60'
  private isValid: number = 0;
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
      ["timer"],
      this.timer
    );
    this.scoreContainer = new Component(
      this.element,
      TAG.div,
      ['score__container']
    )
    this.scoreWordTag = new Paragraph(
      this.scoreContainer.element,
      ['scoreWord'],
      '+10 баллов за слово'
    )
    this.totalScoreTag = new Paragraph(
      this.scoreContainer.element,
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

    this.words = new Paragraph(
      this.element,
      ['words'],
      ''
    )
    this.translateWord = new Span(
      this.words.element,
      ['translate__word'],
      ' '
    );
    this.defis = new Span(
      this.words.element,
      ['defis'],
      ' - '
    );
    this.currentWord = new Span(
      this.words.element,
      ['current__word'],
      ' '
    );
    this.buttonContainer = new Component(
      this.element,
      TAG.div,
      ['button__container']
    )

    this.buttonYes = new Button(
      this.buttonContainer.element,
      'submit',
      ['button__yes'],
      'ДА'
    );

    this.buttonNo = new Button(
      this.buttonContainer.element,
      'submit',
      ['button__no'],
      'НЕТ'
    );

    /*if (this.totalScoreTag.element.textContent) {
      this.totalScore = +this.totalScoreTag.element.textContent
    }
    else this.totalScore = 0

    if (this.scoreWordTag.element.textContent) {
      this.scoreWord = +this.scoreWordTag.element.textContent
    }
    else this.scoreWord = 0*/

    this.buttonYes.element.addEventListener('click', this.submitYes);
    this.buttonNo.element.addEventListener('click', this.submitNo);
  }

  public async getWordsForGame(group: number, page: number): Promise<void> {
    const data = await getWords(1, 1);

    if (data) {
      const wordArr: Array<IWord> = data.words
      const random = Math.random();
      const isValid = Math.round(random);
      let randomWord = this.getRandomTranslateWord(wordArr)
      let guessWord = randomWord.word
      let guessTranslateWord = randomWord.wordTranslate
      let userId = sessionStorage.getItem('userId')
      let word: IUserWord = {
        difficulty: 'true',
        optional: {
          learned: true
        }
      }
      if (userId) {
        createUserWord(userId, randomWord.id, word)
        getUserWords(userId)
        this.renderWords(guessWord, guessTranslateWord)
      }
    }
  }
  public renderWords(wordC: string, wordT: string) {
    let translateWord = document.querySelector('.translate__word');
    let currentWord = document.querySelector('.current__word');
    if (translateWord) {
      translateWord.textContent = wordT
    }
    if (currentWord) {
      currentWord.textContent = wordC
    }
  }

  public getRandomTranslateWord(arr: IWord[]) {
    const random = Math.round(Math.random() * arr.length);
    return arr[random]
  }

  public submitYes() {
    if (this.isValid) {
      this.totalScore = this.totalScore + this.scoreWord
    }
    console.log('Очки', this.totalScore)
  }
  public submitNo() {

    if (!this.isValid) {
      this.totalScore = this.totalScore + this.scoreWord
    }
    console.log('Очки', this.totalScore)
  }
}


