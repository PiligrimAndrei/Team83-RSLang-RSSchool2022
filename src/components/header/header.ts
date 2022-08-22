import { Component } from '../../components/components';
import './header.css'

export class Header extends Component {
  private navContainer: Component;
  private navItems: Component[] = [];
  private linkToMain: Component;
  private linkToBook: Component;
  private linkToGames: Component;
  private linkToStatics: Component;
  private linkToSignIn: Component;
  private headerLogo: Component;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['header']);

    this.headerLogo = new Component(
      this.element,
      'div',
      ['header__logo'],
      'LangSpace'
    ),

      this.navContainer = new Component(
        this.element,
        'div',
        ['nav__container']
      ),

      this.linkToMain = new Component(
        this.navContainer.element,
        'a',
        ['nav__item'],
        'Главная',
      ),
      this.linkToBook = new Component(
        this.navContainer.element,
        'a',
        ['nav__item'],
        'Учебник',
      ),
      this.linkToGames = new Component(
        this.navContainer.element,
        'a',
        ['nav__item'],
        'Игры',
      ),
      this.linkToStatics = new Component(
        this.navContainer.element,
        'a',
        ['nav__item'],
        'Статистика',
      ),
      this.linkToSignIn = new Component(
        this.navContainer.element,
        'link',
        ['nav__item', 'nav__button'],
        'Вход',
      );

    this.linkToMain.element.setAttribute('href', '#/');
    this.linkToBook.element.setAttribute('href', '#/book');
    this.linkToGames.element.setAttribute('href', '#/game_sprint');
    this.linkToStatics.element.setAttribute('href', '#/statics');
    this.linkToSignIn.element.setAttribute('href', '#/autorization');

    this.navItems = [this.linkToMain, this.linkToBook, this.linkToGames, this.linkToStatics, this.linkToSignIn];

    window.addEventListener('hashchange', () =>
      this.updateActive(this.navItems),
    );
    window.addEventListener('load', () => this.updateActive(this.navItems));
  }
  private updateActive(navItems: Component[]): void {
    this.navItems = navItems.map((item) => {
      item.element.classList.remove('nav__item--active');
      if (item.element.getAttribute('href') === window.location.hash) {
        item.element.classList.add('nav__item--active');
      }

      return item;
    });
  }
}