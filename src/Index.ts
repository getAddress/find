import {ButtonConfig, DropdownConfig, ErrorMessgeConfig, InputConfig, 
    OutputFieldConfig, SetupOptions} from './Types';
import Client from 'getaddress-api';
import Find from './Find';

class Instances 
{
    static All:Find[] = [];
}


export function find(container_id:string, api_key:string = "", options:SetupOptions = new SetupOptions()):HTMLElement|null 
{
    let client:Client = new Client(api_key,
        options.endpoints?.autocomplete_url,options.endpoints?.get_url);

    let context = document.getElementById(container_id);

    if(context && client)
    {
        let count = Instances.All.length;
       
        let inputConfig = Object.assign(new InputConfig(count,container_id),options.input);

        let buttonConfig = Object.assign(new ButtonConfig(count,container_id),options.button); 

        let dropdownConfig = Object.assign(new DropdownConfig(count,container_id),options.dropdown);   

        let errorMessgeConfig = Object.assign(new ErrorMessgeConfig(count,container_id),options.error_message);  

        let mergedOutputFields = Object.assign(new OutputFieldConfig(),options.output_fields);

        let find = new Find(
            context,
            client, 
            inputConfig, 
            buttonConfig,
            dropdownConfig,
            errorMessgeConfig,
            mergedOutputFields,
            options.endpoints?.autocomplete_options
            );

        Instances.All.push(find);
    }
    return context;
}

export{SetupOptions};

