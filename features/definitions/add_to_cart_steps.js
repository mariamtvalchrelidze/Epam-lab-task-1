import { Given, When, Then } from '@wdio/cucumber-framework';
import AddToCartContext from '../support/add_to_cart_context.js';

let addToCartContext;
addToCartContext = new AddToCartContext();

Given('I am on the product details page', async function () {
    await addToCartContext.openDetail();
});

When('I attampt to add product to cart', async function () {
    await addToCartContext.addProduct();
});

Then('I should see the cart number increase', async function () {
  const check = await addToCartContext.checkCartQuantity();
  await expect(check).toBe(true);
 
});