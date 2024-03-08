const ProductController = require('../controller/productController');
const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', verifyToken, ProductController.create);
router.get('/find-by-id/:id', verifyToken, ProductController.findById);
router.get('/find-all', verifyToken, ProductController.findAll);
router.get('/find-all-min', verifyToken, ProductController.findAllMin);
router.get('/find-all-count', verifyToken, ProductController.findAllCount);
router.delete('/delete-by-id/:id', verifyToken, ProductController.deleteById);
router.put('/update/:id', verifyToken, ProductController.update);

module.exports = router;
