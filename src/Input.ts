import {InputConfig} from './Types';

export default class Input
{
    private readonly inputElement:HTMLInputElement;

    constructor(readonly config:InputConfig)
    {
        this.inputElement = this.setup();
    }

    private setup = () => {
        
        let input = document.createElement("input");
        input.id = this.config.id;
        input.type = "text";
        input.placeholder = this.config.label !== '' ? this.config.label : this.config.placeholder;
        input.value = this.config.value;

        if(this.config.class)
        {
            input.className = this.config.class;
        }

        input.name = this.config.name;
        input.autocomplete = "off";

        input.addEventListener("submit", ()=>{return false});
        
        let container = document.getElementById(this.config.container_id);
        
        if(container){
            container.append(input);
        }

        return input;
    }

    onKeyPress = (action:()=>void) =>
    {
        this.inputElement.addEventListener("keypress", (e) =>
        {
            if(e.key === 'Enter'){
                action();
            }
        });
    }

    getValue =()=>{
        return this.inputElement.value;
    }
   

}