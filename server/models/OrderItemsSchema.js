const { Schema,model } = require('mongoose');

const OrderItemsSchema = new Schema({
    quantity: {type:Number, default:0,required:true},
    product:{type:Schema.Types.ObjectId, ref:'Product'}
});

OrderItemsSchema.virtual('id').get(function (){
    return this._id.toHexString();
});
OrderItemsSchema.set('toJSON',{
    virtuals: true
});

exports.OrderItems = model('OrderItems',OrderItemsSchema);

