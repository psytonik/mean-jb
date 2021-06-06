const {Order} = require("../models/OrdersSchema");
const {OrderItems} = require("../models/OrderItemsSchema");

const getOrders = async (req,res)=>{
    try {
        const orders = await Order.find();
        if(orders){
            res.status(200).json(orders);
        }
    }catch (err){
        console.error(err)
    }
};

const createOrder = async (req,res) => {
    try{
        const orderItemsIds = Promise.all(req.body.orderItems.map( async(orderItem) => {
            let newOrderItem = new OrderItems({
                quantity:orderItem.quantity,
                product:orderItem.product
            });
            newOrderItem = await newOrderItem.save();
            return newOrderItem._id;
        }));

        let order = new Order({
            orderItems: await orderItemsIds,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            totalPrice: req.body.totalPrice,
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
module.exports = {getOrders,createOrder}
