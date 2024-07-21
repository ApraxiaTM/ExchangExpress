// controllers/currencyController.js
const Currency = require('../models/currencyModel');

exports.getCurrency = (req, res) => {
    const { currency } = req.body;

    Currency.getByCurrency(currency, (err, result) => {
        if (err) res.status(500).send(err);
        else res.json(result);
    });
};

exports.createCurrency = (req, res) => {
    const { currency, country, id_amount } = req.body;
    const newCurrency = { currency, country, id_amount };
    Currency.create(newCurrency, (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(201).json(result);
    });
};

exports.updateCurrency = (req, res) => {
    const { id, currency, country, id_amount } = req.body;
    const updatedCurrency = { currency, country, id_amount };
    Currency.update(id, updatedCurrency, (err, result) => {
        if (err) res.status(500).send(err);
        else res.json(result);
    });
};

exports.deleteCurrency = (req, res) => {
    Currency.delete(req.params.id, (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(204).json(result);
    });
};
