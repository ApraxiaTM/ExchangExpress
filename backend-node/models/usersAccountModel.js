// models/usersAccountModel.js
const db = require('../config/db');

const UsersAccount = {
    getByUsername: (username, holder, callback) => {
        db.query('SELECT ua.* FROM users_account ua JOIN users u ON ua.user_id = u.id JOIN bank_account ba ON ua.bank_id = ba.id WHERE ba.holder = ? AND u.username = ?', [holder, username], callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO users_account SET ?', data, callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM users_account WHERE bank_id = ?', id, callback);
    }
};

module.exports = UsersAccount;
