const {Product} = require("../models/ProductsSchema");
const {Category} = require("../models/CategoriesSchema");
const mongoose = require("mongoose");

const getProducts = async (req,res) => {
    try {
        let filter = {};
        if(req.query.categories){
            filter = {category : req.query.categories.split(',')};
        }
        const productList = await Product.find(filter)
            .populate('category');
            // .select('name description price image -_id');
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
            const file = req.file.filename;
            if(!file) {
                return res.status(400).send("Something went wrong!");
            }

            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

            const category = await Category.findById(req.body.category);
            if(!category) {
                return res.status(400).send('Invalid Category');
            }

        let newProduct = await Product({
            image:`${basePath}${file}`,
            brand:req.body.brand,
            price:req.body.price,
            description:req.body.description,
            richDescription:req.body.richDescription,
            category:req.body.category,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            numReviews:req.body.numReviews,
            isFeatured:req.body.name.isFeatured,
            name:req.body.name});
        newProduct = await newProduct.save();

        if(!newProduct) {
            return res.status(500).json({message: 'The product cannot be added', success: false});
        }

        return res.status(201).json(newProduct);
    }catch (err) {
        console.error(err);
        return res.status(400).json({message:'Add new product failed',success:false,error:err.message});
    }
};

const updateProduct = async (req,res) => {
    try{
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id');
        }

        const category = await Category.findById(req.body.category);

        if(!category) {
            return res.status(400).send('Invalid Category');
        }

        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(400).send('Invalid Product!');
        }

        const file = req.file;
        let imagePath;

        if(file){
            const fileName = file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
            imagePath = `${basePath}${fileName}`;
        } else {
            imagePath = product.image;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {   image:imagePath,
                brand: req.body.brand,
                price: req.body.price,
                description: req.body.description,
                richDescription: req.body.richDescription,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,
                name: req.body.name,
                category: req.body.category,
            },
            {new:true}
        );
        if(!updatedProduct) {
            return res.status(404).json({message: 'Product not updated'});
        }

        return res.status(200).json(updatedProduct);
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

const uploadMultipleImages = async (req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id');
        }

        const files = req.files;
        let imagesPaths = [];
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

        if (files) {
            files.map((file) => {
                imagesPaths.push(`${basePath}${file.filename}`);
            });
        }

        const product = await Product.findByIdAndUpdate(
          req.params.id,
          {
              images: imagesPaths
          },
          { new: true }
        );
        console.log(req.params.id);
        if (!product) {
            return res.status(500).send('the gallery cannot be updated!');
        }

        return res.status(201).json(product);
    } catch (err) {
        console.error(err.message, 'ERROR');
        return res.status(400).json({message: 'Update images failed', error: err.message});
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

            return res.status(200).json(featuredProducts);
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
    getFeaturedProducts,
    uploadMultipleImages
};
