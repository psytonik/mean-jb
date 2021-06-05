const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    passwordHash:{type:String,required:true},
    street:{type:String,required:true, default: ''},
    apartment:{type:String,required:true, default: ''},
    city:{type:String,required:true, default: ''},
    zip:{type:String,required:true, default: ''},
    country:{type:String,required:true, default: ''},
    phone:{type:String,required:true, default: ''},
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
