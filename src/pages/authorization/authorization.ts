import { Component } from "../../components/components";
import { SingInForm } from '../../components/singInForm/singInForm';
import { SingUpForm } from '../../components/singUpForm/singUpForm';
import './authorization.css' 


export class Authorization extends Component{
    SingInForm: SingInForm;
    SingUpForm: SingUpForm;
    
    constructor(parentNode: HTMLElement){
        super(parentNode, 'div', ['authorization']);

        this.SingInForm = new SingInForm(this.element)
        this.SingUpForm = new SingUpForm(this.element)
    }
}