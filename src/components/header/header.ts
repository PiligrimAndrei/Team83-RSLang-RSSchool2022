import { Component } from '../../components/components';
import { Heading } from '../heading/heading';
import { Link } from '../link/link';
import './header.css'

export class Header extends Component {
  private navContainer: Component;
  private navItems: Component[] = [];
  private linkToMain: Link;
  private linkToBook: Link;
  private linkToGames: Link;
  private linkToStatistic: Link;
  private linkToSignIn: Link;
  private headerLogo: Heading;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', ['header']);

    this.headerLogo = new Heading(
      this.element,
      'h1',
      ['header__logo'],
      'LangSpace'
    ),

      this.navContainer = new Component(
        this.element,
        'div',
        ['nav__container']
      ),

      this.linkToMain = new Link(
        this.navContainer.element,
        '#/',
        ['nav__item'],
        'Главная',
      ),
      this.linkToBook = new Link(
        this.navContainer.element,
        '#/book',
        ['nav__item'],
        'Учебник',
      ),
      this.linkToGames = new Link(
        this.navContainer.element,
        '#/games',
        ['nav__item'],
        'Игры',
      ),
      this.linkToStatistic = new Link(
        this.navContainer.element,
        '#/statistic',
        ['nav__item'],
        'Статистика',
      ),
      this.linkToSignIn = new Link(
        this.navContainer.element,
        '#/autorization',
        ['nav__item', 'nav__button'],
        'Войти',
      );
    if (localStorage.getItem('isAutorization') == 'true') this.linkToSignIn.element.textContent = 'Выйти'
    this.navItems = [this.linkToMain, this.linkToBook, this.linkToGames, this.linkToStatistic, this.linkToSignIn];

    this.linkToSignIn.element.addEventListener('click', () => {
      let isAutorization = localStorage.getItem('isAutorization')
      /*let exit = (document.querySelector('.nav__button') as HTMLInputElement);
      if (exit.textContent === 'Выйти') {
        exit.textContent = 'Войти';
        isAutorization = 'false'
      }
      window.location.hash = '/autorization'*/
      console.log('isAutorization', isAutorization)
      if (isAutorization == 'true') {
        this.linkToSignIn.element.textContent = 'Войти';
        localStorage.clear();
      }
      window.location.hash = '/autorization';
    })

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