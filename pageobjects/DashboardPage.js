class DashboardPage{

    constructor(page)
    {
        this.page=page;
        this.products=page.locator(".card-body");
        this.productsText=page.locator(".card-body b");
        this.cart=page.locator("[routerlink*='cart']");
        this.orders =page.locator("button[routerlink*='myorders']");
    }
    async searchProductAndAddToCart(productName)
    {
    
    const titles= await this.productsText.allTextContents();
    console.log(titles);
    const count =await this. products.count();
    console.log("count="+count);
    for(let i=0;i<count;i++)
    {
        console.log(i);
        const text = await this.products.nth(i).locator("b").textContent();
       if(text.trim().toLowerCase() === productName.trim().toLowerCase())
       {
        console.log("Inside Add to cart logic");
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
       }
       
    }

    }

    async navigateToCart()
    {
        await this.cart.click();
    }
    async navigateToOrders()
    {
    await this.orders.click();
    }

    
}
module.exports={DashboardPage};