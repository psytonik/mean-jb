const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
    name: {type:String, required:true},
    color: {type:String},
    icon: {type:String},
    slug: {type:String, required:true},
    // image: {type:String, required:true}
})

CategoriesSchema.virtual('id').get(function (){
    return this._id.toHexString();
})
CategoriesSchema.set('toJSON',{
    virtuals: true
})

exports.Category = mongoose.model('Category',CategoriesSchema);

