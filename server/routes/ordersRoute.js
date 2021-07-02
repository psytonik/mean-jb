const express = require('express');
const router = express.Router();

const { getOrders, createOrder, getOrderDetails, updateOrderStatus, deleteOrder, getSalesStatistic,
	getCountOfOrders, getUserOrders } = require("../controllers/orderController");


router.route('/')
    .get(getOrders)
    .post(createOrder);

router.route('/:id')
	.get(getOrderDetails)
	.put(updateOrderStatus)
	.delete(deleteOrder);

router.route('/get/totalsales')
	.get(getSalesStatistic);

router.route('/get/counts')
	.get(getCountOfOrders);

router.route('/get/userorders/:userId')
	.get(getUserOrders);

module.exports = router;
