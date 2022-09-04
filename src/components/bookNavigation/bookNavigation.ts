import { Component } from '../components';
import { Button } from '../button/button';
import { DIFFICULTIES } from '../../constants/data';
import './bookNavigation.css'
import { buttonText } from './consts';

export class BookNavigation extends Component {
    private hardWordsBtn: Button;
    private learnedWordsBtn: Button;
    private settingsBtn: Button;
    private langLevelBtns: Button[];

    constructor( parentNode: HTMLElement ){
        super(parentNode, 'div', ['bookNavigation']);

        this.hardWordsBtn = new Button(
            this.element,
            'button',
            ['hardWordsBtn'],
            buttonText.hard
        )
        this.hardWordsBtn.element.dataset.button = 'hardword'

        this.learnedWordsBtn = new Button(
            this.element,
            'button',
            ['learnedWordsBtn'],
            buttonText.learned
        )
        this.learnedWordsBtn.element.dataset.button = 'learnedword'

        this.settingsBtn = new Button(
            this.element,
            'button',
            ['settingsBtn'],
            buttonText.settings
        )
        this.settingsBtn.element.addEventListener('click', () => alert("Sorry, there is no settings"))

        this.langLevelBtns = []
        
        DIFFICULTIES.map(difficulty => {
            let langLevelBtn = new Button(
                this.element,
                'button',
                ['langLevelBtn',`langLevelBtn${difficulty}`],
                `${difficulty}`
            )
            this.langLevelBtns.push(langLevelBtn)
        })
        if (localStorage.getItem('onpage') === 'user') {
            localStorage.getItem('userdifficulty') === 'hard' ? 
              this.hardWordsBtn.element.classList.add('active') : 
              this.learnedWordsBtn.element.classList.add('active')
        } else {
            this.langLevelBtns[Number(localStorage.getItem('difficultyLevel'))].element.classList.add("active")
        }
        this.langLevelBtns.map((button,index) => { 
            button.element.dataset.button = "groupLevel";
            button.element.dataset.difficultyLevel = `${index}`;
            button.element.addEventListener('click', ()=>{ 
                localStorage.removeItem('onpage');
                this.langLevelBtns.map((button,index) => { 
                    button.element.classList.remove("active") 
                })
                button.element.classList.add("active")
                this.learnedWordsBtn.element.classList.remove('active');
                this.hardWordsBtn.element.classList.remove('active');       
            })
        })
        
        this.hardWordsBtn.element.addEventListener("click", () => {
            this.langLevelBtns.map( (button) => button.element.classList.remove('active'))
            this.hardWordsBtn.element.classList.add('active');
            this.learnedWordsBtn.element.classList.remove('active');

        })

        this.learnedWordsBtn.element.addEventListener("click", () => {
            this.langLevelBtns.map( (button) => button.element.classList.remove('active'))
            this.hardWordsBtn.element.classList.remove('active');
            this.learnedWordsBtn.element.classList.add('active');
        })

        
    }
}