import Base from "../common/components/base.component.js";


class ProcudtCard extends Base{
    constructor(rootSelector){
        super(rootSelector);

 }
   
   async click() {
    this.dataTest = await this.rootEl.getAttribute('data-test');
    await this.rootEl.click();
}
    async getDataTest() {
    return this.dataTest ? this.dataTest.split('product-')[1] : '';
}
    

    
}

export default ProcudtCard;