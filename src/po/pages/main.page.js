import BasePage from "../common/base.page.js";
import ButtonComponent from "../components/button.component.js";
import LinkComponent from "../components/link.component.js";
import ProductCard from "../components/product_card.component.js";
import InputComponent from "../components/input.component.js";




class MainPage extends BasePage {
    constructor(path){
        super(path);
        this.signinButton = new LinkComponent('//a[@data-test="nav-sign-in"]');
        this.productCard = new ProductCard('[data-test^="product-"]');
        this.menu = new LinkComponent('//a[@id="menu"]');
        this.home = new LinkComponent('//a[@data-test="nav-home"]');
        this.favoritesBurgerButton = new LinkComponent('//a[@data-test="nav-my-favorites"]');
        this.searchInput = new InputComponent('//input[@data-test="search-query"]');
        this.searchButton = new ButtonComponent('//button[@data-test="search-submit"]');
        this.clearSearchButton = new ButtonComponent('//button[@data-test="search-reset"]');
        this.languageButton= new  ButtonComponent('//button[@data-test="language-select"]');
        this.languageOption = new LinkComponent('//a[@data-test="lang-de"]');
        this.languageOptions = new LinkComponent('//a[starts-with(@data-test, "lang-")]');
        
    }
    async getProductName() {
            const productNameElement = await $('[data-test="product-name"]');
            return await productNameElement.getText();
        }
     async clickSigninButton() {
         
         await this.signinButton.click();
        }   
        async clickProduct() {
            
            await this.productCard.click();
        }

        async getDataTestProduct() {
            return await this.productCard.getDataTest();
        }
        async clickMenu(){
            return await this.menu.click();
        }
        async clickHome(){
            return await this.home.click();
        }
        async clickFavoritesBurgerButton(){
            return await this.favoritesBurgerButton.click();
        }
        async clickSearch(){
            await this.searchButton.click();
        }
        async SearchForProducts(searchTerm) {
         await this.searchInput.setValue(searchTerm);
         await this.clickSearch();
        }
        async clearSearch(){
            this.clearSearchButton.click();
        }
        async selectLanguage(language) {
            await this.languageButton.click();
            await browser.pause(500);
            
            const languageOptionButton = new ButtonComponent(`//a[@data-test="lang-${language}"]`);
            await languageOptionButton.click();
                
        }
        async getCurrentLanguage() {
            const buttonText = await $('//button[@data-test="language-select"]').getText();
            return buttonText.trim();
            
        }
        
        async open() {
            await super.open();
        }
        



}

export default MainPage;