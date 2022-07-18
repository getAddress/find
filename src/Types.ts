/* import {AutocompleteAddress,Suggestion} from './ClientTypes'; */
import {AutocompleteAddress,Suggestion} from 'getaddress-api';

export class Config{
    
    constructor(readonly count:number, readonly container_id:string)
    {

    }

    protected getIdSuffix(){
        if(this.count > 0){
            return "_" + this.count;
        }
        return "";
    }
}

export class InputConfig extends Config
{
    label:string = "";
    placeholder:string = "Search..";
    value:string = "";
    class = "";
    id = "getaddress_input" + this.getIdSuffix();
    name = "getaddress_input" + this.getIdSuffix();
}

export class ButtonConfig extends Config
{
    
    label:string = "Search";
    id = "getaddress_button" + this.getIdSuffix();
    class = "";
    disabled_message= "Fetching Addresses...";
    clear_on_submit:boolean = true;
}

export class DropdownConfig extends Config
{
    
    id="getaddress_dropdown" + this.getIdSuffix();
    class="";
    select_message="Select your Address";
    template:string|null=null;
    
}

export class ErrorMessgeConfig extends Config{
    
    id= "getaddress_error_message" + this.getIdSuffix();
    not_found= "Address not found";
    class= "";
}




export class OutputFieldConfig
{
            formatted_address_0 = "formatted_address_0";
            formatted_address_1 = "formatted_address_1";
            formatted_address_2 = "formatted_address_2";
            formatted_address_3 = "formatted_address_3";
            formatted_address_4 = "formatted_address_4";
            line_1= "line_1";
            line_2= "line_2";
            line_3= "line_3";
            line_4 = "line_4";
            town_or_city= "town_or_city";
            county= "county";
            country= "country";
            postcode= "postcode";
            latitude= "latitude";
            longitude= "longitude";
            building_number= "building_number";
            building_name= "building_name";
            sub_building_number= "sub_building_number";
            sub_building_name= "sub_building_name";
            thoroughfare= 'thoroughfare'; 
            locality = "locality";
            district = "district";
            residential = "residential"
}

export class SetupOptions
{
  
   endpoints={
    autocomplete_url:undefined,
    get_url:undefined,
    autocomplete_options:{}
   }

   input = {};

   button= {};

   dropdown={};
   
    error_message={};
    
    output_fields={};
}


