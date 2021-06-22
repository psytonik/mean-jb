const {
        getProducts,
        addNewProduct,
        getProductById,
        updateProduct,
        deleteProduct,
        getCountOfProducts,
        getFeaturedProducts,
        uploadMultipleImages
} = require("../controllers/productController");


const express = require('express');

const router = express.Router();

/// FILE UPLOAD

const multer = require('multer');

const FILE_TYPE_MAP = {
        'image/png': 'png',
        'image/jpeg': 'jpeg',
        'image/jpg': 'jpg',
        'image/gif':'gif'
}

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
                const isValid = FILE_TYPE_MAP[file.mimetype];

                let uploadError = new Error('invalid image type');

                if(isValid){
                        uploadError = null;
                }
                cb(uploadError, 'public/uploads')
        },
        filename: function (req, file, cb) {
                const fileName = file.originalname.split(' ').join('-');
                // const extension = FILE_TYPE_MAP[file.mimetype];
                // console.log('AFTER ',fileName)
                                        // .${extension}
                cb(null, `${Date.now()}-${fileName}`)
        }
});

const uploadOptions = multer({storage: storage});

/// ROUTES
router.route('')
    .get(getProducts)
    .post(uploadOptions.single('image'),addNewProduct);

router.route('/:id')
    .get(getProductById)
    .put(uploadOptions.single('image'),updateProduct)
    .delete(deleteProduct);

router.route('/gallery-images/:id')
  .put(uploadOptions.array('images',10),uploadMultipleImages);

router.route('/get/count')
    .get(getCountOfProducts);

router.route('/get/featured/:count')
    .get(getFeaturedProducts);

module.exports = router;
