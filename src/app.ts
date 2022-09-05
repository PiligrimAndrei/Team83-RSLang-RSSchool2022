import { Component } from './components/components';
import { Router } from './route/route';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';


export class App {
  private main;
  private router;

  constructor(private rootElement: HTMLElement) {
    const header = new Header(this.rootElement);
    this.main = new Component(this.rootElement, 'main', ['main']);
    this.router = new Router(this.main.element);
    const footer = new Footer(this.rootElement)
  }

  init(): void {
    this.router.initRouter();
  }
}