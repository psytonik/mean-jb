const {
    getProducts,
    addNewProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getCountOfProducts,
    getFeaturedProducts,

} = require("../controllers/productController");

const express = require('express');

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(addNewProduct);

router.route('/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

router.route('/get/count')
    .get(getCountOfProducts);

router.route('/get/featured/:count')
    .get(getFeaturedProducts);

module.exports = router;
