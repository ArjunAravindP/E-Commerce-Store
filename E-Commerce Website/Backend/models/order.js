const mongoose = require('mongoose');
const user = require('./user');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
  billingName: {
    type: String,
    required: true,
  },
  billingAddress: {
    type: String,
    required: true,
  },
  billingPhone: {
    type: Number,
    required: true,
  },
  billingCountry: {
    type: String,
    required: true,
  },
  billingState: {
    type: String,
    required: true,
  },
  billingEmail: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  shippingName: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  shippingPhone: {
    type: Number,
    required: true,
  },
  shippingCountry: {
    type: String,
    required: true,
  },
  shippingState: {
    type: String,
    required: true,
  },
  shippingEmail: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Order', orderSchema);
