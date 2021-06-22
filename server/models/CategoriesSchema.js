const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
    name: {type:String, required:true},
    color:{type:String, default: "#54f"},
    icon: {type:String, default: "icon"},
    // image: {type:String, required:true}
})

CategoriesSchema.virtual('id').get(function (){
    return this._id.toHexString();
})
CategoriesSchema.set('toJSON',{
    virtuals: true
})

exports.Category = mongoose.model('Category',CategoriesSchema);

