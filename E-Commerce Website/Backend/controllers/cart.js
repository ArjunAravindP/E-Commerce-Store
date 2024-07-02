const { json } = require('express');
const User = require('../models/user');

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      'cart.productId'
    );

    res.status(200).json(user.cart);
  } catch (err) {
    res.status(400).json({ message: 'failed to fetch cart' });
  }
};
exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  const user = await User.findById(userId);

  const cartItem = user.cart.find((item) => item.productId.equals(productId));

  if (cartItem) {
    cartItem.quantity = cartItem.quantity + 1;
  } else {
    user.cart.push({ productId, quantity: 1 });
  }

  await user.save();
  res.json(user.cart);
};
exports.updateCart = async (req, res) => {
  const { userId, cart } = req.body;
  const user = await User.findById(userId).populate('cart.productId');

  if (user) {
    console.log('aghsvhdj');
    // const userCart = user.cart.populate('productId');
    console.log(user);
  } else {
    res.status(404).json({ message: 'failed to fetch cart' });
  }

  await user.save();
  res.json(user.cart);
};

exports.removeCartProduct = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const cartItem = user.cart.find((item) => item.productId.equals(productId));

  if (cartItem) {
    if (quantity > 0) {
      cartItem.quantity -= quantity;
      // Remove the item if quantity drops to zero or below
      if (cartItem.quantity <= 0) {
        const productIndex = user.cart.findIndex((item) =>
          item.productId.equals(productId)
        );
        user.cart.splice(productIndex, 1);
      }
    } else {
      const productIndex = user.cart.findIndex((item) =>
        item.productId.equals(productId)
      );

      if (productIndex === -1) {
        console.log('Product not found in cart');
        return res.status(404).json({ message: 'Product not found in cart' });
      }
      user.cart.splice(productIndex, 1);
    }
  } else {
    return res.status(404).json({ message: 'Product not found in cart' });
  }

  await user.save();
  res.json(user.cart);
};
