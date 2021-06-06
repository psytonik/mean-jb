const {getOrders,createOrder} = require("../controllers/orderController");

const express = require('express');

const router = express.Router();

router.route('/')
    .get(getOrders)
    .post(createOrder);


module.exports = router;
