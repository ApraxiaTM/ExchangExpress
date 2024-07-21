// models/usersModel.js
const db = require('../config/db');

const Users = {
    getByUsername: (username, callback) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO users SET ?', data, callback);
    },
    update: (old_username, data, callback) => {
        db.query('UPDATE users SET username = ?, email = ?  WHERE username = ?', [data.username, data.email, old_username], callback);
    },
    // delete: (id, callback) => {
    //     db.query('DELETE FROM users WHERE id = ?', [id], callback);
    // },
    findByUsername: (username, callback) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], callback);
    }
};

module.exports = Users;
