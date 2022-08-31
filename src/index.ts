import { App } from './app';
import '../src/index.css';

window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.body;
  const app = new App(rootElement);

  app.init();

  if(!localStorage.getItem('difficultyLevel')){
    localStorage.setItem('difficultyLevel', '0');
    localStorage.setItem('pageNumber', '0');
    localStorage.setItem('currentCard', '0');
  }
});