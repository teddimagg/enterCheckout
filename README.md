# Enter Checkout JS library

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## constructor

Initates a new Enter instance from artist Id.

**Parameters**

-   `artistId`  
-   `the` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Id of the artist for Enter.is

**Examples**

```javascript
const enter = new EnterCheckout('5BzdSo4vrXQoYJnMw');
```

## init

Gathers product data from Enter.is

**Examples**

```javascript
enter.init().then((res) => {
//do stuff with products
}).catch((reason) => {
console.log(reason);
});
```

## productFromId

This function returns a product from it's Id.

**Parameters**

-   `id`  
-   `the` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Id of the product

**Examples**

```javascript
let product = enter.productFromId( $(this).attr('product_id') );
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** a product found from the input id

## sortProducts

This function sorts the products item.

**Parameters**

-   `field` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** name to sort by.
-   `order`  
-   `input` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** which order to sort by (optional, default `"asc"`)

**Examples**

```javascript
enter.sortProducts('price', 'desc');
```

## checkout

This function moves the user to a secure checkout link on Enter.is

**Examples**

```javascript
$('.checkoutbtn').click((e) => {
enter.checkout();
//Close the custom cart UI for example
});
```

## cartTotal

This function calculates the total price of the cart.

**Examples**

```javascript
$('.carttotal').text(enter.cartTotal() + " kr.");
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the total price of the cart.

## addToCart

This function adds a product to cart, the fields { id, size, color and quantity } are the only required one, but storing more data (such as image and price) can be useful.

**Parameters**

-   `product`  
-   `the` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** product which is to be added to cart.

**Examples**

```javascript
enter.addToCart({
name:       product.name,
price:      product.price,
id:         product._id,
img: 		product.images[0],
size:       $('.sizesel').attr('data'),
color: 	    '-',
quantity:   $('.count option:selected').val()
});
```

## updateCart

Manually updates cart object and the cart in local storage

**Parameters**

-   `cart`  
-   `the` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** new cart (array) of products to replace the current cart.

**Examples**

```javascript
enter.updateCart([{
id: '123',
size: 'L',
color: '-',
quantity: '2'
}]);
```

## clearCart

Completely clears the cart and updates local storage

## \_storeCart

Stores the cart in local storage for later use
