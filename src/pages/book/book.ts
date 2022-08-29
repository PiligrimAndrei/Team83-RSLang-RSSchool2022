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
    // this.bookPagination.element.onclick = this.goToNextPage.bind(this) 
  }

  async renderCards(event: Event , group?: Number, page?: Number) {
    let target = <HTMLButtonElement | HTMLImageElement | HTMLParagraphElement> event.target;
    if (target.dataset.button === `groupLevel`) {

        let difficultyLevel: number = Number(target.dataset.difficultyLevel);
        let response = await getWords(difficultyLevel);
        console.log(response?.words)
        if( response ){
          let word: IWord  = response?.words[0]
          this.bookCards?.destroy()
          this.bookCards = new BookCards(this.element, response.words, word)
        }

    }
    else {
      if ( target.hasAttribute('data-id')) return;
      let response = await getWords(0, 0);
      console.log(response?.words)
      if( response){
        let word: IWord  = response?.words[0]
        this.bookCards = new BookCards(this.element, response.words, word);
      }
    }
  }
  
  // goToNextPage(event: Event){
  //   let target = event.target as HTMLElement;
  //   if(target.dataset.direction === "next"){
  //     let nextPage = Number(target.dataset.page);

  //   }
  //   console.log(this.bookPagination)
  //   this.bookPagination.goToNextPage.apply(this)
  // }
  

}