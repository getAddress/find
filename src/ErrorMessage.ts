import {ErrorMessgeConfig} from './Types';

export default class ErrorMessage{

    private pElement:HTMLParagraphElement|undefined;
    readonly container:HTMLElement|null;

    constructor(readonly config:ErrorMessgeConfig){
        this.container = document.getElementById(this.config.container_id);
    }

    setup = (status:number, message:string)=>
    {
        
        let errorMessage = document.createElement("p");

        errorMessage.id = this.config.id;
        if(this.config.class){
            errorMessage.className = this.config.class;
        }
        
        errorMessage.innerText = this.config.not_found;
        
        if(this.container)
        {
            this.container.appendChild(errorMessage);
        }

        this.replace(errorMessage);

        return errorMessage;
    
    };

    remove = ()=>{
        if(this.pElement){
            this.pElement.remove();
            this.pElement = undefined;
        }
    }

    private replace = (replacment:HTMLParagraphElement)=>{
        this.remove();
        this.pElement = replacment;
    }

}