import { Component } from "../../components/components";
import { BookNavigation } from "../../components/bookNavigation/bookNavigation";
import { BookCards } from "../../components/bookCards/bookCards";
import { BookPagination } from "../../components/bookPagination/bookPagination";
import { BookGames } from "../../components/bookGames/bookGames";
import { getWords } from "../../api/api";
import { getWord } from "../../api/api";
import { IUserWord, IWord } from '../../interfaces/interfaces';
import { getUserWords } from '../../api/userWordApi';


export class Book extends Component {
  private bookNavigation: BookNavigation;
  private bookCards: BookCards | undefined;
  private bookPagination: BookPagination;
  private bookGames: BookGames;
  private word: BookCards | undefined;
  
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['book']);

    this.bookNavigation = new BookNavigation(this.element)
    //this.bookCards = new BookCards(this.element, )
    this.bookPagination = new BookPagination(this.element)
    this.bookGames = new BookGames(this.element)

    this.bookNavigation.element.onclick = this.renderCards.bind(this)
    this.bookNavigation.element.click()
    this.bookPagination.element.onclick = this.goToPage.bind(this) 
  }

  async renderCards(event: Event , group?: Number, page?: Number) {
    let target = <HTMLButtonElement | HTMLImageElement | HTMLParagraphElement> event.target;
    let numPage = document.querySelector('.pageNumber') as HTMLParagraphElement

    let LSdifficultyLevel = Number(localStorage.getItem('difficultyLevel'))
    let LSpageNumber = Number(localStorage.getItem('pageNumber')) 
    let LScurrentCard = Number(localStorage.getItem('currentCard'))
    let userId = localStorage.getItem('userId')
    let userPage = localStorage.getItem('onpage')

    if(target.dataset.button === 'hardword') {
      this.renderUserWords("hard")
      localStorage.setItem('pageNumber','0');
      localStorage.setItem('difficultyLevel','0');
      numPage.innerHTML = '1';
      this.bookPagination.element.firstElementChild?.classList.add('disabled');
      this.bookPagination.element.lastElementChild?.classList.add('disabled');
    }
    else if(target.dataset.button === 'learnedword') {
      this.renderUserWords("learned")
      localStorage.setItem('pageNumber','0');
      localStorage.setItem('difficultyLevel','0');
      numPage.innerHTML = '1'
      this.bookPagination.element.firstElementChild?.classList.add('disabled');
      this.bookPagination.element.lastElementChild?.classList.add('disabled');
    }
    else if (target.dataset.button === `groupLevel`) {
        let difficultyLevel: number = Number(target.dataset.difficultyLevel);
        if(difficultyLevel === LSdifficultyLevel){
          return
        }
        let response = await getWords(difficultyLevel);
        if( response ){ 
          let allUserWords = await this.getFilteredUserWords(response.words);
          let word: IWord  = response?.words[0]
          this.bookCards?.destroy()
          this.bookCards = new BookCards(this.element, response.words, word, allUserWords)
        }
        this.bookPagination.element.firstElementChild?.classList.add('disabled');
        this.bookPagination.element.lastElementChild?.classList.remove('disabled');

        localStorage.setItem('difficultyLevel', `${difficultyLevel}`);
        localStorage.setItem('pageNumber', `0`);
        numPage.innerHTML = `1`
        localStorage.setItem('currentCard', `0`);

    }
    else {
      if ( target.hasAttribute('data-id')) return;
      if (userPage === 'user') {
        let difficulty = localStorage.getItem('userdifficulty');
        if(difficulty) this.renderUserWords(difficulty);
        numPage.innerHTML = '1'
        this.bookPagination.element.firstElementChild?.classList.add('disabled');
        this.bookPagination.element.lastElementChild?.classList.add('disabled');
      } else {
      let response = await getWords(LSdifficultyLevel, LSpageNumber);
      if( response){
        let allUserWords = await this.getFilteredUserWords(response.words);
        let word: IWord  = response?.words[LScurrentCard]
        this.bookCards = new BookCards(this.element, response.words, word, allUserWords);
        numPage.innerHTML = `${LSpageNumber + 1}`
      }
    }
    }
  }
  
  async getFilteredUserWords(words: Array<IWord>): Promise<(IUserWord | null)[]> {
    let userId = localStorage.getItem('userId');
    let allUserWords = await getUserWords(userId!);
    let filteredUserWords = []
    for (let i = 0; i < words.length; i += 1) {

      let oneUserWord = allUserWords.filter((word: {wordId: string}) => word.wordId === words[i].id);
      if(oneUserWord.length !== 0) {
        delete oneUserWord[0].id 
        delete oneUserWord[0].wordId
        filteredUserWords.push(oneUserWord[0]);
      } else {
        filteredUserWords.push(null);
      }
    }
    return filteredUserWords

  }

  async goToPage(event: Event){
    let LSdifficultyLevel = Number(localStorage.getItem('difficultyLevel'))
    let LSpageNumber = Number(localStorage.getItem('pageNumber'))
    let LScurrentCard = Number(localStorage.getItem('currentCard'))
    let target = event.target as HTMLElement;
    let nextPage = LSpageNumber + 1
    let prePage = LSpageNumber - 1
    if(localStorage.getItem('onpage') === 'user') {
      return
    }

    if(target.classList.contains("arrowForward") && LSpageNumber !== 29){
      let numPage = document.querySelector('.pageNumber') as HTMLParagraphElement
      let response = await getWords(LSdifficultyLevel, nextPage);
      if( response){
        let allUserWords = await this.getFilteredUserWords(response.words);
        this.bookCards?.destroy()
        let word: IWord  = response?.words[LScurrentCard]
        this.bookCards = new BookCards(this.element, response.words, word, allUserWords);
      }
      numPage.innerHTML = `${nextPage +1}`
      localStorage.setItem('pageNumber', `${nextPage}`);
      localStorage.setItem('currentCard', `0`);
    }
    if(target.classList.contains("arrowBack") && LSpageNumber !== 0){
      let numPage = document.querySelector('.pageNumber') as HTMLParagraphElement
      let response = await getWords(LSdifficultyLevel, prePage);
      if( response){
        let allUserWords = await this.getFilteredUserWords(response.words);
        this.bookCards?.destroy()
        let word: IWord  = response?.words[LScurrentCard]
        this.bookCards = new BookCards(this.element, response.words, word, allUserWords);
      }
      numPage.innerHTML = `${ LSpageNumber}`
      localStorage.setItem('pageNumber', `${prePage}`);
      localStorage.setItem('currentCard', `0`);
    }
  }
  
  async renderUserWords(parameter: string) {
    localStorage.setItem('onpage','user');
    localStorage.setItem('userdifficulty',parameter);
    let userId = localStorage.getItem('userId');
    let allUserWords = await getUserWords(userId!);
    let filteredUserWords = parameter === "hard" ?
    allUserWords.filter((word: { difficulty: string; }) => word.difficulty === "hard") :
    allUserWords.filter((word: { optional: { learned: number}}) => word.optional.learned > 2);
    let promises = []
    let allWords = []
    for (let userWord of filteredUserWords) {
      promises.push(getWord(userWord.wordId));
    }
    let response = await Promise.all(promises);
    for (let word of response) {
      if( word !== null){
        allWords.push(word);
      }
    }
    let firstWord = allWords[0]
    this.bookCards?.destroy();
    this.bookCards = new BookCards(this.element, allWords, firstWord, filteredUserWords);
  }


}