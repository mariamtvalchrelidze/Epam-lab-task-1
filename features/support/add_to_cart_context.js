import DetailsPage from "../../src/po/pages/details.page.js";
import DetailsContext from "./details_context.js";
import ErrorMessages from "../../src/data/error-messages.js";

class AddToCartContext {
  initialCartQuantity;
  cartQuantity;
  userQuantity;
  newQuantity;
  detailsContext;
  detailsPage;

  constructor() {
    this.detailsPage = null;
    this.detailsContext = null;
  }

  async beforeEach() {
    try {
      await browser.maximizeWindow();
      this.detailsPage = new DetailsPage("");
      this.detailsContext = new DetailsContext("");
    } catch (error) {
      throw new Error(`${ErrorMessages.messages.page_initialization_failed}: ${error.message}`);
    }
  }
   
  async openDetail() {
    try {
      if (!this.detailsContext) {
        await this.beforeEach();
      }
      
      await this.detailsContext.openToolShop();
      await this.detailsContext.viewProduct();
    } catch (error) {
      throw new Error(`${ErrorMessages.messages.product_view_failed}: ${error.message}`);
    }
  }

  async addProduct() {
    try {
      if (!this.detailsPage) {
        throw new Error(ErrorMessages.messages.page_initialization_failed);
      }

      this.initialCartQuantity = await this.detailsPage.getCartQuantity();
      if (this.initialCartQuantity === null || this.initialCartQuantity === undefined) {
        throw new Error(ErrorMessages.messages.failed_to_get_cart_quantity);
      }

      await this.detailsPage.increase_quantity();
      await this.detailsPage.addToCart();
      this.userQuantity = await this.detailsPage.getUserQuantity();

      if (this.userQuantity === null || this.userQuantity === undefined) {
        throw new Error(ErrorMessages.messages.failed_to_get_selected_quantity);
      }
    } catch (error) {
        throw new Error(`${ErrorMessages.messages.add_to_cart_failed}: ${error.message}`);
    }
  }

  async checkCartQuantity() {
    try {
      if (!this.detailsPage) {
        throw new Error(ErrorMessages.messages.page_initialization_failed);
      }

      await browser.pause(2000);
      
      this.newQuantity = this.initialCartQuantity + this.userQuantity;
      this.cartQuantity = await this.detailsPage.getCartQuantity();
      
      if (this.cartQuantity === null || this.cartQuantity === undefined) {
        throw new Error(ErrorMessages.messages.failed_to_get_cart_quantity);
      }

      
      
      if (this.newQuantity !== this.cartQuantity) {
        throw new Error(
          `${ErrorMessages.messages.quantity_does_not_match}. Expected: ${this.newQuantity}, Actual: ${this.cartQuantity}`
        );
      }
      
      return true;
    } catch (error) {
        throw new Error(`${ErrorMessages.messages.quantity_does_not_match}: ${error.message}`);
    }
  }
  
}
 

export default AddToCartContext;