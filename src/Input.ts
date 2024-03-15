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
        input.value = this.config.label;

        if(this.config.placeholder?.length > 0) {
            input.placeholder = this.config.placeholder;
        }

        if(this.config.class)
        {
            input.className = this.config.class;
        }

        input.name = this.config.name;
        input.autocomplete = "off";

        input.addEventListener("submit", ()=>{return false});
        
        /**
         * @deprecated The following event listeners are for backwards compatibility. The use of the placeholder attribute proves this functionality.
         */
        if(this.config.label?.length > 0) {
            let styleAttr:Attr = this.getDefaultStyle();
            input.attributes.setNamedItem(styleAttr);

            input.addEventListener("focus", ()=>
            {
                input.removeAttribute('style');
                if(input.value === this.config.label){
                    input.value = '';
                }
            });

            input.addEventListener("blur", ()=>
            {
                if(!input.value){
                    input.value = this.config.label;
                    let styleAttr:Attr = this.getDefaultStyle();
                    input.attributes.setNamedItem(styleAttr);
                }
            });
        }

        let container = document.getElementById(this.config.container_id);
        
        if(container){
            container.append(input);
        }

        return input;
    }

    private getDefaultStyle = ()=>
    {
        let styleAttr:Attr = document.createAttribute("style");
        styleAttr.value = this.config.muted_style;
        return styleAttr;
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