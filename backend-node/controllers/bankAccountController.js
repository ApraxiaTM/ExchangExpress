// controllers/bankAccountController.js
const BankAccount = require('../models/bankAccountModel');

exports.getPersonal = (req, res) => {
    const { username } = req.query;
    // const { username } = req.body;

    BankAccount.getPersonal(username, (err, data) => {
        if (err) res.status(500).send(err);
        else res.json(data);
    });
};

exports.getInitial = (req, res) => {
    const { transfer_code } = req.query;
    // const { transfer_code } = req.body;

    BankAccount.getInitial(transfer_code, (err, data) => {
        if (err) res.status(500).send(err);
        else res.json(data);
    });
};

exports.getReceivers = (req, res) => {
    const { username } = req.query;
    // const { username } = req.body;

    BankAccount.getReceivers(username, (err, data) => {
        if (err) res.status(500).send(err);
        else res.json(data);
    });
};

exports.getReceiversLocal = (req, res) => {
    const { username } = req.query;
    // const { username } = req.body;

    BankAccount.getReceiversLocal(username, (err, data) => {
        if (err) res.status(500).send(err);
        else res.json(data);
    });
};

exports.getReceiversForeign = (req, res) => {
    const { username } = req.query;
    // const { username } = req.body;

    BankAccount.getReceiversForeign(username, (err, data) => {
        if (err) res.status(500).send(err);
        else res.json(data);
    });
};

exports.createBankAccount = (req, res) => {
    const { bankname, currency, holder, country, transfer_code } = req.body;
    const newBankAccount = { bankname, currency, holder, country, transfer_code };
    BankAccount.create(newBankAccount, (err, data) => {
        if (err) res.status(500).send(err);
        console.log(data.insertId);
        res.status(201).json(data);
    });
};

exports.updateSender = (req, res) => {
    const { username, bankname, currency, holder, country, transfer_code } = req.body;
    const updatedBankAccount = { 
        bankname: bankname, 
        currency: currency, 
        holder: holder, 
        country: country, 
        transfer_code: transfer_code, 
    };
    BankAccount.updateSender(username, updatedBankAccount, (err, data) => {
        if (err) res.status(500).send(err);
        else res.json(data);
    });
};

exports.deleteReceiver = (req, res) => {
    const { id } = req.params;

    BankAccount.delete(id, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(204).json(data);
    });
};
