import "./audioGameMain.css";
import { Component } from "../components";
import { AudioGameCurrentCard } from "../audioGameCurrentCard/audioGameCurrentCard";
import { Button } from "../button/button";
import { IWord, IPlayed, IUserWord } from '../../interfaces/interfaces';
import { AudioGameGuessCards } from "../audioGameGuessCards/audioGameGuessCards";
import { audioGameStatistic } from '../audioGameStatistic/audioGameStatistic';
import { getUserWord, updateUserWord, createUserWord } from '../../api/userWordApi';
import { commonUserWord } from '../../constants/data';
import correct from '../../assets/sounds/correct.mp3'
import wrong from '../../assets/sounds/wrong.mp3'

export class AudioGameMain extends Component {
  private audioGamePlaySound: Button;
  private audioGameCurrentCard: AudioGameCurrentCard;
  private words: Array<IWord>;
  private audioGameGuessCards: AudioGameGuessCards;
  private chosedWords: string[];
  private correctWord: IWord;
  private wordsPlayedInRound: Array<IPlayed>;
  private audioGameStatistic: audioGameStatistic | undefined;
  header: HTMLHeadElement | null;

  constructor(parentNode: HTMLElement, words: Array<IWord>) {
    super(parentNode, "div", ["AudioGameMain"]);

    this.header = document.querySelector('.header')
    this.header!.style.display = 'none'

    this.wordsPlayedInRound = [];
    this.words = words;
    this.chosedWords = [];

    this.audioGamePlaySound = new Button(
      this.element,
      "button",
      ["audioGamePlaySound"],
      ""
    );
    this.correctWord = words.slice(0, 5)[Math.floor(Math.random() * 5)];

    this.audioGameCurrentCard = new AudioGameCurrentCard(
      this.element,
      this.correctWord
    );

    this.audioGameGuessCards = new AudioGameGuessCards(
      this.element,
      words.slice(0, 5),
      this.correctWord.id
    );

    this.audioGameGuessCards.element.onclick = this.showCurrentCard.bind(this);
    this.audioGamePlaySound.element.onclick = this.playSound.bind(this);
  }

  playSound() {
    new Audio(`./${this.correctWord.audio}`).play()
  }
  showCurrentCard(event: Event): void {
    const target = event.target as HTMLButtonElement;
    const targetCardId = target.dataset.id;
    if (target.dataset.text === "unknown" && target.dataset.guess === "guess") {
      this.audioGamePlaySound.element.style.display = "flex";
      this.audioGameCurrentCard.element.style.display = "none";
      this.renderGuessCards(this.words);
    } else if (target.dataset.guess === "guess") {
      this.renderCurrentCard(this.correctWord);
      this.changeStyles(target,this.correctWord);
      this.sendToCurrentStatistic(target, this.correctWord);
      this.audioGamePlaySound.element.style.display = "none";
      this.audioGameCurrentCard.element.style.display = "flex";
      this.chosedWords.push(targetCardId!);
    }
  }

  sendToCurrentStatistic(button: HTMLButtonElement, correctWord: IWord) {
    if (button.dataset.id === correctWord.id && button.classList.contains('audioGameCardButton')) {
      this.wordsPlayedInRound.push({id: correctWord.id , word: correctWord.word, guessed: true, transcription: correctWord.transcription, translate: correctWord.wordTranslate})
    } else if ((button.dataset.id !== correctWord.id && button.classList.contains('audioGameCardButton')) || button.classList.contains('audioGameNextButton')){
      this.wordsPlayedInRound.push({id: correctWord.id , word: correctWord.word, guessed: false, transcription: correctWord.transcription, translate: correctWord.wordTranslate})
    }
  }

  async sendToUserWordStatistic(words: Array<IPlayed>) {
    let userId = localStorage.getItem('userId');
    console.log(words)
    if (userId){ 
      for (let word of words) {
        const getResponse = await getUserWord(userId, word.id);
        if(getResponse) {
          let body = Object.assign({}, getResponse);
          body.optional.countUseAudiocall += 1
          body.optional.countUse += 1;
          if(word.guessed){
            body.optional.countCorrectAudiocall += 1
            body.optional.learned += 1
            body.optional.learned >= 3 ? body.difficulty = 'easy' : null
          } else {
            body.optional.learned = 0
          }
          delete body.id;
          delete body.wordId;
          const updateResponce = updateUserWord(userId,word.id,body);
        } else {
          let newWord = Object.assign({},commonUserWord);
          newWord.optional.countUseAudiocall = 1
          newWord.optional.countUse! += 1;
          if (word.guessed) {
            newWord.optional.learned += 1 
            newWord.optional.countCorrectAudiocall = 1
          } else {
            newWord.optional.countCorrectAudiocall = 0
          }
          const createResponse = createUserWord(userId,word.id,newWord)
        }
      }
    }
  }

  changeStyles(button: HTMLButtonElement, correctWord: IWord): void {
    if (button.dataset.id === correctWord.id && button.classList.contains('audioGameCardButton')) {
      new Audio(correct).play()
      button.classList.add('correct')
      this.audioGameCurrentCard.element.classList.add('correct');
    } else if ((button.dataset.id !== correctWord.id && button.classList.contains('audioGameCardButton')) || button.classList.contains('audioGameNextButton')){
      new Audio(wrong).play()
      button.classList.add('wrong');
      this.audioGameCurrentCard.element.classList.add('wrong');
      let correctButton = this.audioGameGuessCards.audioGameGuessButtons.find(button => button.element.dataset.id === correctWord.id);
      correctButton?.element.classList.add('correct')
    }
  }

  renderGuessCards(words: Array<IWord>): void {
    const wordsToPlay = words.filter(
      (word) => !this.chosedWords.includes(word.id)
    );
    let fiveWordsToRender: Array<IWord> = [];
    this.shuffleWords(wordsToPlay);
    const nextWord = wordsToPlay[this.getRandomNumber(wordsToPlay.length)];
    this.correctWord = nextWord;
    if (wordsToPlay.length < 5) {
      this.addMoreCardsToPlay(wordsToPlay);
      fiveWordsToRender = wordsToPlay;
    } else {
      fiveWordsToRender = wordsToPlay
        .filter((word) => word.id !== nextWord.id)
        .slice(0, 4);
      fiveWordsToRender.push(nextWord);
      this.shuffleWords(fiveWordsToRender);
    }
    if (this.chosedWords.length === words.length) {
      this.audioGameGuessCards.destroy()
      this.audioGamePlaySound.destroy()    
      this.audioGameStatistic = new audioGameStatistic(this.element, this.wordsPlayedInRound)  
      this.sendToUserWordStatistic(this.wordsPlayedInRound)
    } else {
      this.audioGameGuessCards.destroy();
      this.audioGameGuessCards = new AudioGameGuessCards(
        this.element,
        fiveWordsToRender,
        nextWord.id
      );
      this.audioGameGuessCards.element.onclick =
        this.showCurrentCard.bind(this);
    }
  }

  renderCurrentCard(correctWord: IWord): void {
    this.audioGameCurrentCard = new AudioGameCurrentCard(
      this.element,
      correctWord
    );
  }

  getRandomNumber(number: number): number {
    return Math.floor(Math.random() * number);
  }

  shuffleWords(words: Array<IWord>): void {
    words.sort(() => Math.random() - 0.5);
  }

  addMoreCardsToPlay(words: Array<IWord>): void {
    const previousIndex: number[] = [];
    while (words.length < 5) {
      const randomIndex = this.getRandomNumber(this.chosedWords.length);
      if (!previousIndex.includes(randomIndex)) {
        previousIndex.push(randomIndex);
        const cardIdToAdd = this.chosedWords[randomIndex];
        const cardToAdd = this.words.find((word) => word.id === cardIdToAdd);
        words.push(cardToAdd!);
      } else {
        this.addMoreCardsToPlay(words);
      }
    }
  }
}
