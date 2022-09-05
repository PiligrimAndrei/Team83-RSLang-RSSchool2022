
import "./audioGameStatistic.css";
import { Component } from '../components';
import { Table } from "../table/table";
import { Th } from "../table/th";
import { Tr } from "../table/tr";
import { Td } from "../table/td";
import { Heading } from '../heading/heading';
import { IPlayed } from '../../interfaces/interfaces';
import { Button } from '../button/button';

export class audioGameStatistic extends Component {
    private audioGameStatisticHeading: Heading;
    private audioGameTableCorrect: Table;
    private audioGameTableWrong: Table;
    private audioGameCorrectHeadContent: Th;
    private audioGameWrongHeadContent: Th;
    private audioGameTableCorrectHead: Tr;
    private audioGameTableWrongHead: Tr;
    private audioGameWord: Tr | undefined;
    private audioGameWordContent: Td | undefined;
    private audioGameTableContainer: Component;
    private repeatButton: Button;
    
    constructor(parentNode: HTMLElement, words: Array<IPlayed>) {
        super(parentNode, "div", ["audioGameStatistic"])

        this.audioGameStatisticHeading = new Heading(this.element,
             "h2",
              ["audioGameStatisticHeading"],
               "Статистика за игру")

        this.audioGameTableContainer = new Component(this.element,'div',['audioGameTableContainer'])

        this.audioGameTableCorrect = new Table(this.audioGameTableContainer.element, ['audioGameTableCorrect'])
        this.audioGameTableCorrectHead = new Tr(this.audioGameTableCorrect.element, ["audioGameTableCorrectHead"])
        this.audioGameCorrectHeadContent = new Th(this.audioGameTableCorrectHead.element, 
            ['audioGameCorrectHeadContent'], 
            'Верно')

        this.audioGameTableWrong = new Table(this.audioGameTableContainer.element, ['audioGameTableWrong'])
        this.audioGameTableWrongHead = new Tr(this.audioGameTableWrong.element, ['audioGameTableWrongHead'])
        this.audioGameWrongHeadContent = new Th(this.audioGameTableWrongHead.element, 
            ['audioGameWrongHeadContent'],
            'Неверно')
        
        for (let i = 0; i < words.length; i += 1) {
            let parent = words[i].guessed ? this.audioGameTableCorrect.element : this.audioGameTableWrong.element
            this.audioGameWord = new Tr(parent,['audioGameWord'])
            
            this.audioGameWordContent = new Td(this.audioGameWord.element, 
                ['audioGameWordContent'], 
                `${words[i].word} - ${words[i].transcription} - ${words[i].translate}`)
        }

        this.repeatButton = new Button(this.element, 'button', ['repeatButton'], 'Заново')
        this.repeatButton.element.addEventListener('click', () => {
            location.reload()
        })
    }
}