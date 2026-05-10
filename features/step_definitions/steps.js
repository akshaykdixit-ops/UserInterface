const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')
const {POManager} =require('../../pageobjects/POManager.js');
const {expect}=require('@playwright/test');
const {playwright}=require('@playwright/test');
const { chromium } = require('playwright');

Given('a login to Ecommerece application with {string} and {string}', {timeout : 100*1000}, async function (username,password) {
           // Write code here that turns the phrase above into concrete actions
        this.browser = await chromium.launch({headless:false});
        const context = await this.browser.newContext();
        const page = await context.newPage();
        this.poManager = new POManager(page);
        const products=page.locator(".card-body");
        const loginPage= this.poManager.getLoginPage(page);
        await loginPage.goTo();
        await loginPage.validLogin(username,password)
         });

When('Add {string} to cart', async function (productName) {
        this.dashBoardPage= this.poManager.getDashboardPage();
        //const productName='iphone 13 pro';
        await this.dashBoardPage.searchProductAndAddToCart(productName);
        //await page.pause();
        await this.dashBoardPage.navigateToCart();
       
         });

Then('Verify {string} is displayed in the cart', async function (productName) {
        const cartPage = this.poManager.getCartPage();
        const result = await cartPage.VerifyProductIsDisplayed(productName);
        await cartPage.Checkout();
         });

When('Enter valid details and place the order', async function () {
           // Write code here that turns the phrase above into concrete actions
           const ordersReviewPage =this.poManager.getOrdersReviewPage();
           await ordersReviewPage.searchCountryAndSelect("Ind", "India");
           this.orderId= await ordersReviewPage.SubmitAndGetOrderId();
           console.log(this.orderId);
         });

Then('verify order in present in the order history', async function () {
           // Write code here that turns the phrase above into concrete actions
           await this.dashBoardPage.navigateToOrders();
           const ordersHistoryPage=this.poManager.getOrdersHistoryPage();
           await ordersHistoryPage.searchOrderAndSelect(this.orderId);
           expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
         });