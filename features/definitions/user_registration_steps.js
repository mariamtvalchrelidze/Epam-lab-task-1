import { Given, When, Then } from '@wdio/cucumber-framework';
import UserRegistrationContext from '../support/user_registration_context.js';

let userRegistrationContext;
userRegistrationContext = new UserRegistrationContext();

Given('I am on the main page of ToolShop', async function () {
    await userRegistrationContext.setupValidUser();
});

When('I attempt registration with valid inputs', async function () {
    await userRegistrationContext.attemptRegistration();
});

Then('I should be able to log in', async function () {
  const isRegistered = await userRegistrationContext.isRegistered();
  await expect(isRegistered).toBe(true);
});
