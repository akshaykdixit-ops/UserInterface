const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')
const {POManager} =require('../../pageobjects/POManger');
const {test, expect, playwright}=require('@playwright/test');

Given('a login to Ecommerece application with {email}', async function (string) {
           // Write code here that turns the phrase above into concrete actions
           const browser = playwright.chromium.launch();
         const context = await browser.newContext();
    const page = await context.newPage();
           const poManager = new POManager(page);
        const products=page.locator(".card-body");
        const loginPage= poManager.getLoginPage(page);
        await loginPage.goTo();
        await loginPage.validLogin(data.username,data.password)
         });

When('Add {string} to cart', async function (string) {
        const dashBoardPage= poManager.getDashboardPage();
        //const productName='iphone 13 pro';
        await dashBoardPage.searchProductAndAddToCart(data.productName);
        //await page.pause();
        await dashBoardPage.navigateToCart();
       
         });

Then('Verify {string} is displayed in the cart', async function (string) {
             const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();
         });

When('Enter valid details and place the order', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('verify order in present in the order history.', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });