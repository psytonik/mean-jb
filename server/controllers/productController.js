const {Product} = require("../models/ProductsSchema");
const {Category} = require("../models/CategoriesSchema");
const slugify = require('slugify');
const mongoose = require('mongoose');

const getProducts = async (req,res) => {
    try {
        let filter = {};
        if(req.query.categories){
            filter = {category : req.query.categories.split(',')};
        }
        const productList = await Product.find(filter)
            .populate('category');
            // .select('name description price image slug -_id');
        if(productList){
            return res.status(200).json(productList);
        }
    }catch (err){
        console.error(err);
        return res.status(400).send('Get all products failed');
    }
};

const getProductById = async (req,res) => {
    try{
        const product = await Product.findById(req.params.id).populate('category').exec();
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        return res.status(200).json(product);
    }catch (err) {
        console.error(err.message, 'ERROR');
        return res.status(400).json({message: 'Get product failed', error: err.message});
    }
};

const addNewProduct = async (req,res) => {
    try {
        let slug = slugify(req.body.name,{replacement: '-',lower: true,});
        const category = await Category.findById(req.body.category);
        if(!category){
            return res.status(400).send('Invalid Category');
        }
        const {
            image,images,brand,
            price,description,richDescription,
            countInStock,rating,
            numReviews,isFeatured,name} = req.body;

        let newProduct = await Product({image,images,brand,
            price,description,richDescription,
            category,countInStock,rating,
            numReviews,isFeatured,slug,name});
        newProduct = await newProduct.save();

        if(!newProduct){
            return res.status(500).json({message:'The product cannot be added',success:false});
        }

        return res.status(201).json(newProduct);
    }catch (err) {
        console.error(err);
        return res.status(400).json({message:'Add new product failed',success:false,error:err.message});
    }
};

const updateProduct = async (req,res) => {

    const {image,images,brand,
        price,description,richDescription,
        countInStock,rating,
        numReviews,isFeatured,name} = req.body;

    try{
        let slug = slugify(req.body.name,{replacement: '-',lower: true,});

        const category = await Category.findById(req.body.category);
        if(!category){
            return res.status(400).send('Invalid Category');
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {image,images,brand,
                price,description,richDescription,
                countInStock,rating,
                numReviews,isFeatured,name,slug,category},
            {new:true}
        );
        if(!product){
            return res.status(404).json({message: 'Product not updated'});
        }
        return res.status(200).json(product);
    }catch (err) {
        console.error(err.message, 'ERROR');
        return res.status(400).json({message: 'Update product failed', error: err.message});
    }
};

const deleteProduct = async (req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).json({message: 'Invalid Product Id'});
        }
        const product = await Product.findByIdAndRemove(req.params.id).exec();
        await product.remove();
        return res.status(200).json({message:'Product successfully removed',success:true});

    } catch (err) {
        console.error(err.message, 'ERROR');
        return res.status(400).json({message: 'Product can\'t be Removed', error: err.message});
    }
};

const getCountOfProducts = async (req,res) => {
    try{
        const productCount = await Product.countDocuments((count)=> count);
        if(!productCount){
            return res.status(400).json({message: 'Can\'t count products'});
        }
        return res.status(200).json({productCount});
    } catch (err) {
        console.error(err.message, 'ERROR => getCountOfProducts');
        return res.status(400).json({message: 'Can\'t get count of product', error: err.message});
    }
};

const getFeaturedProducts = async (req,res) => {
        try{
            const count = +req.params.count ? +req.params.count : 0;

            const featuredProducts = await Product.find({isFeatured:true}).limit(count);

            if(!featuredProducts){
                return res.status(400).json({message: 'Can\'t find featured products'});
            }

            return res.status(200).json({featuredProducts});
        } catch (err) {
            console.error(err.message, 'ERROR => getFeaturedProducts');
            return res.status(400).json({message: 'Can\'t get count of product', error: err.message});
        }
};


module.exports = {
    addNewProduct,
    deleteProduct,
    updateProduct,
    getProducts,
    getProductById,
    getCountOfProducts,
    getFeaturedProducts
};
