declare class SetupOptions {
    endpoints: {
        autocomplete_url: undefined;
        get_url: undefined;
        autocomplete_options: {};
    };
    input: {};
    button: {};
    dropdown: {};
    error_message: {};
    output_fields: {};
}

declare function find(container_id: string, api_key?: string, options?: SetupOptions): HTMLElement | null;

export { SetupOptions, find };
