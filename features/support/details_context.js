import MainPage from "../../src/po/pages/main.page.js";
import ErrorMessages from "../../src/data/error-messages.js";

class DetailsContext {
  id;
  mainPage;

  constructor() {
    this.id = null;
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

  async viewProduct() {
    try {
      if (!this.mainPage) {
        this.mainPage = new MainPage("");
      }
      
      await this.mainPage.clickProduct();
      
      this.id = await this.mainPage.getDataTestProduct();
      if (!this.id)  throw new Error(ErrorMessages.messages.getting_product_id_failed);
      
    } catch (error) {
        throw new Error(`${ErrorMessages.messages.product_view_failed}: ${error.message}`);
    }
  }

  async checkProduct() {
    try {
      if (!this.mainPage) {
        this.mainPage = new MainPage("");
      }
      
      await browser.waitUntil(
        async () => (await browser.getUrl()).includes('/product')
      );

      
      let success = false;
      if ((await browser.getUrl()).includes(this.id)) success = true;
      return success;

    } catch (error) {
      throw new Error(`${ErrorMessages.messages.product_check_failed}: ${error.message}`);
    }
  }
  
}
 
export default DetailsContext;