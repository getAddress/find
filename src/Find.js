/* import {Suggestion} from './ClientTypes'; */
import { LookupSuccessEvent, LookupFailedEvent, AddressSelectedEvent } from './Types';
import Button from './Button';
import Input from './Input';
import Dropdown from './Dropdown';
import ErrorMessage from './ErrorMessage';
import OutputFields from './OutputFields';
export default class Find {
    constructor(context, getAddress, inputConfig, buttonConfig, dropdownConfig, errorMessgeConfig, outputFieldConfig, autocomplete_options) {
        this.context = context;
        this.getAddress = getAddress;
        this.autocomplete_options = autocomplete_options;
        this.clearAll = () => {
            this.errorMessage.remove();
            this.dropdown.remove();
            this.outputFields.clear();
        };
        this.setupDropdown = (suggestions) => {
            const onChange = (async () => {
                let id = this.dropdown.value;
                if (id !== this.dropdown.firstOptionValue) {
                    let addressResult = await this.getAddress.get(id);
                    if (addressResult.isSuccess) {
                        let success = addressResult.toSuccess();
                        this.outputFields.bind(success.address);
                        var addressSelectedEvent = new AddressSelectedEvent("getaddress-address-selected", { bubbles: true });
                        addressSelectedEvent.address = success.address;
                        this.context.dispatchEvent(addressSelectedEvent);
                    }
                    else {
                        let failed = addressResult.toFailed();
                        this.errorMessage.setup(failed.status, failed.message);
                        var lookupFailedEvent = new LookupFailedEvent("getaddress-address-selected-failed", { bubbles: true });
                        lookupFailedEvent.status = failed.status;
                        lookupFailedEvent.message = failed.message;
                        this.context.dispatchEvent(lookupFailedEvent);
                    }
                }
            });
            this.dropdown.setup(onChange, suggestions);
        };
        this.lookup = async (query) => {
            let options = {
                all: true,
                template: this.dropdown.config.template,
                top: null
            };
            options = Object.assign(options, this.autocomplete_options);
            let result = await this.getAddress.autocomplete(query, options);
            this.button.enable();
            if (result.isSuccess) {
                let success = result.toSuccess();
                this.setupDropdown(success.suggestions);
                var lookupSuccessEvent = new LookupSuccessEvent("getaddress-lookup-success", { bubbles: true });
                lookupSuccessEvent.suggestions = success.suggestions;
                this.context.dispatchEvent(lookupSuccessEvent);
            }
            else {
                let failed = result.toFailed();
                this.errorMessage.setup(failed.status, failed.message);
                var lookupFailedEvent = new LookupFailedEvent("getaddress-lookup-failed", { bubbles: true });
                lookupFailedEvent.status = failed.status;
                lookupFailedEvent.message = failed.message;
                this.context.dispatchEvent(lookupFailedEvent);
            }
        };
        this.setupEvents = (button, input) => {
            input.onKeyPress(button.click);
            button.onClick(async () => {
                let query = input.value;
                if (query && query !== this.input.config.label) {
                    button.disable();
                    this.clearAll();
                    await this.lookup(query);
                }
                return false;
            });
        };
        this.input = new Input(inputConfig);
        this.button = new Button(buttonConfig);
        this.dropdown = new Dropdown(dropdownConfig);
        this.errorMessage = new ErrorMessage(errorMessgeConfig);
        this.outputFields = new OutputFields(outputFieldConfig);
        this.setupEvents(this.button, this.input);
    }
}
//# sourceMappingURL=Find.js.map