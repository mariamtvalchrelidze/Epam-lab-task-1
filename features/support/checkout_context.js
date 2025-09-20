import CheckoutPage from "../../src/po/pages/checkout.page.js";
import DetailsPage from "../../src/po/pages/details.page.js";
import Credentials from "../../src/data/credentials.js";
import PaymentCredentials from "../../src/data/payment_credentials.js";
import DetailsContext from "./details_context.js";
import AddTofavoritesContext from "./add_to_favorites_context.js";
import ErrorMessages from "../../src/data/error-messages.js";





class CheckoutContext {
    checkoutPage;
    detailsPage;
    addToFavoritesContext;
    detailsContext;

    constructor() {
        this.checkoutPage = null;
        this.detailsPage = null;
        this.addToFavoritesContext = null;
        this.detailsContext = null;
    }
    async beforeEach() {
        try {
            this.checkoutPage = new CheckoutPage();
            this.detailsPage = new DetailsPage();
            this.addToFavoritesContext = new AddTofavoritesContext();
            this.detailsContext = new DetailsContext();
        } catch (error) {
            throw new Error(`${ErrorMessages.messages.page_initialization_failed}: ${error.message}`);
        }
    }

    async attemptCheckout() {
        try {
            if (!this.checkoutPage) {
                await this.beforeEach();
            }

            await this.checkoutPage.clickCheckoutButtonOne();
            await browser.pause(2000);
            await this.checkoutPage.clickCheckoutButtonTwo();

        } catch (error) {
            throw new Error(`${ErrorMessages.messages.checkout_attempt_failed}: ${error.message}`);
        }
    }

    async provideBillingInformation() {
        try {
            if (!this.checkoutPage) {
                throw new Error(ErrorMessages.messages.page_initialization_failed);
            }

            const { credentials } = Credentials;
            if (!credentials || !credentials[0]) {
                throw new Error(ErrorMessages.messages.credentials_missing);
            }

            const billingData = {
                country_full: credentials[0].country_full,
                address: credentials[0].address,
                postcode: credentials[0].postcode, 
                city: credentials[0].city,
                state: credentials[0].state,
            };

            
            if (!billingData.country_full || !billingData.address || !billingData.city || !billingData.postcode || !billingData.state) {
                throw new Error(ErrorMessages.messages.credentials_missing);
            }

            await this.checkoutPage.setBillingCredentials(billingData);
            await this.checkoutPage.clickCheckoutButtonThree();

        } catch (error) {
            throw new Error(`${ErrorMessages.messages.billing_info_failed}: ${error.message}`);
        }
    }

    async checkoutByBankTransfer() {
        try {
            if (!this.checkoutPage) {
                throw new Error(ErrorMessages.messages.page_initialization_failed);
            }

            const { paymentCredentials } = PaymentCredentials;
            if (!paymentCredentials || !paymentCredentials[0]) {
                throw new Error(ErrorMessages.messages.credentials_missing);
            }

            if (!paymentCredentials[0].payment || !paymentCredentials[0].bank || !paymentCredentials[0].account || !paymentCredentials[0].accNum) {
                throw new Error(ErrorMessages.messages.credentials_missing);
            }

            await this.checkoutPage.setPaymentMethod({ payment: paymentCredentials[0].payment });
            
            await this.checkoutPage.setPaymentCredentials({
                bank: paymentCredentials[0].bank,
                account: paymentCredentials[0].account, 
                accNum: paymentCredentials[0].accNum,
            });
            
            await this.checkoutPage.clickCheckoutButtonFinish();
            await browser.pause(2000);
            await this.checkoutPage.clickCheckoutButtonFinish();
        } catch (error) {
            throw new Error(`${ErrorMessages.messages.finishing_checkout_failed}: ${error.message}`);
        }
    }   
    
    async checkConfirmation() {
        try {
            if (!this.checkoutPage) {
                throw new Error(ErrorMessages.messages.page_initialization_failed);
            }
            let confirm =  await this.checkoutPage.getConfirmationText();
            if(confirm.includes("Thanks for your order!")) return true
            else return false

        } catch (error) {
            throw new Error(`${ErrorMessages.messages.confirmation_check_failed}: ${error.message}`);
        }
    }
  
}
 

export default CheckoutContext;