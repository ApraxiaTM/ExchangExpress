// models/transactionsModel.js
const db = require('../config/db');

const Transactions = {
    getAll: (username, callback) => {
        db.query(('SELECT sender_account.holder AS sender, receiver_account.holder AS receiver, t.amount, t.rate_conversion, t.currency, t.timestamps, t.admin_fee FROM transactions t JOIN users_account sender_ua ON t.user_id = sender_ua.user_id AND sender_ua.status = "sender" JOIN bank_account sender_account ON sender_ua.bank_id = sender_account.id JOIN users_account receiver_ua ON t.users_account_id = receiver_ua.id JOIN bank_account receiver_account ON receiver_ua.bank_id = receiver_account.id JOIN users u ON t.user_id = u.id WHERE u.username = ?'), username ,callback);
    },
    // getById: (id, callback) => {
    //     db.query('SELECT * FROM transactions WHERE id = ?', [id], callback);
    // },
    // create: (data, callback) => {
    //     db.query('INSERT INTO transactions SET ?', data, callback);
    // },
    create: (data, callback) => {
        db.query(`INSERT INTO transactions (user_id, users_account_id, currency, amount, rate_conversion, admin_fee)
        SELECT
            u.id AS user_id,
            ua.id AS users_account_id,
            ? AS currency,
            ? AS amount,
            c.id_amount AS rate_conversion,
            ? AS admin_fee
        FROM users u
        JOIN users_account ua ON ua.bank_id = (SELECT id FROM bank_account WHERE holder = ?)
        JOIN currency c ON c.currency = ?
        WHERE u.username = ?;
    `, [ data.currency, data.amount, data.admin_fee, data.receiver, data.currency, data.username], callback);
    },
    // findId: (data, callback) => {
    //     db.query('SELECT id FROM users WHERE username = ?', data, callback);
    // },
    // update: (id, data, callback) => {
    //     db.query('UPDATE transactions SET ? WHERE id = ?', [data, id], callback);
    // },
    delete: (id, callback) => {
        db.query('DELETE FROM transactions WHERE id = ?', [id], callback);
    }
};

module.exports = Transactions;
