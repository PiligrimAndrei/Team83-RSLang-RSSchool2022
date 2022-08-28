import { Component } from '../components';
import { Link } from '../link/link';
import './bookGames.css'

export class BookGames extends Component{
    private gameContainer1: Component;
    private gameContainer2: Component;
    private titleAudioCall: Link;
    private titleStrint: Link;
    //TODO empty line between before constructor
    constructor(parentNode: HTMLElement){
        super(parentNode, 'div', ['bookGames'])

        this.gameContainer1 = new Component(
            this.element,
            'div',
            ['gameContainer', 'audioCallGame']
        )

        this.titleAudioCall = new Link(
            this.gameContainer1.element,
            '',
            ['titleGame'],
            `Игра\n"АУДИОВЫЗОВ"`
        )

        this.gameContainer2 = new Component(
            this.element,
            'div',
            ['gameContainer', 'sprintGame']
        )

        this.titleStrint = new Link(
            this.gameContainer2.element,
            '',
            ['titleGame'],
            `Игра\n"СПРИНТ"`
        )
    }
}