import { Component } from "../../components/components";
import { BookNavigation } from "../../components/bookNavigation/bookNavigation";
import { BookCards } from "../../components/bookCards/bookCards";
import { BookPagination } from "../../components/bookPagination/bookPagination";
import { BookGames } from "../../components/bookGames/bookGames";

export class Book extends Component {
  private bookNavigation: BookNavigation;
  private bookCards: BookCards;
  private bookPagination: BookPagination;
  private bookGames: BookGames;
  
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['book']);

    this.bookNavigation = new BookNavigation(this.element)
    this.bookCards = new BookCards(this.element)
    this.bookPagination = new BookPagination(this.element)
    this.bookGames = new BookGames(this.element)

  }
}