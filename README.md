
# E-commerce Website

An e-commerce website built using ReactJS and NodeJS. E-commerce ( electronic commerce ) is the buying and selling of goods and services of goods and services, or the transmitting of funds or data, over an electronic network , primarily the internet. These business transaction occur either as business-to-business(B2B) ,business-to-consumer (B2C), consumer-to-consumer or consumer-to-business. Features included are uploading a product, buying a product, sorting products based on price or name, showing the best selling products, rating a product, wishlist and recommendation of products.



## Backend
- [server.js]() - Here all the backend process happens which helps in implementing all included features. 

## Frontend
- [BestSeller.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/BestSeller.js) - Displays the top 10 best selling products based on the number of quantity sold for each product and if there is a clash between two products then we are order them based on their ratings. 
- [CreatePost.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/CreatePost.js) - To list a new product in our website. This page is only available to the seller. The product's name, price, category, sub-category and quantity are required to create a new post. 
- [HomeScreen.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/HomeScreen.js) - Displays the various categories in our site. Also we can navigate to the profile page. 
- [Login.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/LogIn.js) - Username and password are required to login into the site. Once the correct username and password are entered, the user is directed to the corresponding homescreen page. 
- [OrderPage.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/OrderPage.js) - Displays the order placed for the selected product.
- [ProductList.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/ProductList.js) - Displays the products uploaded by the seller. This page is available only for the seller. 
- [ProductScreen.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/ProductScreen.js) - This is the profile screen for the user. It displays the user details.
- [ProductSold.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/ProductsSold.js) - Displays the amount of products a particular seller has sold. It displays the product details along with the quantity sold for each product. This page is only available for the seller. 
- [Recommendation.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/Recommendation.js) - This is an analytical part where it suggests the best accessories or best related products for the product bought by the user. 
- [ShowAZ.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/ShowAZ.js) - Alphabetically sorts the products in each category.
- [SignUp.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/SignUp.js) - To create an account. The user should enter username, password, phone number, home address, alternate address, date of birth and gender. Once the details are entered the user is directed to the login page.
- [SortRating.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/SortRating.js) - Sorts the products by their rating in each category. The user can sort the products from low to high rating and vice-versa. 
- [SortedList.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/SortedList.js) - Sorts the products from high price to low price in each category.
- [SortedListlh.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/SortedListlh.js) - Sortst the products from low price to high price in each category. 
- [StarRating.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/StarRating.js) - The user gives an rating to a product after purchasing and using the product. The rating range is from 0 star (lowest rating) to 5 star (highest rating). 
- [WishList.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/WishList.js) - This page helps the user to add and collect all the items the user wants to purchase in the near future. 
- [YourOrders.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/YourOrders.js) - The user's purchased products are displayed with the product's name, price, quantity and rating. 
- [YourProduct.js](https://github.com/vinothsubbiah/e-commerce-website-reactJs/blob/main/frontend/src/screens/YourProduct.js) - Displays the products uploaded by the user. This page is only available for the seller.
- All css files are used for styling the respective pages.

## Tools Required
- VS Code 
- ReactJs
- NodeJs
- Mysql
