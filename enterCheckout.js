class EnterCheckout{
	//ENTER INITIATION
	constructor(artistId) {
		this.artist = artistId;
		this.cart = JSON.parse(localStorage.getItem('enterCart')) || [];
	}

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

	//PRODUCT FUNCTIONALITY
	productFromId(id){
		return this.products.find((product) => {
			return product._id === id;
		});
	}

	sortProducts(field, order){
		this.products.sort((a, b) => {
			return (order === 'desc') ? a[field] < b[field] : a[field] > b[field];
		});
	}

	//CART FUNCTIONALITY
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

	cartTotal() {
		return (this.cart.length) ? this.cart.map((product) => {
			return Number(product.price) * Number(product.quantity);
		}).reduce((x, y) => x + y) : 0;
	}

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

	updateCart(cart) {
		this.cart = cart;
		this._storeCart();
	}

	clearCart() {
		this.cart = [];
		this._storeCart();
	}

	// _ framework helpers
	_storeCart() {
		localStorage.setItem('enterCart', JSON.stringify(this.cart));
	}
};