import { getRefreshToken, getWord, getWords } from "../../api/api";
import { createUserWord, getUserWords } from "../../api/userWordApi";
import { Button } from "../../components/button/button";
import { Component } from "../../components/components";
import { Paragraph } from "../../components/paragraph/paragraph";
import { Span } from "../../components/span/span";
import { TAG } from "../../constants/constants";
import { ModalWindow } from "../../components/modalWindow/modalWindow";
import { IUserWord, IWord, IWordStaticGame } from "../../interfaces/interfaces";
import '../gameSprint/gameSprint.css'
import correct from '../../assets/sounds/correct.mp3'
import wrong from '../../assets/sounds/wrong.mp3'
import { Word } from "../word/word";
import { touchRippleClasses } from "@mui/material";

export class GameSprintWindow extends Component {
  private words: IWord[];
  private timerTag: Span;
  private timerContainer: Component;
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
  private wordsTag: Paragraph;
  private buttonYes: Button;
  private buttonNo: Button;
  private timer: number = 5;
  private isValid: number = 0;
  private counterGood: number = 0;
  private guessWordId: IWord;
  private arrayStaticWords: Array<IWordStaticGame>;
  private modalWindow: ModalWindow | null;
  private preparent: HTMLElement;

  constructor(parentNode: HTMLElement, words: Array<IWord>) {
    super(parentNode, 'div', ['game_sprint_window']);
    this.preparent = parentNode;
    this.words = words;

    this.timerContainer = new Component(
      this.element,
      "div",
      ["timerContainer"]
    );
    this.timerTag = new Span(
      this.timerContainer.element,
      ["timer"],
      this.timer.toString()
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
        ''
      );
    }

    this.wordsTag = new Paragraph(
      this.element,
      ['words'],
      ''
    )
    this.translateWord = new Span(
      this.wordsTag.element,
      ['translate__word'],
      ' '
    );
    this.defis = new Span(
      this.wordsTag.element,
      ['defis'],
      ' - '
    );
    this.currentWord = new Span(
      this.wordsTag.element,
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
    )
    this.guessWordId = {
      id: '',
      group: 0,
      page: 0,
      word: '',
      image: '',
      audio: '',
      audioMeaning: '',
      audioExample: '',
      textMeaning: '',
      textExample: '',
      transcription: '',
      wordTranslate: '',
      textMeaningTranslate: '',
      textExampleTranslate: '',
    };
    this.arrayStaticWords = [{ word: this.guessWordId, correct: true, date: 0 }];
    this.SetTimer();
    this.nextWord();
    this.modalWindow = null

    this.buttonYes.element.addEventListener('click', () => {
      if (this.isValid) {
        this.totalScore = this.totalScore + this.scoreWord;
        this.setTotalCounter(this.totalScore)
        this.counterGood++
        this.setCounterGood(this.counterGood)
        new Audio(correct).play();
        this.arrayStaticWords.push({ word: this.guessWordId, correct: true, date: (Date.now()) })
      } else {
        this.setCounterGood(0);
        new Audio(wrong).play();
        this.arrayStaticWords.push({ word: this.guessWordId, correct: false, date: (Date.now()) })
      }
      this.nextWord();
    });
    this.buttonNo.element.addEventListener('click', () => {
      if (!this.isValid) {
        this.totalScore = this.totalScore + this.scoreWord;
        this.setTotalCounter(this.totalScore)
        this.counterGood++
        this.setCounterGood(this.counterGood)
        new Audio(correct).play();
        this.arrayStaticWords.push({ word: this.guessWordId, correct: true, date: (Date.now()) })
      } else {
        this.counterGood = 0
        this.renderCounterBar(this.counterGood)
        new Audio(wrong).play();
        this.arrayStaticWords.push({ word: this.guessWordId, correct: false, date: (Date.now()) })
      }
      this.nextWord();
    });
  }

  public SetTimer() {
    let interval = setInterval(() => {
      let timeoff = interval;
      this.GoTimer(timeoff)
    }, 1000)
    return interval
  }

  public GoTimer(interval: NodeJS.Timer) {
    if (this.timer > 0) {
      this.timer = this.timer - 1;
      this.renderTimer(this.timer)
    } else {
      clearInterval(interval);
      console.log('РЕЗУЛЬТАТ', this.arrayStaticWords)
      this.modalWindow = new ModalWindow(
        this.preparent,
        this.arrayStaticWords.slice(1)
      )
    }
  }

  public setCounterGood(counter: number): void {
    this.counterGood = counter;
    //console.log('SetCounter', counter, (counter !== 0 && counter % 3 == 0))
    if (counter == 0) {
      this.scoreWord = 10;
      this.renderWordScore(this.scoreWord)
    }
    if (counter !== 0 && counter % 3 == 0) {
      this.renderCounterBar(3);
      if (this.scoreWord < 80) {
        this.scoreWord = this.scoreWord * 2;
        this.renderWordScore(this.scoreWord)
      } else {
        this.scoreWord = 80;
        this.renderWordScore(this.scoreWord)
      }
    }
    else {
      this.renderCounterBar(counter % 3);
    }
  }

  public setTotalCounter(counter: number): void {
    this.totalScore = counter;
    this.renderTotalScore(counter)
  }
  public setWordCounter(counter: number): void {
    this.scoreWord = counter;
    this.renderWordScore(counter)
  }

  /* public async getWordsForGame(group: number, page: number): Promise<IWord[] | null> {
     const data = await getWords(group, page);
     if (data) {
       const wordArr: Array<IWord> = data.words
       return wordArr;
     }
     return null
   }*/
  public nextWord() {
    //console.log('Слова', this.words)
    //this.getWordsForGame(this.group, this.page,).then((wordsArr) => {
    let wordsArr = this.words
    const random = Math.random();
    this.isValid = Math.round(random);
    let guessTranslateWord, guessWord;
    let randomWord = this.getRandomTranslateWord(wordsArr)
    let randomWordTow = this.getRandomTranslateWord(wordsArr)
    if (randomWord && randomWordTow) {
      this.guessWordId = randomWord;
      guessWord = randomWord.word
      if (this.isValid) {
        guessTranslateWord = randomWord.wordTranslate
      } else guessTranslateWord = randomWordTow.wordTranslate

      let userId = localStorage.getItem('userId')
      let word: IUserWord = {
        difficulty: 'true',
        optional: {
          learned: 0
        }
      }
      if (userId) {
        getUserWords(userId)
        this.renderWords(guessWord, guessTranslateWord)
      } else window.location.hash = '/autorization'
    }
    // })
  }

  public getRandomTranslateWord(arr: IWord[] | null) {
    if (arr) {
      const random = Math.round(Math.random() * arr.length);
      return arr[random]
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

  public renderCounterBar(counter: Number) {
    const counterBar = document.querySelectorAll('.progress__bar')
    //console.log('counter', counter)
    if (counter > 0) {
      for (let i = 0; i < 3; i++) {
        counterBar[i].classList.remove('active')
      }
      for (let i = 0; i < counter; i++) {
        counterBar[i].classList.add('active')
      }
    } else {
      for (let i = 0; i < 3; i++) {
        counterBar[i].classList.remove('active')
      }
    }
  }

  public renderTotalScore(totalScore: Number) {
    const totalScoreTag = document.querySelector('.totalScore')
    if (totalScoreTag) totalScoreTag.textContent = totalScore.toString()
  }

  public renderWordScore(totalScore: Number) {
    const scoreWordTag = document.querySelector('.scoreWord')
    if (scoreWordTag) scoreWordTag.textContent = '+' + totalScore.toString() + ' баллов за слово'
  }
  public renderTimer(time: number) {
    const timerTag = document.querySelector('.timer')
    if (timerTag) {
      if (time < 10) timerTag.textContent = '0' + time.toString()
      else timerTag.textContent = time.toString()
    }
  }

  /*public onFinish() {
    this.modalWindow = new ModalWindow(
      this.preparent,
      this.arrayStaticWords.slice(1)
    )
  }*/
}

