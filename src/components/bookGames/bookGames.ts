import { Component } from '../components';
import { Link } from '../link/link';
import './bookGames.css'

export class BookGames extends Component{
    private gameContainer1: Component;
    private gameContainer2: Component;
    private titleAudioCall: Link;
    private titleSprint: Link;
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
            '#/game_audio',
            ['titleGame'],
            `Игра\n"АУДИОВЫЗОВ"`
        )
        this.titleAudioCall.element.addEventListener('click', () => {
            localStorage.setItem('fromWhereToStart','book');
            let header = document.querySelector(".header") as HTMLHeadElement;
            let footer = document.querySelector(".footer") as HTMLDivElement;
            header.style.display = 'none';
            footer.style.display = 'none';
        })

        this.gameContainer2 = new Component(
            this.element,
            'div',
            ['gameContainer', 'sprintGame']
        )

        this.titleSprint = new Link(
            this.gameContainer2.element,
            '#/game_sprint',
            ['titleGame'],
            `Игра\n"СПРИНТ"`
        )
        this.titleSprint.element.addEventListener('click', () => {
            localStorage.setItem('fromWhereToStart','book');
            let header = document.querySelector(".header") as HTMLHeadElement;
            let footer = document.querySelector(".footer") as HTMLDivElement;
            header.style.display = 'none';
            footer.style.display = 'none';
        })
    }
}