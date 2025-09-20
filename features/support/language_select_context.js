import MainPage from "../../src/po/pages/main.page.js";
import Language from "../../src/data/language.js";
import ErrorMessages from "../../src/data/error-messages.js";

class LanguageSelectContext {
    mainPage;

    constructor() {
        this.mainPage = null;
    }

    async beforeEach() {
        try {
            await browser.maximizeWindow();
            this.mainPage = new MainPage("");
        } catch (error) {
            throw new Error(`${ErrorMessages.messages.page_initialization_failed}: ${error.message}`);
        }
    }

    async openToolShop() {
        try {
            if (!this.mainPage) {
                await this.beforeEach();
            }
            
            await this.mainPage.open();
        } catch (error) {
            throw new Error(`${ErrorMessages.messages.shop_open_failed}: ${error.message}`);
        }
    }

    async changeLanguage() { 
        try {
            const { language } = Language; 
            if (!language) {
                throw new Error(ErrorMessages.messages.language_data_missing);
            }

            await this.mainPage.selectLanguage(language);
        } catch (error) {
            throw new Error(`${ErrorMessages.messages.language_select_failed}: ${error.message}`);
        }
    }
    
    async verifyLanguageChange() {
        try {
            const { language } = Language; 
            if (!language) {
                throw new Error(ErrorMessages.messages.language_data_missing);
            }
            
            await browser.pause(1000);
            
            const currentLanguage = await this.mainPage.getCurrentLanguage();
            if (!currentLanguage) {
                throw new Error(ErrorMessages.messages.getting_current_language_failed);
            }

            const isLanguageChanged = currentLanguage.includes(language.toUpperCase());
            
            if (!isLanguageChanged) {
                throw new Error(
                    `${ErrorMessages.messages.language_not_changed}. Expected: "${language.toUpperCase()}", but current language is: "${currentLanguage}"`
                );
            }
            
            return true;
        } catch (error) {

            throw new Error(`${ErrorMessages.messages.language_verification_failed}: ${error.message}`);
        }
    }
}

export default LanguageSelectContext;