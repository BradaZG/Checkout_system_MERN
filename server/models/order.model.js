const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    address: { type: String, required: true },
    cardNumber: { type: Number, required: true },
    total: { type: Number },
    orderItems: [
      {
        _id: { type: String },
        itemName: { type: String },
        itemPrice: { type: Number },
        itemPicture: { type: String },
        createdAt: { type: String },
        count: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

const basketOrder = mongoose.model('Order', orderSchema);

module.exports = basketOrder;
