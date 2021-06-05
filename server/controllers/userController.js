const bcrypt = require('bcryptjs');
const {User} = require('../models/UsersSchema');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const createNewUser = async (req,res) => {
    const {name,email,password,street,apartment,city,zip,country,phone,isAdmin} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:'The user already exists',success:false});
        }
        let passwordHash = bcrypt.hashSync(password, 10);
        let newUser = await new User({name,email,passwordHash,street,apartment,city,zip,country,phone,isAdmin});
        newUser = await newUser.save();
        if(!newUser){
            return res.status(404).json({message:'The user can\'t be created',success:false});
        }
        res.status(201).json(newUser);
    }catch (err) {
        console.error(err.message, 'ERROR => createNewUser');
        return res.status(400).json({message: 'Can\'t create user', error: err.message});
    }
};

const getUsers = async (req,res) => {
    try {
        const users = await User.find().select('-passwordHash');

        if(!users){
            return res.status(500).json({success:false});
        }

        res.status(200).json(users);
    }catch (err) {
        console.error(err.message, 'ERROR => getUsers');
        return res.status(400).json({message: 'Can\'t get users', error: err.message});
    }
};

const getUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');

        if(!user){
            return res.status(500).json({success:false});
        }
        res.status(200).json(user);
    }catch (err) {
        console.error(err.message, 'ERROR => getUserById');
        return res.status(400).json({message: 'Can\'t get user by id', error: err.message});
    }
};

const updateUser = async (req,res) => {
    try {
        const existingUser = await User.findById(req.params.id);
        let newPassword;
        if(req.body.password) {
            newPassword = bcrypt.hashSync(req.body.password,10);
        } else {
            newPassword = existingUser.passwordHash;
        }
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {   name:req.body.name,
                email:req.body.email,
                password:newPassword,
                street:req.body.street,
                apartment:req.body.apartment,
                city:req.body.city,
                zip:req.body.zip ,
                country:req.body.country,
                phone:req.body.phone,
                isAdmin:req.body.isAdmin},
            {new:true}
        );
        if(!user){
            return res.status(404).json({message: 'User not updated'});
        }
        return res.status(200).json(user);
    }catch (err) {
        console.error(err.message, 'ERROR => updateUser');
        return res.status(400).json({message: 'Can\'t update user', error: err.message});
    }
};

const loginUser = async (req,res) => {
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
            const token = jwt.sign(
                {
                    userId:user.id,
                    isAdmin:user.isAdmin
                },
                process.env.SECRET_TOKEN,
                {expiresIn:'24h'}
                )

            return res.status(200).json({user:user.email,token});
        } else {
            return res.status(400).json({message: 'Password wrong'});
        }

    } catch (err) {
        console.error(err.message, 'ERROR => loginUser');
        return res.status(400).json({message: 'Can\'t login', error: err.message});
    }
};

const getCountOfUsers = async (req,res) => {
    try{
        const userCount = await User.countDocuments((count)=> count);
        if(!userCount){
            return res.status(400).json({message: 'Can\'t count users'});
        }
        return res.status(200).json({userCount});
    } catch (err) {
        console.error(err.message, 'ERROR => getCountOfUsers');
        return res.status(400).json({message: 'Can\'t get count of users', error: err.message});
    }
};

const deleteUser = async (req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).json({message: 'Invalid Product Id'});
        }
        const user = await User.findByIdAndRemove(req.params.id).exec();
        await user.remove();
        return res.status(201).json({message:'User successfully removed',success:true});

    } catch (err) {
        console.error(err.message, 'ERROR');
        return res.status(400).json({message: 'User can\'t be Removed', error: err.message});
    }
};

module.exports = {getUsers,createNewUser,getUserById,updateUser,loginUser,getCountOfUsers,deleteUser};
