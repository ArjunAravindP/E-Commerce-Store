const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.js');

// Dummy controller functions
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/new-arrivals', shopController.getNewArrivals);
router.get('/related-products/:id', shopController.getRelatedProd);
router.get('/product/:id', shopController.getProduct);
router.get('/cart/:userId', cartController.getCart);
router.post('/cart/add', cartController.addToCart);
router.post('/cart/remove', cartController.removeCartProduct);
router.post('/stripePayment', shopController.stripePay);
router.post('/createOrder/:id', shopController.createOrder);
router.get('/fetch-order/:id', shopController.getOrder);
router.get('/fetch-orders', shopController.getOrders);
router.get('/fetch-single-order/:id', shopController.getSingleOrder);
router.get('/:brand', shopController.getBrand);
router.get('/category/:category', shopController.getCategoryList);
router.get('/collection/:title', shopController.getFullCollection);
router.put('/cart/updatecart', cartController.updateCart);
router.get('/fetchUser/:id', shopController.getUser);

module.exports = router;
