import { Given, When, Then } from '@wdio/cucumber-framework';
import DetailsContext from '../support/details_context.js';

let detailsContext;
detailsContext = new DetailsContext();

Given('I am on the ToolShop homepage', async function () {
    await detailsContext.openToolShop();
});

When('I view a specific product', async function () {
    await detailsContext.viewProduct();
});

Then('I should see the product detail page', async function () {
    let includes = await detailsContext.checkProduct();
    await expect(includes).toBe(true);
});

