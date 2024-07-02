const { json } = require('express');
const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

exports.getProducts = (req, res, next) => {
  res.send('Admin Products');
};

exports.postAddProduct = async (req, res, next) => {
  console.log(req.body);
  const {
    title,
    description,
    originalPrice,
    sellingPrice,
    brand,
    dispatch,
    stock,
    category,
  } = req.body;

  const image = req.file ? req.file.path : 'default_image.jpg';

  const product = new Product({
    title,
    description,
    originalPrice,
    sellingPrice,
    image,
    brand,
    dispatch,
    stock,
    category,
  });

  try {
    await product.save();
    res.status(200).send({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).send({ message: 'Error adding product' });
  }
};
exports.postUpdateProduct = async (req, res, next) => {
  const {
    title,
    description,
    originalPrice,
    sellingPrice,
    brand,
    dispatch,
    stock,
    category,
  } = req.body;
  const { id } = req.params;

  const image = req.file ? req.file.path : null;

  try {
    // Find the product by ID and update its properties
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    // Update the product's fields
    if (title) product.title = title;
    if (description) product.description = description;
    if (originalPrice) product.originalPrice = originalPrice;
    if (sellingPrice) product.sellingPrice = sellingPrice;
    if (brand) product.brand = brand;
    if (dispatch) product.dispatch = dispatch;
    if (stock) product.stock = dispatch;
    if (category) product.category = category;
    if (image) product.image = image;

    // Save the updated product
    await product.save();

    res.status(200).send({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send({ message: 'Error updating product' });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }
    const updatedProductList = await Product.find();

    res.status(200).json({
      message: 'Product deleted successfully',
      product: deletedProduct,
      updatedProductList: updatedProductList,
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send({ message: 'Error deleting product' });
  }
};
exports.setStatus = async (req, res, next) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const order = await Order.findById(id);
    order.status = status;
    await order.save();
    res.status(200).json({
      message: 'Product updated successfully',
      status: order.status,
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send({ message: 'Error deleting product' });
  }
};
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json({ message: 'users not found' });
  }
};
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Find the product by ID and delete it
    const delteUser = await User.findByIdAndDelete(id);

    if (!delteUser) {
      return res.status(404).send({ message: 'Product not found' });
    }
    const updatedUserList = await User.find();

    res.status(200).json({
      message: 'Product deleted successfully',
      product: delteUser,
      updatedUserList: updatedUserList,
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send({ message: 'Error deleting product' });
  }
};
