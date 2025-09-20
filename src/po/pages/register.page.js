import BasePage from "../common/base.page.js";
import InputComponent from "../components/input.component.js";
import ButtonComponent from "../components/button.component.js";
import SelectComponent from "../components/select-component.js";



class RegisterPage extends BasePage {
    constructor(path){
        super(path);
        this.firstNameInput = new InputComponent('//input[@data-test="first-name"]');
        this.lastNameInput = new InputComponent('//input[@data-test="last-name"]');
        this.dateOfBirthInput =new InputComponent( '//input[@data-test="dob"]');
        this.addressInput = new InputComponent('//input[@data-test="street"]');
        this.postcodeInput = new InputComponent('//input[@data-test="postal_code"]');
        this.cityInput = new InputComponent('//input[@data-test="city"]');
        this.stateInput = new InputComponent('//input[@data-test="state"]');
        this.countrySelect = new SelectComponent('//select[@data-test="country"]');
        this.phoneInput = new InputComponent('//input[@data-test="phone"]');
        this.emailInput = new InputComponent('//input[@data-test="email"]');
        this.passwordInput = new InputComponent('//input[@data-test="password"]');
       
        this.registerButton = new ButtonComponent('//button[@data-test="register-submit"]');
    }

    async setCredentials(credentials){
        await this.firstNameInput.setValue(credentials.firstName)
        await this.lastNameInput.setValue(credentials.lastName)
        await this.dateOfBirthInput.setValue(credentials.dob)
        await this.addressInput.setValue(credentials.address)
        await this.postcodeInput.setValue(credentials.postcode)
        await this.cityInput.setValue(credentials.city)
        await this.stateInput.setValue(credentials.state)
        await this.countrySelect.selectByAttribute('value', credentials.country);
        await this.phoneInput.setValue(credentials.phone)
        await this.emailInput.setValue(credentials.email)
        await this.passwordInput.setValue(credentials.password)

    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

  
    async open() {
        await super.open();
    }

}

export default RegisterPage;