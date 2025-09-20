import { Given, When, Then } from '@wdio/cucumber-framework';
import UserContext from '../support/user_context.js';

let userContext;

Given('I go to login page', async function () {
    userContext = new UserContext();
    await userContext.setupValidUser();
});

When('I attempt to access my account', async function () {
    await userContext.attemptAccountAccess();

});

Then('I should be logged into the system', async function () {
  const isAuthenticated = await userContext.isAuthenticated();
  await expect(isAuthenticated).toBe(true);
});



