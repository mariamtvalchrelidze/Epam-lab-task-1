import MainPage from "../../src/po/pages/main.page.js";
import LoginPage from "../../src/po/pages/login.page.js";
import Credentials from "../../src/data/credentials.js";
import UserRegistrationContext from "./user_registration_context.js";
import ErrorMessages from "../../src/data/error-messages.js";


class UserContext {
  userRegistrationContext;
  mainPage;
  loginPage;

  constructor() {
    this.userRegistrationContext = null;
    this.mainPage = null;
    this.loginPage = null;
  }

  async beforeEach() {
    try {
      await browser.maximizeWindow();
      this.userRegistrationContext = new UserRegistrationContext("");
      this.mainPage = new MainPage("");
      this.loginPage = new LoginPage("");
    } catch (error) {
      throw new Error(`${ErrorMessages.messages.page_initialization_failed}: ${error.message}`);
    }
  }

  async setupValidUser() {
    try {
      if (!this.userRegistrationContext) {
        await this.beforeEach();
      }
      
      await this.userRegistrationContext.setupValidUser();
      await this.userRegistrationContext.attemptRegistration();
      await browser.pause(2000);
      await this.mainPage.open();
    } catch (error) {
      throw new Error(`${ErrorMessages.messages.user_setup_failed}: ${error.message}`);
    }
  }

  async attemptAccountAccess() {
    try {
      if (!this.mainPage || !this.loginPage) {
        await this.beforeEach();
      }

      await this.mainPage.clickSigninButton();
      
      const { credentials } = Credentials;
      if (!credentials || credentials.length === 0) {
        throw new Error(ErrorMessages.messages.credentials_missing);
      }

      await this.loginPage.setCredentials({
        email: credentials[0].email,
        password: credentials[0].password 
      });
      
      await this.loginPage.clickLoginButton();
    } catch (error) {
      throw new Error(`${ErrorMessages.messages.account_access_failed}: ${error.message}`);
    }
  }

  async isAuthenticated() {
    try {
      if (!this.mainPage) {
        await this.beforeEach();
      }
      await browser.waitUntil(async () => (await browser.getUrl()).includes('/account'));
      const currentUrl = await browser.getUrl();
      return currentUrl.includes('account');

    } catch (error) {
      throw new Error(`${ErrorMessages.messages.authentication_check_failed}: ${error.message}`);
    }
  }
}
 
export default UserContext;