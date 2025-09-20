import Base from '../common/components/base.component.js';


class Input extends Base {
    constructor(rootSelector){
        super(rootSelector);
    }
    get value() {
        return this.rootEl.getValue();
    }

    set value(value) {
        this.rootEl.setValue(value);
    }
    async setValue(value) {
        await this.rootEl.setValue(value);
    }
}

export default Input;