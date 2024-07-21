// routes/currencyRoutes.js
const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');

// router.get('/', currencyController.getAllCurrencies);
router.get('/', currencyController.getCurrency);
router.post('/', currencyController.createCurrency);
router.put('/', currencyController.updateCurrency);
router.delete('/:id', currencyController.deleteCurrency);

module.exports = router;
