const express = require('express');

const router = express.Router();
const customer_address = require("../controllers/customer-controller");

router.route("/deliveryaddress").post(customer_address)

module.exports = router;

