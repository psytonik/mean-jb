const mongoose = require('mongoose');

const OrderItemsSchema = new mongoose.Schema({
    quantity: {type:Number, default:0,required:true},
    product:{type:mongoose.Schema.Types.ObjectId, ref:'Product'}
})

OrderItemsSchema.virtual('id').get(function (){
    return this._id.toHexString();
})
OrderItemsSchema.set('toJSON',{
    virtuals: true
})

exports.OrderItem = mongoose.model('OrderItems',OrderItemsSchema);

