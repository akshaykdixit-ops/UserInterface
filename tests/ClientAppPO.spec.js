
     const {test, expect}=require('@playwright/test');
     //const {LoginPage}= require('./pageobjects/LoginPage.js');
     //const {DashboardPage}= require('./pageobjects/DashboardPage.js');
     const {POManager}= require('../pageobjects/POManager.js');
     //JSON-> String-> JSObj
     const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));
     for (const data of dataSet)
     {
         // test('Client App Login', async ({page})=>
       test(`@Web Client App Login for ${data.productName}`, async ({page})=>
       {
        //const username= dataSet.username;
        //const password= dataSet.password;
        const poManager = new POManager(page);
        const products=page.locator(".card-body");
        const loginPage= poManager.getLoginPage(page);
        await loginPage.goTo();
        await loginPage.validLogin(data.username,data.password)
        const dashBoardPage= poManager.getDashboardPage();
        //const productName='iphone 13 pro';
        await dashBoardPage.searchProductAndAddToCart(data.productName);
        //await page.pause();
        await dashBoardPage.navigateToCart();
        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();
  
      });
      }

