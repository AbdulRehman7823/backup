const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    poetries: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);
const order = mongoose.model('Order',orderSchema);
module.exports =  order;