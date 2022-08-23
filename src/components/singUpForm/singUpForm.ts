import { Component } from '../components';
import './singUpForm.css'
import { Heading } from "../../components/heading/heading";
import { Input } from "../../components/input/input";
import { Link } from "../../components/link/link";
import { Paragraph } from "../../components/paragraph/paragraph";
import { Form } from '../form/form';
import { Button } from '../button/button';

export class SingUpForm extends Component{
    private formRegistration!: Form;
    private inputName!: Input;
    private inputEmail!: Input;
    private inputPassword!: Input;
    private enterButton: Button;
    private headingRegistration!: Heading;
    private linkToSingIn: Link;
    private textToSingIn: Paragraph;

    constructor(parentNode: HTMLElement){
        super(parentNode, 'div', ['registrationFields'])

        this.headingRegistration = new Heading(
            this.element,
            'h1',
            ['registrationTitle'],
            'Регистрация'
        )

        this.formRegistration = new Form(
            this.element,
            ['registrationForm']
        )

        this.inputName = new Input(
            this.formRegistration.element,
            'text',
            ['inputName'],
            'Имя',
            'true'
        )

        this.inputEmail = new Input(
            this.formRegistration.element,
            'email',
            ['inputEmail'],
            'Логин',
            'false'
        )

        this.inputPassword = new Input(
            this.formRegistration.element,
            'password',
            ['inputPassword'],
            'Пароль',
            'false'
        )

        this.enterButton = new Button(
            this.formRegistration.element,
            'submit',
            ['submitBtnRegistration'],
            'Зарегистрироваться'
        )

        this.textToSingIn = new Paragraph(
            this.element,
            ['textToSingUp'],
            'Уже с нами? '
        )

        this.linkToSingIn = new Link(
            this.textToSingIn.element,
            '',
            ['linkToSingUp'],
            'Войти'
        )

    }

    
}