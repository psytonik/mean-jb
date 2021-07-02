const {Order} = require("../models/OrdersSchema");
const {OrderItems} = require("../models/OrderItemsSchema");

const getOrders = async (req,res)=>{
    try {
        const orders = await Order.find()
            .populate('user','name email')
            .sort({'dateOrdered': -1});

        if(!orders){
            return res.status(400).json({message: 'Can\'t get orders'});
        }
        return res.status(200).json(orders);
    }catch (err){
        console.error(err)
    }
};

const getOrderDetails = async (req,res)=>{
    try {
        const orderDetails = await Order.findById(req.params.id)
          .populate("user", "name email")
          .populate({
              path: "orderitems", populate: { path: "product", populate: "category" },
          });

        if(!orderDetails){
            return res.status(400).json({message: 'Can\'t get order details'});
        }
        return res.status(200).json(orderDetails);
    }catch (err){
        return res.status(400).json({message: 'Can\'t get order', error: err.message});
    }
};

const createOrder = async (req,res) => {
    try{
        const orderItemsIds = Promise.all(req.body.orderitems.map( async (orderItem) => {
            let newOrderItem = new OrderItems({
                quantity:orderItem.quantity,
                product:orderItem.product
            });

            newOrderItem = await newOrderItem.save();
            return await newOrderItem.id;

        }));
        let orderItemsIdsResolved = await orderItemsIds;

        const totalPrices = await Promise.all(await orderItemsIdsResolved
          .map( async (orderItemsId)=>{
            const orderItem = await OrderItems.findById(orderItemsId)
              .populate('product','price');

            return  orderItem.product.price * orderItem.quantity
        }));

        const totalPrice = totalPrices.reduce((a,b)=>a+b,0);

        if(!orderItemsIdsResolved && totalPrice === 0){
            return res.status(400).json({message:'The order without items cannot be added',success:false})
        } else {
            let order = new Order({
                orderitems: orderItemsIdsResolved,
                shippingAddress1: req.body.shippingAddress1,
                shippingAddress2: req.body.shippingAddress2,
                city: req.body.city,
                zip: req.body.zip,
                country: req.body.country,
                phone: req.body.phone,
                totalPrice:totalPrice,
                user: req.body.user,
                status: req.body.status
            });
            await order.save();

            if(!order){
                return res.status(400).json({message:'The order cannot be added',success:false})
            }
            return res.status(201).json(order);
        }

    } catch (err) {
        console.error('ERROR', err.message);
    }
};

const updateOrderStatus = async (req,res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {status:req.body.status},
            {new:true}
        );

        if(!updatedOrder){
            return res.status(500).json({message: 'Order Status not updated'});
        }
        return res.status(200).json(updatedOrder);
    } catch (err) {
        console.error(err.message, 'updateOrderStatus ERROR');
        return res.status(400).json({message: 'Update Order Status failed', error: err.message});
    }
};

const deleteOrder = async (req,res) => {
    try {
        const { id } = req.params;
        let orderToBeDeleted = await Order.findByIdAndRemove(id);
        if (orderToBeDeleted) {

            let orderItemIds = orderToBeDeleted.orderItems;
            await Promise.all(
                orderItemIds.map(async (orderItemId) => {
                    await OrderItems.findByIdAndDelete({ _id: orderItemId });
                })
            );
            return res.status(200).json({success: true, message: `Order successfully deleted`});
        } else {
            return res.status(404).json({success: false, message: `Order not found`});
        }
    } catch (error) {
        return res.status(400).json({
            error: error,
            success: false,
            message: 'Internal Server Error',
        });
    }
};

const getSalesStatistic = async (req,res) => {
    try{
        let totalSales = await Order.aggregate([
            {$group:{ _id: null, totalSales:{$sum : '$totalPrice'}}}
        ]);
        if (!totalSales) {
            return res.status(404).json({ success: false, message: 'No sales' })
        }
        return res.status(200).json({ totalSales: totalSales.pop().totalSales });
    } catch (err) {
        return res.status(500).json({
            error: err.message,
            success: false,
            message: err.message,
        });
    }
};

const getCountOfOrders = async (req,res) => {
    try{
        const orderCount = await Order.countDocuments(count => count);
        if(!orderCount){
            return res.status(404).json({message: 'No Orders'});
        }
        return res.status(200).json({orderCount});
    } catch (err) {
        console.error(err.message, 'ERROR => getCountOfOrders');
        return res.status(500).json({
            message: err.message,
            success:false,
            error: err.message
        });
    }
};

const getUserOrders = async (req,res)=>{
    try {
        const userOrder = await Order.find({user:req.params.userId})
            .populate({path:'orderitems', populate:{path:'product', populate:'category'}})
            .sort({'dateOrdered': -1});

        if(!userOrder){
            res.status(400).json({message: 'Can\'t find user'});
        }
        return res.status(200).json(userOrder);
    }catch (err){
        return res.status(400).json({message: 'Can\'t get user orders', error: err.message});
    }
};

module.exports = {getOrders,createOrder,getOrderDetails,updateOrderStatus, deleteOrder, getSalesStatistic,
    getCountOfOrders,getUserOrders};
