import MainPage from "../../src/po/pages/main.page.js";
import RegisterPage from "../../src/po/pages/register.page.js";
import LoginPage from "../../src/po/pages/login.page.js";
import Credentials from "../../src/data/credentials.js";
import UserContext from "./user_context.js";
import ErrorMessages from "../../src/data/error-messages.js";

class UserRegistrationContext {
  mainPage;
  registerPage;
  loginPage;
  userContext;

  constructor() {
    this.mainPage = null;
    this.registerPage = null;
    this.loginPage = null;
    this.userContext = null;
  }

  async beforeEach() {
    try {
      await browser.maximizeWindow();
      this.mainPage = new MainPage("");
      this.loginPage = new LoginPage("");
      this.registerPage = new RegisterPage("");
      this.userContext = new UserContext("");
    } catch (error) {
      throw new Error(`${ErrorMessages.messages.page_initialization_failed}: ${error.message}`);
    }
  }

  async setupValidUser() {
    try {
      if (!this.mainPage || !this.loginPage) {
        await this.beforeEach();
      }

      await this.mainPage.open();
      await browser.pause(2000);
      await this.mainPage.clickSigninButton();
      await browser.pause(2000);
      await this.loginPage.clickRegisterLink();
    } catch (error) {
      throw new Error(`${ErrorMessages.messages.registration_setup_failed}: ${error.message}`);
    }
  }

  async attemptRegistration() {
    try {
      if (!this.registerPage) {
        this.beforeEach();
      }

      const { credentials } = Credentials;
      if (!credentials || !credentials[0]) {
        throw new Error(ErrorMessages.messages.credentials_missing);
      }

      const registrationData = {
        email: credentials[0].email,
        password: credentials[0].password,
        country: credentials[0].country,
        firstName: credentials[0].firstName, 
        lastName: credentials[0].lastName,
        dob: credentials[0].dob, 
        address: credentials[0].address,
        postcode: credentials[0].postcode, 
        city: credentials[0].city,
        state: credentials[0].state,
        phone: credentials[0].phone   
      };
      if (!registrationData.email || !registrationData.password || !registrationData.firstName || !registrationData.lastName || !registrationData.dob ||
          !registrationData.address || !registrationData.postcode || !registrationData.city || !registrationData.state || !registrationData.country) {
        throw new Error(ErrorMessages.messages.registration_incomplete_data);
      }

      await this.registerPage.setCredentials(registrationData);
      await this.registerPage.clickRegisterButton();
    } catch (error) {
      throw new Error(`${ErrorMessages.messages.user_registration_failed}: ${error.message}`);
    }
  }

  async isRegistered() {
    try {
      if (!this.userContext) {
        this.beforeEach();
      }

      await this.userContext.attemptAccountAccess();
      return await this.userContext.isAuthenticated();

    } catch (error) {
      throw new Error(`${ErrorMessages.messages.registration_verification_failed}: ${error.message}`);
    }
  }
}
 
export default UserRegistrationContext;