import { App } from './app';
import '../src/index.css';


window.addEventListener('DOMContentLoaded', () => {
  if(!localStorage.getItem('difficultyLevel')){
    localStorage.setItem('difficultyLevel', '0');
    localStorage.setItem('pageNumber', '0');
    localStorage.setItem('currentCard', '0');
  }
  const rootElement = document.body;
  const app = new App(rootElement);

  app.init();

  
});