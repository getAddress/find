import {ButtonConfig} from './Types';

export default class Button
{
    private readonly buttonElement:HTMLButtonElement;

    constructor(readonly config: ButtonConfig)
    {
        this.buttonElement = this.setup();
    }


    private setup = () =>
    {
        let button = document.createElement("button");
        button.type = "button";
        button.id = this.config.id;
        button.innerHTML = this.config.label;

        if(this.config.class)
        {
            button.className = this.config.class;
        }

        button.addEventListener("submit", ()=>{return false});

        let container = document.getElementById(this.config.container_id);
        
        if(container){
            container.appendChild(button);
        }

        return button;
    }

    disable = () =>
    {
        this.buttonElement.innerHTML = this.config.disabled_message;
        this.buttonElement.disabled = true;
    }

    enable = () =>
    {
        this.buttonElement.innerHTML = this.config.label;
        this.buttonElement.disabled = false; 
    }

    click =()=>
    {
        this.buttonElement.click();
    }

    onClick = (action:()=>void) =>
    {
        this.buttonElement.addEventListener("click", action);
    }

}