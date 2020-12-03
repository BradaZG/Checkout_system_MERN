const mongoose = require('mongoose');

const itemsSchema = mongoose.Schema(
  {
    itemName: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    itemPicture: { type: String, required: true },
  },
  { timestamps: true }
);

const shoppingItem = mongoose.model('Item', itemsSchema);

module.exports = shoppingItem;
