class SelectComponent {
    constructor(selector) {
        this.selector = selector;
    }
    
    async selectByAttribute(attribute, value) {
        await $(this.selector).selectByAttribute(attribute, value);
    }
}

export default SelectComponent;