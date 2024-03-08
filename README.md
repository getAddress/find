Javascript - find address by postcode.

## Install

###  From NPM
```
npm install getaddress-find
```
### Or CDN
```html
<script src="https://cdn.getaddress.io/scripts/getaddress-find-2.0.0.min.js"></script>
```
## Usage if you are using NPM install
```js
import * as getAddress from 'getaddress-find';

() => (

...

getAddress.find(
        container_id:'postcode_lookup',
        api_key: 'API_KEY',
        options);

...

)

```

## Usage
```html
  <div id="container_id"></div>  
  <br/>

  <label>Formatted_address_0</label>
  <div><input id="formatted_address_0" type="text"></div>

   <label>Formatted_address_1</label>
  <div><input id="formatted_address_1" type="text"></div>

   <label>Formatted_address_2</label>
  <div><input id="formatted_address_2" type="text"></div>

   <label>Formatted_address_3</label>
  <div><input id="formatted_address_3" type="text"></div>

  <label>Formatted_address_4</label>
  <div><input id="formatted_address_4" type="text"></div>

  <label>Postcode</label>
  <div><input id="postcode" type="text"></div>
  
  <script>
    getAddress.find("container_id","API Key");
  </script>
```
## Options
The full list of options, and their defaults:
```js
getAddress.find(
        container_id:'postcode_lookup',
        api_key: 'API_KEY',
        options={
          output_fields:{
            formatted_address_0:'formatted_address_0',  /* The id of the element bound to 'formatted_address[0]' */
            formatted_address_1:'formatted_address_1',  /* The id of the element bound to 'formatted_address[1]' */
            formatted_address_2:'formatted_address_2',  /* The id of the element bound to 'formatted_address[2]' */
            formatted_address_3:'formatted_address_3',  /* The id of the element bound to 'formatted_address[3]' */
            formatted_address_4:'formatted_address_4',  /* The id of the element bound to 'formatted_address[4]' */
            line_1:'line_1',  /* The id of the element bound to 'line_1' */
            line_2:'line_2',  /* The id of the element bound to 'line_2' */
            line_3:'line_3',  /* The id of the element bound to 'line_3' */
            line_4:'line_4',  /* The id of the element bound to 'line_4' */
            latitude:'latitude',  /* The id of the element bound to 'latitude' */
            longitude:'longitude',  /* The id of the element bound to 'longitude' */
            building_number:'building_number',  /* The id of the element bound to 'building_number' */
            building_name:'building_name',  /* The id of the element bound to 'building_name' */
            sub_building_number:'sub_building_number',  /* The id of the element bound to 'sub_building_number' */
            sub_building_name:'sub_building_name',  /* The id of the element bound to 'sub_building_name' */
            thoroughfare:'thoroughfare',  /* The id of the element bound to 'thoroughfare' */
            county:'county',  /* The id of the element bound to 'county' */
            country:'country',  /* The id of the element bound to 'country' */
            district:'district',  /* The id of the element bound to 'district' */
            locality:'locality',  /* The id of the element bound to 'locality' */
            postcode:'postcode',  /* The id of the element bound to 'postcode' */
            residential:'residential'  /* The id of the element bound to 'residential' */
          },
          input:{
              id:'getaddress_input',  /* The id of the textbox' */
              name:'getaddress_input',  /* The name of the textbox' */
              class:'',  /* The class of the textbox' */
              label:'Enter your Postcode'  /* The label of the textbox' */
          },
          button:{
              id:'getaddress_button',  /* The id of the botton' */
              class:'',  /* The class of the botton' */
              label:'Search',  /* The label of the botton' */
              disabled_message:'disabled message'  /* The disabled message of the botton' */
          },
          dropdown:{
              id:'getaddress_dropdown',  /* The id of the dropdown' */
              class:'',  /* The class of the dropdown' */
              select_message:'Select your Address',  /* The select message of the dropdown' */
              template:''  /* The suggestion template of the dropdown' (see Autocomplete API)*/
          },
          error_message:{
              id:'getaddress_error_message',  /* The id of the error message' */
              class:'',  /* The class of the error message' */
              not_found:'Address not found',  /* The 'not found' message of the error message' */
          },
          endpoints:{
            autocomplete_url:undefined,  /* Local alterative autocomplete url (when API key is not used) */
            get_url:undefined /* Local alterative get url (when API key is not used) */
          }
        }
    );
```
## Events
```js
document.addEventListener("getaddress-find-suggestions", function(e){
    console.log(e.suggestions);
})

document.addEventListener("getaddress-find-suggestions-failed", function(e){
    console.log(e.status);
    console.log(e.message);
})

document.addEventListener("getaddress-find-address-selected", function(e){
    console.log(e.address);
})

document.addEventListener("getaddress-address-find-selected-failed", function(e){
    console.log(e.status);
    console.log(e.message);
})
```
