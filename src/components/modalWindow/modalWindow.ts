import { getWord } from "../../api/api";
import { TAG } from "../../constants/constants";
import { IWord, IWordStaticGame } from "../../interfaces/interfaces";
import { Component } from "../components";
import { Span } from "../span/span";

export class ModalWindow extends Component {
  private counterCorrectWords: Component;
  //  private counterWorseWords: Component;
  private correctWordContainer: Component;
  private correctWord: Span;
  private correctWordTranslate: Span;

  constructor(parentNode: HTMLElement, arrayWords: Array<IWordStaticGame>) {
    super(parentNode, 'div', ['modal_result']);

    this.counterCorrectWords = new Component(
      this.element,
      TAG.div,
      ["correctWords"]
    );
    this.correctWordContainer = new Component(
      this.counterCorrectWords.element,
      TAG.div,
      ["correctWordContainer"]
    )
    this.correctWord = new Span(
      this.counterCorrectWords.element,
      [],
      ''
    )
    this.correctWordTranslate = new Span(
      this.counterCorrectWords.element,
      [],
      ''
    )

    for (let i = 0; i < arrayWords.length; i++) {
      const word = this.getWordForResult(arrayWords[i].word.id)
    }
  }

  public async getWordForResult(wordId: string): Promise<string> {
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
        [],
        wordForResult + ' - '
      )
      this.correctWordTranslate = new Span(
        this.counterCorrectWords.element,
        [],
        wordForResultTranslate
      )
      return wordForResult;
    }
    return ''
  }
}