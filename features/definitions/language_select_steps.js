import { Given, When, Then } from '@wdio/cucumber-framework';
import LanguageSelectContext from '../support/language_select_context.js';

let languageSelectContext;
languageSelectContext = new LanguageSelectContext();

Given('I go to Toolshop Main Page', async function () {
    await languageSelectContext.openToolShop();
});

When('I select a different language', async function () {
    await languageSelectContext.changeLanguage();
});

Then('I should see the language icon showing the newly selected language', async function () {
  let result = await languageSelectContext.verifyLanguageChange();
  await expect(result).toBe(true);
});