const Product = require('../models/product');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const User = require('../models/user');
const Order = require('../models/order');
const { request, json } = require('express');
const product = require('../models/product');
const user = require('../models/user');
const Contact = require('../models/contact');
const { check, validationResult } = require('express-validator');

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.send({
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) =>
      res.status(402).json({ message: 'Failed to load products' })
    );
};

exports.getNewArrivals = (req, res, next) => {
  Product.find()
    .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (latest first)
    .exec()
    .then((products) => {
      return products.slice(0, 4);
    })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getRelatedProd = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  const category = product.category;
  Product.find({ category: category })
    .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (latest first)
    .exec()
    .then((products) => {
      return products.slice(0, 4);
    })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    // Find product by ID in MongoDB
    const product = await Product.findById(productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.stripePay = async (req, res, next) => {
  try {
    const { products, taxAndShip } = req.body;

    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ message: 'No products provided for payment' });
    }

    // Calculate total amount including tax and shipping
    let totalAmount = 0;
    const lineItems = products.map((product) => {
      const imageUrl = `http://localhost:8080/${product.productId.image}`;

      const unitAmount = Math.round(product.productId.sellingPrice * 100);

      // Add tax and shipping calculations here
      const taxAmount = Math.round(unitAmount * 0.07);
      const shippingAmount = 10; // Example shipping amount in cents (adjust as per your requirements)

      totalAmount +=
        (unitAmount + taxAmount + shippingAmount) * product.quantity;

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.productId.title,
            images: [imageUrl],
          },
          unit_amount: unitAmount + taxAmount + shippingAmount,
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/payment-success', // Update with your actual success URL
      cancel_url: 'http://localhost:5173', // Update with your actual cancel URL
    });

    res.json({ sessionId: session.id, totalAmount: totalAmount });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).json({
      message: 'Failed to create Stripe checkout session',
      error: error.message,
    });
  }
};

exports.createOrder = async (req, res, next) => {
  const { shippingAddress, paymentMethod } = req.body;
  const userId = req.params.id;
  const cart = await User.findById(userId).then((user) => {
    return user.cart;
  });

  // Extracting the correct values from the shippingAddress object
  const billingCountry =
    shippingAddress.billingCountry?.label || 'Unknown Country';
  const billingState = shippingAddress.billingState?.label || 'Unknown State';
  const shippingCountry =
    shippingAddress.shippingCountry?.label ||
    shippingAddress.billingCountry?.label ||
    'Unknown Country';
  const shippingState =
    shippingAddress.shippingState?.label ||
    shippingAddress.billingState?.label ||
    'Unknown State';

  try {
    const order = new Order({
      user: userId,
      cart: cart,
      billingName:
        shippingAddress.billingFirstName +
        ' ' +
        shippingAddress.billingLastName,
      billingAddress: shippingAddress.billingStreetAddress,
      billingPhone: shippingAddress.billingPhone,
      billingCountry: billingCountry,
      billingState: billingState,
      billingEmail: shippingAddress.billingEmailAddress,
      shippingName:
        shippingAddress.shippingFirstName +
        ' ' +
        shippingAddress.shippingLastName,
      shippingAddress:
        shippingAddress.shippingStreetAddress ||
        shippingAddress.billingStreetAddress,
      shippingPhone:
        shippingAddress.shippingPhone || shippingAddress.billingPhone,
      shippingCountry: shippingCountry || billingCountry,
      shippingState: shippingState || billingState,
      shippingEmail:
        shippingAddress.shippingEmailAddress ||
        shippingAddress.billingEmailAddress,
      note: shippingAddress.note,
      paymentMethod: paymentMethod,
      status: 'placed',
    });
    await order.save();

    for (const item of cart) {
      const product = await Product.findById(item.productId);
      if (!product) {
        console.log(`Product not found with ID: ${item.productId}`);
        continue;
      }
      product.stock -= item.quantity;
      await product.save();
    }
    const currentUser = await User.findById(userId);
    currentUser.cart = [];
    await currentUser.save();

    res.status(200).send({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).send({ message: 'Error creating order' });
  }
};
exports.getOrder = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const orders = await Order.find({ user: userId })
      .populate('cart.productId')
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (latest first)
      .exec()
      .then((orders) => {
        return orders;
      })
      .then((orders) => {
        res.json(orders);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).send({ message: 'Error creating order' });
  }
};
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('cart.productId')
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (latest first)
      .exec()
      .then((orders) => {
        return orders;
      })
      .then((orders) => {
        res.json(orders);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).send({ message: 'Error creating order' });
  }
};
exports.getSingleOrder = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const order = await Order.find({ _id: orderId }).populate('cart.productId');

    res.status(200).json(order);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).send({ message: 'Error creating order' });
  }
};
exports.getBrand = (req, res, next) => {
  const brand = req.params.brand;
  Product.find({ brand: brand })
    .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (latest first)
    .exec()
    .then((products) => {
      return products.slice(0, 4);
    })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).send({ message: 'Products not found' });
    });
};
exports.getCategoryList = (req, res, next) => {
  const brand = req.params.category;
  let category;
  switch (brand) {
    case 'living-room':
      category = 'Living Room';
      break;
    case 'bed-room':
      category = 'Bedroom';
      break;
    case 'dining':
      category = 'Dining Room';
      break;
    case 'office':
      category = 'Office';
      break;
    case 'outdoor':
      category = 'Outdoor';
      break;
    case 'kids':
      category = 'Kids';
      break;
    // Add more cases as needed
    default:
      category = 'Living Room';
  }
  Product.find({ category: category })
    .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (latest first)
    .exec()
    .then((products) => {
      return products.slice(0, 4);
    })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).send({ message: 'Products not found' });
    });
};

exports.getFullCollection = (req, res, next) => {
  const brand = req.params.title;

  let category;
  switch (brand) {
    case 'living-room':
      category = 'Living Room';
      break;
    case 'bed-room':
      category = 'Bedroom';
      break;
    case 'dining':
      category = 'Dining Room';
      break;
    case 'office':
      category = 'Office';
      break;
    case 'outdoor':
      category = 'Outdoor';
      break;
    case 'kids':
      category = 'Kids';
      break;
    // Add more cases as needed
    default:
      category = 'Living Room';
  }
  Product.find({ category: category })
    .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (latest first)
    .exec()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).send({ message: 'Products not found' });
    });
};
exports.getUser = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => res.json(user))
    .catch((err) => {
      res.status(500).send({ message: 'User not found' });
    });
};
exports.contactForm = async (req, res, next) => {
  const data = req.body;
  const { name, email, phone, message } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();
    res.status(200).json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
};
