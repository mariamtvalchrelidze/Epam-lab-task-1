import { Given, When, Then } from '@wdio/cucumber-framework';
import CheckoutContext from '../support/checkout_context.js';
import AddtofavoritesContext from '../support/add_to_favorites_context.js';
import DetailsPage from '../../src/po/pages/details.page.js';

let checkoutContext, addToFavoritesContext, detailsPage;
checkoutContext = new CheckoutContext();
addToFavoritesContext = new AddtofavoritesContext();
detailsPage = new DetailsPage();

Given('I am a registered user and I have item added to cart', async function () {
    await addToFavoritesContext.openDetail();
    await detailsPage.addToCart();
    await detailsPage.clickCart();
});

When('I attempt to Checkout', async function () {
    checkoutContext.attemptCheckout();
});

Then('I provide billing information', async function () {
   checkoutContext.provideBillingInformation();
});
Then('I Attempt to checkout by bank transfer', async function () {
  checkoutContext.checkoutByBankTransfer();
  
});

Then('I should get an invoice number', async function () {
  let result = await checkoutContext.checkConfirmation();
  await expect(result).toBe(true);
});