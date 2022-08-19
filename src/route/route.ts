import { IRoute } from '../interfaces/interfaces';
import { Component } from '../components/components';
import { Main } from '../pages/main/main';
import { Book } from '../pages/book/book';

export class Router {
  private readonly routes: Array<IRoute>;
  private defaultRoute: IRoute;

  mainPage: Component;
  bookPage: Component | undefined;

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