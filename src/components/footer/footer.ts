import { Component } from '../../components/components';
import { DEVELOPERS } from '../../constants/data';
import './footer.css'

export class Footer extends Component {
  private developerContainer: Component;
  private footerLogo: Component;
  private devItem: Component[] = [];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['footer']);

    this.footerLogo = new Component(
      this.element,
      'div',
      ['footer__logo'],
      'RSLang'
    ),

      this.developerContainer = new Component(
        this.element,
        'div',
        ['dev__container']
      )

    this.developerContainer = new Component(
      this.element,
      'div',
      ['dev__container']
    )



    /* DEVELOPERS.map((el) => {
       el = new Component(
         this.developerContainer.element,
         'div',
         ['dev__container']
       )
     })*/
  }
}