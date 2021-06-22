const {Schema, model} = require('mongoose');

const ProductsSchema = new Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    richDescription: {type:String, default:''},
    image: { type:String, default:'' },
    images:[{ type:String }],
    brand: { type:String, default:'' },
    price: { type:Number, default:0 },
    category: {type:Schema.Types.ObjectId, ref:'Category', required:true},
    countInStock: {type:Number, required:true, min: 0, max: 500},
    rating: {type:Number, default:0},
    numReviews:{type:Number, default:0},
    isFeatured: {type:Boolean, default: false},
    dateCreated: {type: Date, default: Date.now()},
    // reviews:Array
})

ProductsSchema.virtual('id').get(function (){
    return this._id.toHexString();
})
ProductsSchema.set('toJSON',{
    virtuals: true
})
exports.Product = model('Product',ProductsSchema);
