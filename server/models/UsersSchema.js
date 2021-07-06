const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    passwordHash:{type:String,required:true},
    street:{type:String, default: ''},
    apartment:{type:String, default: ''},
    city:{type:String, default: ''},
    zip:{type:String, default: ''},
    country:{type:String, default: ''},
    phone:{type:String, default: ''},
    isAdmin: {type:Boolean,default: false},
})

UsersSchema.virtual('id').get(function (){
    return this._id.toHexString();
})
UsersSchema.set('toJSON',{
    virtuals: true
})

exports.User = mongoose.model('User',UsersSchema);
exports.UsersSchema = UsersSchema;
