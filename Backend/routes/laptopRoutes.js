// const {getAllLaptops} = require("../controllers/laptopController");
// const express = require("express");
// const router = express.Router();
// router.get("/laptops",getAllLaptops);
// module.exports = router;

const express = require("express");
const router = express.Router();

const { getAllLaptops, buyLaptop } = require("../controllers/laptopController");

// GET PRODUCTS
router.get("/all", getAllLaptops);

// BUY PRODUCT


module.exports = router;
