import { Given, When, Then} from '@wdio/cucumber-framework';
import NameFilterContext from '../support/name_filter_context.js';

let nameFilterContext;

nameFilterContext = new NameFilterContext("");

Given('I am on the main products page', async function () {
   await nameFilterContext.openToolShop();
});

When('I search for specific product by name', async function () {
   await nameFilterContext.searchForSpecificProduct();

});

Then('I should see search results corresponding this product', async function () {
    let result = await nameFilterContext.checkSearchFilteredProducts();
    await expect(result).toBe(true);
 
});

Then("I should be able to clear the search results", async () => {
    let result = await nameFilterContext.clearSearchResults();
    await expect(result).toBe(true);
});