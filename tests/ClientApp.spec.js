const {test, expect}=require('@playwright/test')

test('Browser Context Playwright Test',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username= page.locator('#username');
    //const password= page.locator("[type='password']");
    const signIn= page.locator("#signInBtn");
    const cardTitles=page.locator(".card-body>.card-title");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await page.locator("#signInBtn").click();
    //selenium will require wait over here
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signIn.click();
    //console.log(await cardTitles.nth(1).textContent());
    //console.log(await cardTitles.first.textContent());
    //await page.waitForLoadState('networkidle');
    await cardTitles.first().waitFor();
    const allTitles=await cardTitles.allTextContents();
    console.log(allTitles);

});

test('Page Playwright Test',async ({page})=>
{
    
    await page.goto("https://google.com");
    //get title and assert
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('UI Controls',async ({page})=>
{
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //get title and assert
     const username= page.locator('#username');
    //const password= page.locator("[type='password']");
    const signIn= page.locator("#signInBtn");
    
    const drpdown=page.locator("select.form-control");
    const documentLink = page.locator("[href*='https://rahulshettyacademy.com/documents-request']");
    await drpdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").check();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    await page.pause();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test('@Child windows handl',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username= page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all(
    [
    context.waitForEvent('page'),//listen for new page , pending rejected fulfilled promises
    documentLink.click(),
    ])
     const text = await newPage.locator(".red").textContent();
    console.log(text);
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
   });

   test('Client App Login', async ({page})=>
   {
    const email= "akshaykdixit@gmail.com";
    const products=page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Sumer$202425");
    const signin=page.locator("#login");
    await signin.click(),
    await page.waitForLoadState('networkidle');
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