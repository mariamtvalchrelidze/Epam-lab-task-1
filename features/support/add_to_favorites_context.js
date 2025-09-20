import MainPage from "../../src/po/pages/main.page.js";
import DetailsPage from "../../src/po/pages/details.page.js";
import DetailsContext from "./details_context.js";
import UserContext from "./user_context.js";
import ErrorMessages from "../../src/data/error-messages.js"; 


class AddtofavoritesContext {
  name;
  userContext;
  detailsContext;
  mainPage;
  detailsPage;

  constructor() {
    this.name = null;
    this.userContext = null;
    this.detailsContext = null;
    this.mainPage = null;
    this.detailsPage = null;
  }

  async beforeEach() {
    try {
      await browser.maximizeWindow();
      this.userContext = new UserContext();
      this.detailsContext = new DetailsContext();
      this.mainPage = new MainPage();
      this.detailsPage = new DetailsPage();
    } catch (error) {
      throw new Error(`${ErrorMessages.messages.page_initialization_failed}: ${error.message}`);
    }
  }
   
  async openDetail() {
    try {
      if (!this.userContext) {
        await this.beforeEach();
      }

      await this.userContext.setupValidUser();
      await browser.pause(2000);
      
      await this.userContext.attemptAccountAccess();
      await browser.pause(2000);
      
      await this.detailsContext.openToolShop();
      await browser.pause(2000);
      
      await this.detailsContext.viewProduct();
      await browser.pause(2000);
      
      this.name = await this.mainPage.getProductName();
      if (!this.name) {
        throw new Error(ErrorMessages.messages.getting_product_name_failed);
      }
    } catch (error) {
      
      throw new Error(`${ErrorMessages.messages.product_view_failed}: ${error.message}`);
    }
  }

   async addProduct() {
    try {
      if (!this.detailsPage) {
        throw new Error(ErrorMessages.messages.page_initialization_failed);
      }
      
      await this.detailsPage.addToFavorites();
    } catch (error) {
      throw new Error(`${ErrorMessages.messages.add_to_favorites_failed}: ${error.message}`);
    }
  }

  async checkIfInFavorites() {
    try {
      if (!this.mainPage) {
        this.mainPage = new MainPage("");
      }

      await browser.maximizeWindow();
      
      await this.mainPage.clickMenu();
      await this.mainPage.clickFavoritesBurgerButton();
      await browser.pause(2000);
      
      const favoriteElements = await $$('[data-test*="favorite-"]');

      if (!favoriteElements || favoriteElements.length === 0) {
        throw new Error(`${ErrorMessages.messages.favorite_not_found}: ${error.message}`);
      }

      let foundFavorite = false;

      for (let element of favoriteElements) {
        const cardTitle = await element.$('.card-title');
        if (!cardTitle) continue;
        
        const favoriteProductName = await cardTitle.getText();
        if (favoriteProductName && favoriteProductName.includes(this.name)) {
          foundFavorite = true;
          break;
        }
      }

      if (!foundFavorite) {
        throw new Error(`${ErrorMessages.messages.favorite_not_found}: ${this.name}`);
      }

      return true;
    } catch (error) {
      throw new Error(`${ErrorMessages.messages.favorites_check_failed}: ${error.message}`);
    }
  }
  
}
 

export default AddtofavoritesContext;