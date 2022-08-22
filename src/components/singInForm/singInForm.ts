import { Component } from '../components';
import './singInForm.css'
import { Heading } from "../../components/heading/heading";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { Link } from "../../components/link/link";
import { Paragraph } from "../../components/paragraph/paragraph";
import { Form } from '../form/form';
import { Button } from '../button/button';

export class SingInForm extends Component{
    private formAutorization!: Form;
    private inputEmail!: Input;
    private inputPassword!: Input;
    private enterButton: Button;
    private headingAutorization!: Heading;
    private linkToSingUp: Link;
    private textToSingUp: Paragraph;

    constructor(parentNode: HTMLElement){
        super(parentNode, 'div', ['autotizationFields'])

        this.headingAutorization = new Heading(
            this.element,
            'h1',
            ['autorizationTitle'],
            'Вход в аккаунт'
        )

        this.formAutorization = new Form(
            this.element,
            ['autorizationForm']
        )

        this.inputEmail = new Input(
            this.formAutorization.element,
            'email',
            ['inputEmail'],
            'Логин',
            true
        )

        this.inputPassword = new Input(
            this.formAutorization.element,
            'password',
            ['inputPassword'],
            'Пароль',
            false
        )

        this.enterButton = new Button(
            this.formAutorization.element,
            'submit',
            ['submitBtnAutorization'],
            'Войти'
        )

        this.textToSingUp = new Paragraph(
            this.element,
            ['textToSingUp'],
            'Еще не с нами? '
        )

        this.linkToSingUp = new Link(
            this.textToSingUp.element,
            '',
            ['linkToSingUp'],
            'Зарегистрируйтесь'
        )

        this.linkToSingUp.element.addEventListener('click', changeAutorizationWindow())
    }

    
}