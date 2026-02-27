const express = require("express");
const router = express.Router();
const { getCart, addToCart } = require("../controllers/cartController");

// Routes
router.get("/:userId", getCart);
router.post("/", addToCart);

module.exports = router;
