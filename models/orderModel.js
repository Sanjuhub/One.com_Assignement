const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
  orderDate: { type: Date, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lunchOrdered: { type: Boolean, required: true, default: false },
  dinnerOrdered: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('order', orderModel);
