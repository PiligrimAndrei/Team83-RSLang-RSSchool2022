import { Component } from "../../components/components";
import { BookNavigation } from "../../components/bookNavigation/bookNavigation";
import { BookCards } from "../../components/bookCards/bookCards";
import { BookPagination } from "../../components/bookPagination/bookPagination";
import { BookGames } from "../../components/bookGames/bookGames";
import { getWords } from "../../api/api";
import { getWord } from "../../api/api";
import { IWord } from '../../interfaces/interfaces';


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

    if (target.dataset.button === `groupLevel`) {
      
        let difficultyLevel: number = Number(target.dataset.difficultyLevel);
        if(difficultyLevel === LSdifficultyLevel){
          return
        }
        let response = await getWords(difficultyLevel);
        console.log(response?.words)
        if( response ){
          let word: IWord  = response?.words[0]
          this.bookCards?.destroy()
          this.bookCards = new BookCards(this.element, response.words, word)
        }
        localStorage.setItem('difficultyLevel', `${difficultyLevel}`);
        localStorage.setItem('pageNumber', `0`);
        numPage.innerHTML = `1`
        localStorage.setItem('currentCard', `0`);

    }
    else {
      if ( target.hasAttribute('data-id')) return;
      let response = await getWords(LSdifficultyLevel, LSpageNumber);
      console.log(response?.words)
      if( response){
        let word: IWord  = response?.words[LScurrentCard]
        this.bookCards = new BookCards(this.element, response.words, word);
        
      }
    }
  }
  
  async goToPage(event: Event){
    let LSdifficultyLevel = Number(localStorage.getItem('difficultyLevel'))
    let LSpageNumber = Number(localStorage.getItem('pageNumber'))
    let LScurrentCard = Number(localStorage.getItem('currentCard'))

    let target = event.target as HTMLElement;
    let nextPage = LSpageNumber + 1
    if(target.classList.contains("arrowForward")){
      let numPage = document.querySelector('.pageNumber') as HTMLParagraphElement
      let response = await getWords(LSdifficultyLevel, nextPage);
      if( response){
        console.log(response.words)
        this.bookCards?.destroy()
        let word: IWord  = response?.words[LScurrentCard]
        this.bookCards = new BookCards(this.element, response.words, word);
      }
      numPage.innerHTML = `${1 + nextPage}`
      localStorage.setItem('pageNumber', `${nextPage}`);
      localStorage.setItem('currentCard', `0`);

    }
    
  }
  

}