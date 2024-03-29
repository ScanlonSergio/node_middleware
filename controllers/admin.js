const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false,
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true,
	});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if(!editMode) {
		return res.redirect('/');
	}
	const productId = req.params.productId;
	Product.getProductById(productId, product => {
		if(!product) {
			return res.redirect("/");
		}
		res.render("admin/edit-product", {
			pageTitle: "Edit Product",
			path: "admin/edit-product",
			editing: editMode,
			product: product
		});
	});
}

exports.postEditProduct = (req, res, next) => {
	const productId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedImageUrl = req.body.imageUrl;
	const updatedPrice = req.body.price;
	const updatedDescription = req.body.description;
	updatedProduct = new Product(productId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);
	updatedProduct.save();
	res.redirect("/admin/products");
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
	const product = new Product(null, title, imageUrl, price, description);
	product.save();
	res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("admin/products", {
			products: products,
			pageTitle: "Admin Products",
			path: "/admin/products",
			hasProducts: products.length > 0,
			activeShop: true,
			productCSS: true,
		});
	});
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
	Product.deleteById(productId);
	res.redirect("/admin/products");
}
