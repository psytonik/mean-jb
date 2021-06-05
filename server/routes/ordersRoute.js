const {getOrders} = require("../controllers/orderController");

const express = require('express');

const router = express.Router();

router.route('/')
    .get(getOrders)
    .post();


module.exports = router;
