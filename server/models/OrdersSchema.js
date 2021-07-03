const {Schema,model} = require('mongoose');

const OrdersSchema = new Schema({
    orderitems: [{ type: Schema.Types.ObjectId, ref: "OrderItems", required: true }],
    status: { type: String, required: true, default: "Pending" },
    shippingAddress1: { type: String, required: true },
    shippingAddress2: { type: String },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    totalPrice: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dateOrdered: { type: Date, default: Date.now() }
});

OrdersSchema.virtual('id').get(function (){
    return this._id.toHexString();
});
OrdersSchema.set('toJSON',{
    virtuals: true
});

exports.Order = model('Order',OrdersSchema);
