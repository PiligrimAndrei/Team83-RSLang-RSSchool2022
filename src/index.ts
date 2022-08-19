import { App } from './app';
import '../src/index.css';

window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.body;
  const app = new App(rootElement);

  app.init();
});