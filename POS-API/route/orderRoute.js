const OrderController = require('../controller/orderController');
const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// router.post('/create', verifyToken, OrderController.create);
router.post('/create', OrderController.create);
// router.get('/find-by-id/:id', verifyToken, OrderController.findById);
router.get('/find-by-id/:id', OrderController.findById);
// router.get('/find-all', verifyToken, OrderController.findAll);
router.get('/find-all', OrderController.findAll);
router.get('/find-all-count', OrderController.findAllCount);
router.get('/find-all-income', OrderController.findAllIncome);
router.delete('/delete-by-id', verifyToken, OrderController.deleteById);
router.put('/update', verifyToken, OrderController.update);

module.exports = router;
