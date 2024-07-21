// models/bankAccountModel.js
const db = require('../config/db');

const BankAccount = {
    getPersonal: (username, callback) => {
        db.query('SELECT ba.* FROM bank_account ba INNER JOIN users_account ua ON ba.id = ua.bank_id INNER JOIN users u ON ua.user_id = u.id WHERE ua.status = "sender" AND u.username = ?', [username], callback);
    },
    getReceivers: (username, callback) => {
        db.query('SELECT ba.* FROM bank_account ba INNER JOIN users_account ua ON ba.id = ua.bank_id INNER JOIN users u ON ua.user_id = u.id WHERE ua.status = "receiver" AND u.username = ?', [username], callback);
    },
    getReceiversLocal: (username, callback) => {
        db.query('SELECT ba.* FROM bank_account ba INNER JOIN users_account ua ON ba.id = ua.bank_id INNER JOIN users u ON ua.user_id = u.id WHERE ua.status = "receiver" AND ba.currency = "IDR" AND u.username = ?', [username], callback);
    },
    getReceiversForeign: (username, callback) => {
        db.query('SELECT ba.* FROM bank_account ba INNER JOIN users_account ua ON ba.id = ua.bank_id INNER JOIN users u ON ua.user_id = u.id WHERE ua.status = "receiver" AND ba.currency != "IDR" AND u.username = ?', [username], callback);
    },
    getInitial: (transfer_code, callback) => {
        db.query('SELECT * FROM bank_account WHERE transfer_code = ?', transfer_code, callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO bank_account SET ?', data, callback);
    },
    updateSender: (username, data, callback) => {
        db.query('UPDATE bank_account ba INNER JOIN users_account ua ON ba.id = ua.bank_id INNER JOIN users u ON ua.user_id = u.id SET ba.bankname = ?, ba.currency = ?, ba.holder = ?, ba.country = ?, ba.transfer_code = ? WHERE ua.status = "sender" AND u.username = ?', [data.bankname, data.currency, data.holder, data.country, data.transfer_code, username], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM bank_account WHERE id = ?', id, callback);
    }
};

module.exports = BankAccount;
