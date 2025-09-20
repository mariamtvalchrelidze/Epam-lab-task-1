class BaseButton {
    constructor(rootSelector){
        this.rootSelector = rootSelector;
    }

    get rootEl() {
        return $(this.rootSelector);
    }

    async text() {
    return await this.rootEl.getText();
    }

    click() {
        this.rootEl.click();
    }
}

export default BaseButton;