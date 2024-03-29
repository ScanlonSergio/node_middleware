const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("shop/product-list", {
			products: products,
			pageTitle: "All Products",
			path: "/products",
			hasProducts: products.length > 0,
			activeShop: true,
			productCSS: true,
		});
	});
};

exports.getProduct = (req, res, next) => {
	const productId = req.params.productId;
	Product.getProductById(productId, product => {
		res.render("shop/product-detail", {
			product: product,
			pageTitle: product.title,
			path: '/products'
		});
	});
}

exports.getIndex = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("shop/index", {
			products: products,
			pageTitle: "Shop",
			path: "/",
			hasProducts: products.length > 0,
			activeShop: true,
			productCSS: true,
		});
	});
}

exports.getCart = (req, res, next) => {
	Cart.getCart(cart => {
		Product.fetchAll(products => {
            const cartProducts = [];
			for (product of products) {
				const cartProductData = cart.products.find(p => p.id === product.id);
				if(cartProductData) {
					cartProducts.push({ productData: product, qty: cartProductData.qty });
				}
			}
			res.render("shop/cart", {
				path: "/cart",
				pageTitle: "Your Cart",
				products: cartProducts
			});
		})
	})
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
	Product.getProductById(productId, product => {
		Cart.addProduct(productId, product.price);
	})
	res.redirect("/cart");
}

exports.postDeleteCartProduct = (req, res, next) => {
	const productId = req.body.productId;
    Product.getProductById(productId, product => {
		Cart.deleteProduct(productId, product.price);
		res.redirect("/cart");
	})
}

exports.getOrders = (req, res, next) => {
	res.render("shop/orders", {
		path: "/orders",
		pageTitle: "Your Orders"
	});
}

exports.getCheckout = (req, res, next) => {
	res.send("shop/checkout", {
		path: "/checkout",
		pageTitle: "Checkout"
	});
}