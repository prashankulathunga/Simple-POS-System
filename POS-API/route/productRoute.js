const ProductController = require('../controller/productController');
const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// router.post('/create', verifyToken, ProductController.create);
router.post('/create', ProductController.create);
router.get('/find-by-id/:id', ProductController.findById);
// router.get('/find-by-id', verifyToken, ProductController.findById);
// router.get('/find-all', verifyToken, ProductController.findAll);
router.get('/find-all', ProductController.findAll);
// router.delete('/delete-by-id', verifyToken, ProductController.deleteById);
router.delete('/delete-by-id/:id', ProductController.deleteById);
// router.put('/update', verifyToken, ProductController.update);
router.put('/update/:id', ProductController.update);

module.exports = router;
