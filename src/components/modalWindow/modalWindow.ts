import { getWord } from "../../api/api";
import { TAG } from "../../constants/constants";
import { IWord, IWordStaticGame } from "../../interfaces/interfaces";
import { Component } from "../components";
import { Span } from "../span/span";
import '../modalWindow/modalWindow.css'

export class ModalWindow extends Component {
  private counterCorrectWords: Component;
  private counterUncorrectWords: Component;
  private correctWordContainer?: Component;
  private correctWord?: Span;
  private correctWordTranslate?: Span;
  private uncorrectWordContainer?: Component;
  private uncorrectWord?: Span;
  private uncorrectWordTranslate?: Span;

  constructor(parentNode: HTMLElement, arrayWords: Array<IWordStaticGame>) {
    super(parentNode, 'div', ['modal_result']);

    this.counterCorrectWords = new Component(
      this.element,
      TAG.div,
      ["correctWords"],
      'Знаю:' + arrayWords.filter((el) => el.correct == true).length
    );
    for (let i = 0; i < arrayWords.length; i++) {
      let currentWord = arrayWords[i];
      if (currentWord.correct) {
        const word = this.getCorrectWordForResult(arrayWords[i].word.id)
      }
    }
    /*
    this.correctWordContainer = new Component(
      this.counterCorrectWords.element,
      TAG.div,
      ["correctWordContainer"]
    )
    
    this.correctWord = new Span(
      this.counterCorrectWords.element,
      ['correct_word'],
      ''
    )
    this.correctWordTranslate = new Span(
      this.counterCorrectWords.element,
      [],
      ''
    )*/
    this.counterUncorrectWords = new Component(
      this.element,
      TAG.div,
      ["uncorrectWords"],
      'Не знаю: ' + arrayWords.filter((el) => el.correct == false).length
    );
    for (let i = 0; i < arrayWords.length; i++) {
      let currentWord = arrayWords[i];
      if (!currentWord.correct) {
        const word = this.getUncorrectWordForResult(arrayWords[i].word.id)
      }
    }
    /*this.uncorrectWordContainer = new Component(
      this.counterCorrectWords.element,
      TAG.div,
      ["correctWordContainer"]
    )
    this.uncorrectWord = new Span(
      this.counterCorrectWords.element,
      ['uncorrect_word'],
      ''
    )
    this.uncorrectWordTranslate = new Span(
      this.counterCorrectWords.element,
      [],
      ''
    )*/
  }

  public async getCorrectWordForResult(wordId: string): Promise<string> {
    const data = await getWord(wordId);
    if (data) {
      const wordForResult: string = data.word
      const wordForResultTranslate: string = data.wordTranslate
      this.correctWordContainer = new Component(
        this.counterCorrectWords.element,
        TAG.div,
        ["correctWordContainer"]
      )

      this.correctWord = new Span(
        this.counterCorrectWords.element,
        ['correct_word'],
        wordForResult + ' - '
      )
      this.correctWordTranslate = new Span(
        this.counterCorrectWords.element,
        ['correct_word'],
        wordForResultTranslate
      )
      return wordForResult;
    }
    return ''
  }
  public async getUncorrectWordForResult(wordId: string): Promise<string> {
    const data = await getWord(wordId);
    if (data) {
      const wordForResult: string = data.word
      const wordForResultTranslate: string = data.wordTranslate
      this.uncorrectWordContainer = new Component(
        this.counterUncorrectWords.element,
        TAG.div,
        ["correctWordContainer"]
      )

      this.uncorrectWord = new Span(
        this.counterUncorrectWords.element,
        ['uncorrect_word'],
        wordForResult + ' - '
      )
      this.uncorrectWordTranslate = new Span(
        this.counterUncorrectWords.element,
        ['uncorrect_word'],
        wordForResultTranslate
      )
      return wordForResult;
    }
    return ''
  }
}
