const CustomerController = require('../controller/customerController');
const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', verifyToken, CustomerController.create);
router.get('/find-by-id/:id', verifyToken, CustomerController.findById);
router.get('/find-all', verifyToken, CustomerController.findAll);
router.get('/find-all-count', verifyToken, CustomerController.findAllCount);
router.delete('/delete-by-id/:id', verifyToken, CustomerController.deleteById);
router.put('/update/:id', verifyToken, CustomerController.update);

module.exports = router;
