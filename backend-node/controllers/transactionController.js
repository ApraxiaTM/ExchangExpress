// controllers/transactionsController.js
const db = require('../config/db');
const Transactions = require('../models/transactionsModel');

exports.getAllTransactions = (req, res) => {
    const { username } = req.query;
    // const { username } = req.body;

    Transactions.getAll(username, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
};

exports.createTransaction = (req, res) => {
    const { username, receiver, currency, amount, admin_fee } = req.body;
    const newTransaction = { username, receiver, currency, amount, admin_fee };
    Transactions.create(newTransaction, (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(201).json(result);
    });
};

exports.deleteTransaction = (req, res) => {
    Transactions.delete(req.params.id, (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(204).json(result);
    });
};
