import {AutocompleteAddress} from 'getaddress-api';
import {OutputFieldConfig} from './Types';

export default class OutputFields{
    
    constructor(readonly config:OutputFieldConfig)
    {

    }


    bind = (address:AutocompleteAddress)=>
    {
        if(address)
        {
            this.setOutputfield(this.config.building_name,address.building_name);
            this.setOutputfield(this.config.building_number,address.building_number);

            this.setOutputfield(this.config.latitude,address.latitude.toString());
            this.setOutputfield(this.config.longitude,address.longitude.toString());

            this.setOutputfield(this.config.line_1,address.line_1);
            this.setOutputfield(this.config.line_2,address.line_2);
            this.setOutputfield(this.config.line_3,address.line_3);
            this.setOutputfield(this.config.line_4,address.line_4);

            this.setOutputfield(this.config.country,address.country);
            this.setOutputfield(this.config.county,address.county);

            this.setOutputfield(this.config.formatted_address_0,address.formatted_address[0]);
            this.setOutputfield(this.config.formatted_address_1,address.formatted_address[1]);
            this.setOutputfield(this.config.formatted_address_2,address.formatted_address[2]);
            this.setOutputfield(this.config.formatted_address_3,address.formatted_address[3]);
            this.setOutputfield(this.config.formatted_address_4,address.formatted_address[4]);

            this.setOutputfield(this.config.town_or_city,address.town_or_city);
            this.setOutputfield(this.config.locality,address.locality);
            this.setOutputfield(this.config.district,address.district);
            this.setOutputfield(this.config.residential,address.residential.toString());

            this.setOutputfield(this.config.sub_building_name,address.sub_building_name);
            this.setOutputfield(this.config.sub_building_number,address.sub_building_number);

            this.setOutputfield(this.config.thoroughfare,address.thoroughfare);
            this.setOutputfield(this.config.postcode,address.postcode);
            
        }
    };

    private setOutputfield = (fieldName:string, fieldValue:string) =>
    {
            let element = document.getElementById(fieldName);
            if(element)
            {
               if(element instanceof HTMLInputElement){
                element.value = fieldValue;
               }
               else{
                element.innerText = fieldValue;
               }
            }
            return element;
    }

    clear = ()=>
    {   
         let address:AutocompleteAddress = {
             thoroughfare : "",
             building_name: "",
             sub_building_name: "",
             sub_building_number: "",
             building_number: "",
             line_1 : "",
             line_2: "",
             line_3: "",
             line_4: "",
             locality: "",
             town_or_city: "",
             county: "",
             district: "",
             country: "",
            postcode: "",
            latitude: 0,
            longitude: 0,
            residential:false,
            formatted_address: ["","","","",""]
        };

        this.bind(address);
    };



}