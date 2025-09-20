import BasePage from "../common/base.page.js";
import InputComponent from "../components/input.component.js";
import LinkComponent from "../components/link.component.js";



class LoginPage extends BasePage {
    constructor(path){
        super(path);
        this.usernameInput = new InputComponent('//input[@data-test="email"]');
        this.passwordInput = new InputComponent('//input[@id="password"]');
        this.registerLink = new LinkComponent('//a[@data-test="register-link"]');;
        this.loginButton = new InputComponent('//input[@data-test="login-submit"]');
       
    }

    
    async setCredentials(credentials){
        await this.usernameInput.setValue(credentials.email)
        await this.passwordInput.setValue(credentials.password)
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
    async clickRegisterLink(){
        await this.registerLink.click();
    }

  
    async open() {
        await super.open();
    }

}

export default LoginPage;