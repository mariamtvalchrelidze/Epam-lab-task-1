import BasePage from "../common/base.page.js";
import ButtonComponent from "../components/button.component.js";
import LinkComponent from "../components/link.component.js";


class DetailsPage extends BasePage {
    constructor(path){
        super(path);
        this.addToCartButton = new ButtonComponent('//button[@id="btn-add-to-cart"]');
        this.addToFavoritesButton = new ButtonComponent('//button[@id="btn-add-to-favorites"]');
        this.increaseButton = new ButtonComponent('//button[@id="btn-increase-quantity"]');
        this.decreaseButton = new ButtonComponent('//button[@id="btn-decrease-quantity"]');
        this.cartButton = new LinkComponent('//a[@data-test = "nav-cart"]'); 
        
        
        
    }
    async getCartQuantity(){
        try {
                const cartElement = await $('[data-test="cart-quantity"]');
                if (await cartElement.isExisting()) {
                    const text = await cartElement.getText();
                    return parseInt(text);
                }
                return 0;
            } catch (error) {
                return 0;
            }
        }
    async getUserQuantity(){
      
        const quantityInput = await $('//input[@id="quantity-input"]');
        const value = await quantityInput.getValue();
        return parseInt(value);

    }
    async increase_quantity(){
        await this.increaseButton.click();
    }
    async decrease_quantity(){
        await this.increaseButton.click();
    
    }

    async addToCart(){
       await this.addToCartButton.click();
    }
    async addToFavorites(){
        await this.addToFavoritesButton.click();
    }
    async clickCart(){
        await this.cartButton.click();
    }

    async open() {
       await super.open();
    }
    



}

export default DetailsPage;