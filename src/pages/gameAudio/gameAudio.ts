import "./gameAudio.css";
import { AudioGameDescription } from "../../components/audioGameDescription/audioGameDescription";
import { AudioGameMain } from "../../components/audioGameMain/audioGameMain";
import { Component } from "../../components/components";
import { Link } from "../../components/link/link";
import { getWords } from "../../api/api";
import { IWord } from "../../interfaces/interfaces";
import { getUserWord } from '../../api/userWordApi';
import { MAX_CARDS_ON_PAGE } from '../../constants/data';

export class GameAudio extends Component {
  private AudioGameStartWrapper: Component;
  private AudioGameCloseLink: Link;
  private AudioGameWrapper: Component | undefined;
  private startButton: HTMLElement | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["gameAudio"]);

    this.AudioGameCloseLink = new Link(
      this.element,
      "#/games",
      ["AudioGameCloseLink"],
      "X"
    );

    this.AudioGameStartWrapper = new AudioGameDescription(this.element);

    this.startButton = this.AudioGameStartWrapper.element
      .lastElementChild as HTMLElement;

    this.startButton.onclick = this.startGame.bind(this);
    this.AudioGameCloseLink.element.addEventListener('click', () => {
      let header = document.querySelector(".header") as HTMLHeadElement;
      let footer = document.querySelector(".footer") as HTMLDivElement;
      header.style.display = 'flex';
      footer.style.display = 'flex';
    })
  }

  hideStartWrapper() {
    this.AudioGameStartWrapper.element.style.display = "none";
    this.AudioGameWrapper!.element.style.display = "flex";
  }

  async loadWords() {
    const pageNum = Number(localStorage.getItem("pageNumber"));
    const difficulty = Number(localStorage.getItem("difficultyLevel"));

    if (localStorage.getItem('fromWhereToStart') === "games") { 
      const randomPage = Math.floor(Math.random() * 30)
      const response = await getWords(difficulty, randomPage);
      if (response) {
        this.AudioGameWrapper = new AudioGameMain(this.element, response.words);
      }
    } else if (localStorage.getItem('fromWhereToStart') === "book" && 
      localStorage.getItem("onpage") !== 'user') { 
      const response = await getWords(difficulty, pageNum); 
        if (response) {
          let filtered = await this.filterNotLearned(response.words);
          if (filtered.length < MAX_CARDS_ON_PAGE) {
            const responsePrevPage = pageNum === 0 ? null : await getWords(difficulty, pageNum - 1);
            let numberToAdd = MAX_CARDS_ON_PAGE - filtered.length;
            if(responsePrevPage) {
              filtered = filtered.concat(responsePrevPage.words.slice(0,numberToAdd))
            }
          }
          this.AudioGameWrapper = new AudioGameMain(this.element, filtered);
        }
    }

    
  }
  async filterNotLearned(words: Array<IWord>) {
    const userId = localStorage.getItem('userId');
    let responseWords = []
    for (let word of words) {
      if (userId) {
        responseWords.push( getUserWord(userId,word.id))
      }
    }
    let userWords = await Promise.all(responseWords); 
    let filtered = words.filter((word,index) => userWords[index] === false ? word : userWords[index].optional.learned < 3);
    return filtered
  }

  async startGame() {
    await this.loadWords();
    this.hideStartWrapper();
  }
}
