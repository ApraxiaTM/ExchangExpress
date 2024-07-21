// models/currencyModel.js
const db = require('../config/db');

const Currency = {
    // getAll: (callback) => {
    //     db.query('SELECT * FROM currency', callback);
    // },
    getByCurrency: (currency, callback) => {
        db.query('SELECT * FROM currency WHERE currency = ?', [currency], callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO currency SET ?', data, callback);
    },
    update: (id, data, callback) => {
        db.query('UPDATE currency SET ? WHERE id = ?', [data, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM currency WHERE id = ?', [id], callback);
    }
};

module.exports = Currency;
