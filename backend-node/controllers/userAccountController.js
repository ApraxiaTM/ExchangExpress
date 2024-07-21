// controllers/usersAccountController.js
const UsersAccount = require('../models/usersAccountModel');

exports.getUsersAccount = (req, res) => {
    const { username, holder } = req.query;
    // const { username, holder } = req.body;

    UsersAccount.getByUsername(username, holder, (err, result) => {
        if (err) res.status(500).send(err);
        else res.json(result);
    });
};

exports.createUsersAccount = (req, res) => {
    const { user_id, bank_id, status } = req.body;
    const newUsersAccount = { user_id, bank_id, status };
    UsersAccount.create(newUsersAccount, (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(201).json(result);
    });
};

exports.deleteUsersAccount = (req, res) => {
    const { id } = req.params;

    UsersAccount.delete(id, (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(204).json(result);
    });
};
