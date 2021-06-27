const {getOrders,createOrder,getOrderDetails,updateOrderStatus, deleteOrder, getSalesStatistic,
	getCountOfOrders,getUserOrders} = require("../controllers/orderController");

const express = require('express');

const router = express.Router();

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

router.route('/get/userorders/:userid')
	.get(getUserOrders);

module.exports = router;
