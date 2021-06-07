const {Order} = require("../models/OrdersSchema");
const {OrderItems} = require("../models/OrderItemsSchema");

const getOrders = async (req,res)=>{
    try {
        const orders = await Order.find()
            .populate('user','name')
            .sort({'dateOrdered': -1});
        if(orders){
            res.status(200).json(orders);
        }
    }catch (err){
        console.error(err)
    }
};

const getOrderDetails = async (req,res)=>{
    try {
        const orderDetails = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate({path:'orderItems',
                populate:{path:'product',
                    populate:{path:'category'}}})

        if(orderDetails){
            res.status(200).json(orderDetails);
        }
    }catch (err){
        console.error(err)
    }
};

const createOrder = async (req,res) => {
    try{
        const orderItemsIds = Promise.all(req.body.orderItems.map( async (orderItem) => {
            let newOrderItem = new OrderItems({
                quantity:orderItem.quantity,
                product:orderItem.product
            });

            const newOrderI = await newOrderItem.save();
            return await newOrderI._id;

        }));
        let orderItemsIdsResolved = await orderItemsIds;

        const totalPrices = await Promise.all(await orderItemsIdsResolved.map( async (orderItemsId)=>{
            const orderItem = await OrderItems.findById(orderItemsId).populate('product','price');

            return  orderItem.product.price * orderItem.quantity
        }));

        const totalPrice = totalPrices.reduce((a,b)=>a+b,0);
        let order = new Order({
            orderItems: orderItemsIdsResolved,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            totalPrice:totalPrice,
            user: req.body.user,
            status: req.body.status
        })
        order = await order.save();

        if(!order){
            return res.status(400).json({message:'The order cannot be added',success:false})
        }
        return res.status(201).json(order);

    } catch (err) {
        console.error('ERROR', err.message);
    }
}

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
                    return await OrderItems.findByIdAndDelete({ _id: orderItemId });
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
        const totalSales = await Order.aggregate([
            {$group:{ _id: null, totalSales:{$sum : '$totalPrice'}}}
        ])
        if(!totalSales){
            return res.status(404).json({success:false,message:'No sales'})
        }
        return res.status(200).json({totalSales:totalSales.pop().totalSales});

    } catch (err) {
        return res.status(500).json({
            error: err.message,
            success: false,
            message: 'Internal Server Error',
        });
    }
}

const getCountOfOrders = async (req,res) => {
    try{
        const orderCount = await Order.countDocuments((count)=> count);
        if(!orderCount){
            return res.status(400).json({message: 'Can\'t count orders'});
        }
        return res.status(200).json({orderCount});
    } catch (err) {
        console.error(err.message, 'ERROR => getCountOfOrders');
        return res.status(400).json({message: 'Can\'t get count of orders', error: err.message});
    }
};

const getUserOrders = async (req,res)=>{
    try {
        const userOrder = await Order.find({user:req.params.userid})
            .populate({path:'orderItems',
                populate:{path:'product',
                    populate:{path:'category'}}})
            .sort({'dateOrdered': -1});

        if(userOrder){
            res.status(200).json(userOrder);
        }
    }catch (err){
        return res.status(400).json({message: 'Can\'t get user orders', error: err.message});
    }
};

module.exports = {getOrders,createOrder,getOrderDetails,updateOrderStatus, deleteOrder, getSalesStatistic,getCountOfOrders,getUserOrders}
