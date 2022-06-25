const {Router} = require('express');
const { getProduct, getProducts, updateProduct, deleteProduct, createProduct } = require('../controller/product');

const router = Router();

router.get('/all', getProducts );
router.get('/product/:productId',getProduct);
router.post('/create',createProduct);
router.put('/update/:productId',updateProduct);
router.delete('/delete/:productId',deleteProduct);

module.exports = router;