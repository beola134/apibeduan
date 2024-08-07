const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
//http://localhost:3000/product/allsp
router.get('/allsp', productController.getAllProducts);

//http://localhost:3000/product/gioitinhnam
router.get('/gioitinhnam', productController.getProductsByGioiTinhNam);

//http://localhost:3000/product/gioitinhnu
router.get('/gioitinhnu', productController.getProductsByGioiTinhNu);

// http://localhost:3000/product/gioitinhunisex
router.get('/gioitinhunisex', productController.getProductsByGioiTinhUnisex);

//http://localhost:3000/product/gioitinhnamnew
router.get('/gioitinhnamnew', productController.getProductsByGioiTinhNamNew);

//http://localhost:3000/product/gioitinhnunew
router.get('/gioitinhnunew', productController.getProductsByGioiTinhNuNew);

//http://localhost:3000/product/cate/:id
router.get('/cate/:id', productController.getProductsByCate);


//http://localhost:3000/product/detailsp
router.get('/detailsp/:id', productController.getProductById);
//http://localhost:3000/product/addsp
router.post('/addsp', productController.addProduct);

//http://localhost:3000/product/deletesp
router.delete('/deletesp/:id', productController.deleteProduct);

//http://localhost:3000/product/updatesp
router.put('/updatesp/:id', productController.updateProduct);
// hinh_anh
module.exports = router;