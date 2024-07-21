// controllers/usersController.js
const bcrypt = require('bcrypt');
const Users = require('../models/usersModel');

let loggedInUsers = {}; // In-memory store for logged-in users

exports.register = (req, res) => {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
        username,
        email,
        pass: hashedPassword,
        salt: salt,
    };

    Users.create(newUser, (err, data) => {
        if (err) return res.status(500).send(err);
        const userId = data.id;
        res.status(201).json({ user_id: userId, message: 'User registered successfully' });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    const findUserCallback = (err, users) => {
        if (err || users.length === 0) return res.status(400).send('User not found');

        const user = users[0];
        console.log(user);
        const hashedPassword = bcrypt.hashSync(password, user.salt);
    
        console.log(hashedPassword)
        if (hashedPassword !== user.pass) {
            return res.status(400).send('Invalid password');
        } else{
            // Store the logged-in user ID
            loggedInUsers[user.id] = true;
            res.status(200).json({ message: 'Login successful', userId: user.id });
        } 
    };

    if (username) {
        Users.findByUsername(username, findUserCallback);
    } else {
        res.status(400).send('Username is required');
    }
};

exports.getUserByUsername = (req, res) => {
    const { username } = req.query;
    // const { username } = req.body;

    Users.getByUsername(username, (err, data) => {
        if (err) return res.status(500).send(err);
        if (!data) return res.status(404).send('User not found');
        res.status(200).send(data);
    });
};

exports.updateUser = (req, res) => {
    const { old_username, username, email} = req.body;

    const updatedUser = {
        username: username,
        email: email,
    };

    Users.update(old_username, updatedUser, (err, data) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('User updated successfully');
    });
};