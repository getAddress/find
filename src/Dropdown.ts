import {Suggestion} from 'getaddress-api';
import {DropdownConfig} from './Types';

export default class Dropdown{
    
    private  selectElement:HTMLSelectElement|undefined;
    readonly container:HTMLElement|null;

    constructor(readonly config:DropdownConfig)
    {
        this.container = document.getElementById(this.config.container_id);
    }

    firstOptionValue:string =  "open";

    setup = (onChange:()=>void,suggestions: Suggestion[]) =>
    {
        let dropdown = document.createElement("select");
        dropdown.id = this.config.id;

        if(this.config.class){
            dropdown.className = this.config.class;
        }

        let option = document.createElement("option");
        option.value = this.firstOptionValue;
        option.text  = this.config.select_message;

        dropdown.append(option);

        if(suggestions && suggestions.length> 0)
        {
            for(let suggestion of suggestions)
            {
                let option = document.createElement("option");
                option.value = suggestion.id;
                option.text  = suggestion.address;
                dropdown.append(option);
            }
        }

        if(this.container)
        {
            this.container.appendChild(dropdown);
        }
        
        dropdown.addEventListener('change',onChange);

        this.replace(dropdown);

        return dropdown;
    }

    

    private replace = (replacment:HTMLSelectElement)=>{
        this.remove();
        this.selectElement = replacment;
    };

    remove = ()=>{
        if(this.selectElement){
            this.selectElement.remove();
            this.selectElement = undefined;
        }
    };

    
    getValue =()=>{
        return this.selectElement!.value;
    }

}