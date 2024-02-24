const CustomerController = require('../controller/customerController');
const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// router.post('/create', verifyToken, CustomerController.create);
router.post('/create', CustomerController.create);
// router.get('/find-by-id', verifyToken, CustomerController.findById);
router.get('/find-by-id/:id', CustomerController.findById);
// router.get('/find-all', verifyToken, CustomerController.findAll);
router.get('/find-all', CustomerController.findAll);
// router.delete('/delete-by-id', verifyToken, CustomerController.deleteById);
router.delete('/delete-by-id/:id', CustomerController.deleteById);
// router.put('/update', verifyToken, CustomerController.update);
router.put('/update/:id', CustomerController.update);

module.exports = router;
