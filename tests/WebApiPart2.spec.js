const {test,expect} = require('@playwright/test');
let webContext;

test.beforeAll(async({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();
    const email= "akshaykdixit@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Sumer$202425");
    const signin=page.locator("#login");
    await signin.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});
    webContext= await browser.newContext({storageState:'state.json'});
});
test('Client App Login', async ()=>
   {
    const page= await webContext.newPage();
  const email= "akshaykdixit@gmail.com";
    
    await page.goto("https://rahulshettyacademy.com/client");
    
   
   const products=page.locator(".card-body");
    const titles= await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count =await products.count();
    const product='iphone 13 pro';
    for(let i=0;i<count;i++)
    {
       if(await products.nth(i).locator("b").textContent()== product)
       {
        //console.log("Add to cart logic required");
        await products.nth(i).locator("text= Add To Cart").click();
        break;
       }
       
    }
   
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
   const dropdown=page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   console.log(optionsCount);
   

   for (let i = 0; i < optionsCount; i++) {
    await dropdown.locator("button").first().waitFor();
      const text = await dropdown.locator("button").nth(i).textContent();
      console.log(text);
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         console.log("inside if loop");
         break;
      }
      
   }
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
   await page.pause();
   
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = page.locator("tbody tr");
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
   });

   test('TestCase2', async ()=>
   {
  const email= "akshaykdixit@gmail.com";
    
    await page.goto("https://rahulshettyacademy.com/client");
    
   const page= await webContext.newPage();
   const products=page.locator(".card-body");
    const titles= await page.locator(".card-body b").allTextContents();
    console.log(titles);
   });