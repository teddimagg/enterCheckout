class EnterCheckout{
	/**
	* Initates a new Enter instance from artist Id.
	* @param {string} the Id of the artist for Enter.is
	* @example enter = new EnterCheckout('5BzdSo4vrXQoYJnMw');
	*/
	constructor(artistId) {
		this.artist = artistId;
		this.cart = JSON.parse(localStorage.getItem('enterCart')) || [];
	}

	/**
	* Gathers product data from Enter.is
	*/
	init() {
		return new Promise((resolve, reject) => {
			fetch('http://localhost:3000/api/artist/' + this.artist, {
				method: 'GET',
				mode: 'cors'
			}).then((response) => {
				response.json().then((data) => {
					this.products = data;
					resolve('Successful');
				});
			}).catch((reason) => {
				reject(reason);
			});
		});
	}

	/**
	* This function returns a product from it's Id.
	* @param {string} the Id of the product
	* @returns {number} a product found from the input id
	*/
	productFromId(id){
		return this.products.find((product) => {
			return product._id === id;
		});
	}

	/**
	* This function sorts the products item.
	* @param {string} field name to sort by.
	* @param {string} [input="asc"] which order to sort by
	*/
	sortProducts(field, order){
		this.products.sort((a, b) => {
			return (order === 'desc') ? a[field] < b[field] : a[field] > b[field];
		});
	}

	/**
	* This function moves the user to a secure checkout link on Enter.is
	*/
	checkout() {
		let props = ['id', 'size', 'color', 'quantity'];
		let propCount = { id: false, size: false, color: false, quantity: false };

		if(!this.cart.length) throw 'Cart can not be empty for checkout.';

		// Sanitizing cart
		this.cart.forEach((elem) => {
			for(var prop in elem){
				if(!props.includes(prop)) delete elem[prop];
				else propCount[prop] = true;
			}
		});

		// Checking minimum property requirement
		for(var prop in propCount){
			if(!propCount[prop]) throw 'One or more properties missing from cart products. ' + prop + ' is missing.';
		}

		let url = 'http://localhost:3000/api/checkout/' + JSON.stringify(this.cart);
		window.open(url,"_blank");
		this.clearCart();
	}

	/**
	* This function calculates the total price of the cart.
	* @returns {number} the total price of the cart.
	*/
	cartTotal() {
		return (this.cart.length) ? this.cart.map((product) => {
			return Number(product.price) * Number(product.quantity);
		}).reduce((x, y) => x + y) : 0;
	}

	/**
	* This function adds a product to cart
	* @param {Object} the product which is to be added to cart.
	*/
	addToCart(product) {
		let contains = false;
		this.cart.length && this.cart.forEach((p, index) => {
			if(p.id === product.id && p.color === product.color && p.size === product.size){
				p.quantity = Number(p.quantity) + Number(product.quantity);
				contains = true;
			}
		});
		!contains && this.cart.push(product);
		this._storeCart();
	}

	/**
	* Manually updates cart object and the cart in local storage
	* @param {[Object]} the new cart (array) of products to replace the current cart.
	*/
	updateCart(cart) {
		this.cart = cart;
		this._storeCart();
	}

	/**
	* Completely clears the cart and updates local storage
	*/
	clearCart() {
		this.cart = [];
		this._storeCart();
	}

	// _ framework helpers
	/**
	* Stores the cart in local storage for later use
	*/
	_storeCart() {
		localStorage.setItem('enterCart', JSON.stringify(this.cart));
	}
};