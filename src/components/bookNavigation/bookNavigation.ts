import { Component } from '../components';
import { Button } from '../button/button';
import { DIFFICULTIES } from '../../constants/data';

export class BookNavigation extends Component {
    private hardWordsBtn: Button;
    private learnedWordsBtn: Button;
    private settingsBtn: Button;
    private langLevelBtns: never[];

    constructor( parentNode: HTMLElement ){
        super(parentNode, 'div', ['bookNavigation']);

        this.hardWordsBtn = new Button(
            this.element,
            'button',
            ['hardWordsBtn'],
            'Сложные слова'
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
    }
}