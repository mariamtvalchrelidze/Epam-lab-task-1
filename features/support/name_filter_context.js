import MainPage from "../../src/po/pages/main.page.js";
import Search_query from "../../src/data/search_query.js";
import ErrorMessages from "../../src/data/error-messages.js";   

class NameFilterContext {
    prevLength;
    mainPage;

    constructor() {
        this.prevLength = null;
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

    async searchForSpecificProduct() {
        try {
            if (!Search_query.search_query.search_word) {
                throw new Error(ErrorMessages.messages.search_query_missing);
            }

            const searchQuery = Search_query.search_query.search_word;
            await this.mainPage.SearchForProducts(searchQuery);
        } catch (error) {
            throw new Error(`${ErrorMessages.messages.search_failed}: ${error.message}`);
        }
    }

    async checkSearchFilteredProducts() {
        try {
            if (!Search_query.search_query.search_word) {
                throw new Error(ErrorMessages.messages.search_query_missing);
            }

            const searchTerm = Search_query.search_query.search_word.toLowerCase();
            
            await browser.waitUntil(
                async () => {
                    const searchContainer = await $('[data-test="search_completed"]');
                    return await searchContainer.isDisplayed();
                });

            const products = await $$('[data-test="search_completed"] a[data-test^="product-"]');
            if (!products || products.length === 0) {
                throw new Error(`${ErrorMessages.messages.no_products_found}: ${error.message}`);
            }

            for (let i = 0; i < products.length; i++) {
                const cardTitle = await products[i].$('.card-title');
                const productName = await cardTitle.getText();
                if (!productName.toLowerCase().includes(searchTerm)) {
                    throw new Error(
                        `${ErrorMessages.messages.search_filter_mismatch}. Product "${productName}" does not contain search term "${searchTerm}"`
                    );
                }
            }

            this.prevLength = products.length;
            
            return true;
        } catch (error) {
            throw new Error(`${ErrorMessages.messages.search_results_validation_failed}: ${error.message}`);
        }
    }

    async clearSearchResults() {
        try {
            if (!this.mainPage) {
                throw new Error(ErrorMessages.messages.page_initialization_failed);
            }

            await this.mainPage.clearSearch();
            const products = await $$('[data-test^="product-"]');
            if (!products || products.length === 0) {
                throw new Error(`${ErrorMessages.messages.no_products_found}: ${error.message}`);
            }
            
            if(products.length > this.prevLength) return true;
            return false;

        } catch (error) {
            throw new Error(`${ErrorMessages.messages.search_clear_failed}: ${error.message}`);
        }
    }
}

 

export default NameFilterContext;