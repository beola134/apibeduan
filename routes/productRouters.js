const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
//http://localhost:3000/product/allsp
router.get('/allsp', productController.getAllProducts);

//http://localhost:3000/product/addsp
router.post('/addsp', productController.addProduct);

//http://localhost:3000/product/deletesp
router.delete('/deletesp/:id', productController.deleteProduct);

//http://localhost:3000/product/updatesp
router.put('/updatesp/:id', productController.updateProduct);
// hinh_anh
module.exports = router;