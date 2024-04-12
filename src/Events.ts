import { AutocompleteAddress, Suggestion } from "getaddress-api";

export class AddressSelectedEvent 
{
    static dispatch(element:HTMLElement|Document,address:AutocompleteAddress){
        
        const evt  = new Event("getaddress-find-address-selected",{bubbles:true}) as any;
        evt["address"] = address;
        element.dispatchEvent(evt);
    }
}

export class AddressSelectedFailedEvent 
{
    static dispatch(element:HTMLElement|Document,status:number, message:string){
        
        const evt  = new Event("getaddress-find-address-selected-failed",{bubbles:true}) as any;
        evt["status"] = status;
        evt["message"] = message;

        element.dispatchEvent(evt);
    }
}

export class SuggestionsEvent 
{
    static dispatch(element:HTMLElement|Document,query:string,suggestions:Suggestion[]){
        
        const evt  = new Event("getaddress-find-suggestions",{bubbles:true}) as any;
        evt["suggestions"] = suggestions;
        evt["query"] = query;
        element.dispatchEvent(evt);
    }
}

export class SuggestionsFailedEvent 
{
    static dispatch(element:HTMLElement|Document, query:string,status:number, message:string){
        
        const evt  = new Event("getaddress-find-suggestions-failed",{bubbles:true}) as any;
        evt["status"] = status;
        evt["message"] = message;
        evt["query"] = query;
        element.dispatchEvent(evt);
    }
}