import BasePage from "../common/base.page.js";
import InputComponent from "../components/input.component.js";
import ButtonComponent from "../components/button.component.js";
import SelectComponent from "../components/select-component.js";



class CheckoutPage extends BasePage {
    constructor(path){
        super(path);
        this.addressInput = new InputComponent('//input[@data-test="street"]');
        this.postcodeInput = new InputComponent('//input[@data-test="postal_code"]');
        this.cityInput = new InputComponent('//input[@data-test="city"]');
        this.stateInput = new InputComponent('//input[@data-test="state"]');
        this.countryFullInput = new InputComponent('//input[@data-test="country"]');
        this.bankNameInput = new InputComponent('//input[@data-test="bank_name"]');
        this.accountNameInput = new InputComponent('//input[@data-test="account_name"]');
        this.accountNmumberInput = new InputComponent('//input[@data-test="account_number"]');
        
        this.paymentMthodSelect = new SelectComponent('//select[@data-test="payment-method"]');

        this.checkoutButtonOne = new ButtonComponent('//button[@data-test="proceed-1"]');
        this.checkoutButtonTwo = new ButtonComponent('//button[@data-test="proceed-2"]');
        this.checkoutButtonThree = new ButtonComponent('//button[@data-test="proceed-3"]');
        this.checkoutButtonFinish= new ButtonComponent('//button[@data-test="finish"]');
        this.confimation = new ButtonComponent('//div[@id="order-confirmation"]');
    }

    async setBillingCredentials(credentials){
        await this.addressInput.setValue(credentials.address)
        await this.postcodeInput.setValue(credentials.postcode)
        await this.cityInput.setValue(credentials.city)
        await this.stateInput.setValue(credentials.state)
        await this.countryFullInput.setValue(credentials.country_full)
        

    }
    async setPaymentMethod(payment_credentials){
        await browser.pause(2000);
        await this.paymentMthodSelect.selectByAttribute('value', payment_credentials.payment);
    }
    async setPaymentCredentials(payment_credentials){
        await this.bankNameInput.setValue(payment_credentials.bank)
        await this.accountNameInput.setValue(payment_credentials.account)
        await this.accountNmumberInput.setValue(payment_credentials.accNum)
    }

    async clickCheckoutButtonOne() {
        await this.checkoutButtonOne.click();
    }
    async clickCheckoutButtonTwo() {
        await this.checkoutButtonTwo.click();
    }

    async clickCheckoutButtonThree() {
        await this.checkoutButtonThree.click();
    }

    async clickCheckoutButtonFinish() {
        await this.checkoutButtonFinish.click();
    }

    async getConfirmationText(){
       return await this.confimation.text();
    }


  
    async open() {
        await super.open();
    }

}

export default CheckoutPage;