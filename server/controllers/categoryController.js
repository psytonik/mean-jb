const {Category} = require("../models/CategoriesSchema");

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories) {
            return res.status(200).json(categories);
        }
    } catch (err) {
        console.error(err.message, 'ERROR');
        return res.status(400).send('Get all categories failed');
    }
};

const createCategory = async (req,res) => {
    try{

        const {name,icon,color} = req.body;
        let newCategory = await new Category({name, icon, color});
        await newCategory.save();
        if(!newCategory){
            return res.status(404).json({message:'The category cannot be created',success:false});
        }
        res.status(201).json(newCategory);
    } catch (err) {
        console.error(err.message, 'ERROR');
        return res.status(400).json({message: 'Create category failed', error: err.message});
    }
};

const deleteCategory = async (req,res) => {
    try{
        const cat = await Category.findByIdAndRemove(req.params.id).exec();

        await cat.remove();
            return res.status(201).json({message:'Category successfully removed',success:true});
    } catch (err) {
        console.error(err.message, 'ERROR');
        return res.status(400).json({message: 'Delete category failed', error: err.message});
    }
};

const getCategory = async (req,res) => {
    try{
        const category = await Category.findById(req.params.id).exec();
        if(!category){
            return res.status(404).json({message: 'Category not found'});
        }
        return res.status(200).json(category);
    } catch (err) {
        console.error(err.message, 'ERROR');
        return res.status(400).json({message: 'Get category failed', error: err.message});
    }
};

const updateCategory = async (req,res) => {
    try{
        const {name,icon,color} = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {name, icon, color},
            {new:true}
        );
        if(!updatedCategory){
            return res.status(500).json({message: 'Category not updated'});
        }
        return res.status(200).json(updatedCategory);
    } catch (err) {
        console.error(err.message, 'ERROR');
        return res.status(400).json({message: 'Update category failed', error: err.message});
    }
};

module.exports = {getCategories,createCategory,deleteCategory,getCategory,updateCategory};
