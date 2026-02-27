const express = require("express");
const crypto = require("crypto");
const Order = require("../models/Order");
const Mobile = require("../models/Mobile"); // ✅ Import Mobile Model

const router = express.Router();

router.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      userId,
      products
    } = req.body;

    // 🔐 1️⃣ Generate Signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // 🔎 2️⃣ Verify Signature
    if (generated_signature !== razorpay_signature) {
      return res.json({ success: false, message: "Invalid signature" });
    }

    // 🔥 3️⃣ CHECK STOCK BEFORE SAVING ORDER
    for (const item of products) {

      const product = await Mobile.findOne({ pid: item.pid });

      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }

      if (product.pqty < item.quantity) {
        return res.json({ success: false, message: "Out of stock" });
      }
    }

    // ✅ 4️⃣ SAVE ORDER
    await Order.create({
      userId,
      products,
      amount,
      paymentId: razorpay_payment_id,
      status: "Paid"
    });

    // ✅ 5️⃣ REDUCE STOCK
    for (const item of products) {
      await Mobile.updateOne(
        { pid: item.pid },
        { $inc: { pqty: -item.quantity } }
      );
    }

    return res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;