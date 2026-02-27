const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 1 },
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);
