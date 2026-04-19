Feature: Ecommerce validation

Scenario: Placing the order
Given a login to Ecommerece application with "akshaykdixit"
When Add "zara coat 3" to cart 
Then Verify "zara coat 3" is displayed in the cart
When Enter valid details and place the order
Then verify order in present in the order history.