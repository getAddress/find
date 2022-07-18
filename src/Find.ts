import {ButtonConfig, InputConfig, DropdownConfig, ErrorMessgeConfig, 
OutputFieldConfig} from './Types';
import Client, {AutocompleteOptions, Suggestion}  from 'getaddress-api';
import  Button  from './Button';
import  Input  from './Input';
import Dropdown from './Dropdown';
import ErrorMessage from './ErrorMessage'
import OutputFields from './OutputFields';
import { AddressSelectedEvent,AddressSelectedFailedEvent,SuggestionsEvent,SuggestionsFailedEvent } from './Events';

export default class Find{

    private readonly button:Button;
    private readonly input:Input;
    private readonly dropdown:Dropdown;
    private readonly errorMessage:ErrorMessage;
    private readonly outputFields:OutputFields;

    constructor(
        readonly context:HTMLElement,
        readonly getAddress:Client,
        inputConfig:InputConfig ,
        buttonConfig: ButtonConfig ,
        dropdownConfig: DropdownConfig ,
        errorMessgeConfig: ErrorMessgeConfig,
        outputFieldConfig:OutputFieldConfig,
        readonly autocomplete_options:any)
    {
      
       this.input = new Input(inputConfig);
       this.button = new Button(buttonConfig);
       this.dropdown = new Dropdown(dropdownConfig);
       this.errorMessage = new ErrorMessage(errorMessgeConfig);
       this.outputFields = new OutputFields(outputFieldConfig)

       this.setupEvents(this.button,this.input);
    }

    private clearAll = ()=> 
    {
        this.errorMessage.remove();
        this.dropdown.remove();
        this.outputFields.clear();
    }; 

    private setupDropdown = (suggestions: Suggestion[]) =>
    {
        const onChange = (async () => {
            
            let id = this.dropdown.getValue();
            if(id !== this.dropdown.firstOptionValue)
            {
                let addressResult = await this.getAddress.get(id);
                if(addressResult.isSuccess){
                    let success = addressResult.toSuccess();
                    if (!this.button.config.clear_on_submit)
                    {
                        this.clearAll();
                    }
                    this.outputFields.bind(success.address);
                    
                    AddressSelectedEvent.dispatch(this.context,success.address);
                }
                else{
                    let failed = addressResult.toFailed();
                    this.errorMessage.setup(failed.status,failed.message);

                    AddressSelectedFailedEvent.dispatch(this.context,failed.status,failed.message);
                }
            }
          
        });

        this.dropdown.setup(onChange,suggestions);
    } 

   
    private lookup = async (query:string) => 
    {
        let autocompleteOptions = new AutocompleteOptions();
        autocompleteOptions.all = true;
        
        if(this.dropdown.config.template)
        {
            autocompleteOptions.template = this.dropdown.config.template;
        }
        
        if(this.autocomplete_options){
            autocompleteOptions = Object.assign(autocompleteOptions,this.autocomplete_options);
        }

        let result = await this.getAddress.autocomplete(query,autocompleteOptions);
        
        this.button.enable();

        if(result.isSuccess)
        {
            let success = result.toSuccess();
            
            this.setupDropdown(success.suggestions);

            SuggestionsEvent.dispatch(this.context,query,success.suggestions);
        }
        else
        {
            let failed = result.toFailed();
            
            this.errorMessage.setup(failed.status,failed.message);

            SuggestionsFailedEvent.dispatch(this.context,query,failed.status,failed.message);
        }
    };

    private setupEvents =  (button:Button, input:Input) =>
    {
        input.onKeyPress(button.click);

        button.onClick(async ()=>
        {
            let query = input.getValue();
            if(query && query !== this.input.config.label)
            {
                button.disable();
                if(this.button.config.clear_on_submit)
                {
                    this.clearAll();
                }
                await this.lookup(query);
            }
            return false;
        });
    } 
 
    
}

