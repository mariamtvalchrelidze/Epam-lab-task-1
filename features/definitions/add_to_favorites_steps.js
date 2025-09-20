import { Given, When, Then } from '@wdio/cucumber-framework';
import AddToFavoritesContext from '../support/add_to_favorites_context.js';

let addToFavoritesContext;

addToFavoritesContext = new AddToFavoritesContext();
Given('As a registered user I am on the product details page', async function () {
    await addToFavoritesContext.openDetail();
});

When('I attampt to add product to Favorites', async function () {
    await addToFavoritesContext.addProduct();
});

Then('The product should be in my Favorites list', async function () {
  const check = await addToFavoritesContext.checkIfInFavorites();
  try{
  await expect(check).toBe(true);
  }catch{
    throw new Error('Test requires an authorized user. Please ensure user is logged in before running this test.');
  }
 
});