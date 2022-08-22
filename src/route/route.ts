import { IRoute } from '../interfaces/interfaces';
import { Component } from '../components/components';
import { Main } from '../pages/main/main';
import { Book } from '../pages/book/book';
import { Authorization } from '../pages/authorization/authorization';
import { GameSprint } from '../pages/gameSprint/gameSprint';

export class Router {
  private readonly routes: Array<IRoute>;
  private defaultRoute: IRoute;

  mainPage: Component;
  bookPage: Component | undefined;
  autorizationPage: Authorization | undefined;
  gameSprintPage: Component | undefined;

  constructor(private rootElement: HTMLElement) {
    this.mainPage = new Main(this.rootElement);

    this.routes = [
      {
        name: '/',
        component: () => {
          this.rootElement.append(this.mainPage.element);
        },
      },
      {
        name: '/book',
        component: () => {
          this.bookPage = new Book(this.rootElement);
          this.rootElement.append(this.bookPage.element);
        },
      },
      {
        name: '/autorization',
        component: () => {
          this.autorizationPage = new Authorization(this.rootElement);
          this.rootElement.append(this.autorizationPage.element);
        },
      },
      {
        name: '/game_sprint',
        component: () => {
          this.gameSprintPage = new GameSprint(this.rootElement);
          this.rootElement.append(this.gameSprintPage.element);
        },
      },
    ];

    this.defaultRoute = {
      name: 'Default router',
      component: () => {
        this.rootElement.innerHTML = 'Default Page';
      },
    };
  }

  updateRouter(): void {
    this.rootElement.innerHTML = '';
    const currentRouteName = window.location.hash.slice(1);
    const currentRoute = this.routes.find(
      (page) => page.name === currentRouteName,
    );

    (currentRoute || this.defaultRoute).component();
  }

  initRouter(): void {
    if (window.location.hash === '') {
      window.location.hash = '#/';
    }

    window.onpopstate = () => this.updateRouter();
    this.updateRouter();
  }
}