import { Component } from '../components';
import { Button } from '../button/button';
import { DIFFICULTIES } from '../../constants/data';
import './bookNavigation.css'

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
            'Сложные слова'// TODO in const.ts in this folder
        )

        this.learnedWordsBtn = new Button(
            this.element,
            'button',
            ['learnedWordsBtn'],
            'Изученные слова'
        )

        this.settingsBtn = new Button(
            this.element,
            'button',
            ['settingsBtn'],
            'Настройка'
        )

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

        this.langLevelBtns[0].element.classList.add("active")
        this.langLevelBtns.map((button,index) => {
            button.element.dataset.button = "groupLevel";
            button.element.dataset.difficultyLevel = `${index}`;
            button.element.addEventListener('click', ()=>{ 
                this.langLevelBtns.map((button,index) => { 
                    button.element.classList.remove("active") 
                })
                button.element.classList.add("active") 
            })
        })
      

        
    }
}