import { Component } from "../../components/components";
import { SingInForm } from '../../components/singInForm/singInForm';
import './authorization.css' 


export class Authorization extends Component{
    SingInForm: SingInForm;
    
    constructor(parentNode: HTMLElement){
        super(parentNode, 'div', ['authorization']);

        this.SingInForm = new SingInForm(this.element)
    }
}