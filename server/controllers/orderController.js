const {Order} = require("../models/OrdersSchema");

const getOrders = async (req,res)=>{
    try {
        const orders = await Order.find();
        if(orders){
            res.status(200).json(orders);
        }
    }catch (err){
        console.error(err)
    }
}
module.exports = {getOrders}
