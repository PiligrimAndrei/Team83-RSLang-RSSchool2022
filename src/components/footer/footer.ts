import { Component } from '../../components/components';
import { DEVELOPERS } from '../../constants/data';
import './footer.css'
import { Paragraph } from '../paragraph/paragraph';
import { Image } from '../image/image';
import { Link } from '../link/link';

export class Footer extends Component {
  private developerContainer: Component;
  private footerLogo: Paragraph;
  private devItem: Component[] = [];
  private logosContainer: Component;
  private footerLogoRSS: Image;
  private devGithubLink: Link;
  private footerYear: Paragraph;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['footer']);

    
    this.logosContainer = new Component(
      this.element,
      'div',
      ['logos__container'],
    ),

    this.footerLogo = new Paragraph(
      this.logosContainer.element,
      ['footer__logo'],
      'RS LANG',
    ),
    
    this.devGithubLink = new Link(
      this.logosContainer.element,
      'https://rs.school/js/',
      ['link__logoRSS'],
      ''
    )

    this.footerLogoRSS = new Image(
      this.devGithubLink.element,
      ['footer__logoRSS'],
      './assets/rs_school_js.png',
      'RSS',
    ),

    this.developerContainer = new Component(
      this.element,
      'div',
      ['dev__container'],
    )

    for (let i = 0; i < DEVELOPERS.length; i += 1) {
      this.devGithubLink = new Link(
        this.developerContainer.element,
        `${Object.values(DEVELOPERS[i].github).join('')}`,
        ['dev__Github__Link'],
        `${Object.values(DEVELOPERS[i].alt).join('')}`
      )
    }
    

    this.footerYear = new Paragraph(
      this.developerContainer.element,
      ['footer__year'],
      '2022',
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