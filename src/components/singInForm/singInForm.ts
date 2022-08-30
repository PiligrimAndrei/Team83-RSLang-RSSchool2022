import { Component } from '../components';
import './singInForm.css'
import { TAG } from "../../constants/constants";

import { Heading } from "../../components/heading/heading";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { Link } from "../../components/link/link";
import { Paragraph } from "../../components/paragraph/paragraph";
import { Form } from '../form/form';
import { createUser } from '../../api/api';
import { ICreateUser } from '../../interfaces/interfaces';
import { signIn } from '../../api/api';
import { SignIn } from '../../interfaces/interfaces';


export class SingInForm extends Component {
    private formAutorization!: Form;
    private inputEmail!: Input;
    private inputPassword!: Input;
    private enterButton: Button;
    private headingAutorization!: Paragraph;
    private linkToSingUp: Paragraph;
    private textToSingUp: Paragraph;

    constructor(parentNode: HTMLElement) {
        super(parentNode, TAG.div, ['autotizationFields'])

        this.headingAutorization = new Paragraph(
            this.element,
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
            'true'
        )

        this.inputPassword = new Input(
            this.formAutorization.element,
            'password',
            ['inputPassword'],
            'Пароль',
            'false'
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
            'Еще не с нами?'
        )

        this.linkToSingUp = new Paragraph(
            this.textToSingUp.element,
            ['linkToSingUp'],
            ' Зарегистрируйтесь'
        )
        this.formAutorization.element.addEventListener('submit', this.submitFormAutorization)
        this.headingAutorization.element.addEventListener('load', this.reverseExit)
    }
    submitFormAutorization(event: Event) {

        const form: SignIn = {
            'email': (document.querySelector('.inputEmail') as HTMLInputElement).value,
            'password': (document.querySelector('.inputPassword') as HTMLInputElement).value,
        };
        console.log('Введено', form);
        signIn(form);
        console.log("SessionStorage", sessionStorage.getItem('tokenData'), sessionStorage.getItem('isAutorization'))
        let isAutorization = sessionStorage.getItem('isAutorization')
        console.log('isAutorization', isAutorization)
        let exit = (document.querySelector('.nav__button') as HTMLInputElement);
        exit.textContent = 'Выйти'
        isAutorization = 'true'
        window.location.hash = '/book';
    }
    reverseExit() {
        console.log('reverse load')
        let isAutorization = sessionStorage.getItem('isAutorization')
        let exit = (document.querySelector('.nav__button') as HTMLInputElement);
        if (exit.textContent === 'Выйти') {
            exit.textContent = 'Войти';
            isAutorization = 'false'
        }
    }
}
