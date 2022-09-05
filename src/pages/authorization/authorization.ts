import { Component } from "../../components/components";
import { SingInForm } from '../../components/singInForm/singInForm';
import { SingUpForm } from '../../components/singUpForm/singUpForm';
import './authorization.css' 



export class Authorization extends Component{
    SingInForm: SingInForm;
    SingUpForm: SingUpForm;
    linkToSingUp: HTMLLinkElement;
    linkToSingIn: HTMLLinkElement;
    
    constructor(parentNode: HTMLElement){
        super(parentNode, 'div', ['authorization']);

        this.SingInForm = new SingInForm(this.element)
        this.SingUpForm = new SingUpForm(this.element)

        this.linkToSingUp = document.querySelector('.linkToSingUp') as HTMLLinkElement;
        this.linkToSingIn = document.querySelector('.linkToSingIn') as HTMLLinkElement;

        this.linkToSingUp.addEventListener('click', () => {
            this.SingInForm.element.style.display = 'none'
            this.SingUpForm.element.style.display = 'flex'
            this.element.style.background = 'linear-gradient(180deg, var(--main-bg-color) 0%, var(--color-b2) 100%)'
        })

        this.linkToSingIn.addEventListener('click', () => {
            this.SingUpForm.element.style.display = 'none'
            this.SingInForm.element.style.display = 'flex'
            this.element.style.background = 'linear-gradient(180deg, var(--main-bg-color) 0%, var(--accent-color) 100%)'
        })
    }
    
}