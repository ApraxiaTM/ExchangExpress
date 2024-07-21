// routes/transactionsRoutes.js
const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionController');

router.get('/', transactionsController.getAllTransactions);
// router.get('/:id', transactionsController.getTransactionById);
router.post('/', transactionsController.createTransaction);
// router.put('/', transactionsController.updateTransaction);
router.delete('/:id', transactionsController.deleteTransaction);

module.exports = router;
