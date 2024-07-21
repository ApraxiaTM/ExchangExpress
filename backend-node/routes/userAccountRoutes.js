// routes/usersAccountRoutes.js
const express = require('express');
const router = express.Router();
const usersAccountController = require('../controllers/userAccountController');

router.get('/', usersAccountController.getUsersAccount);
// router.get('/:id', usersAccountController.getUsersAccountById);
router.post('/', usersAccountController.createUsersAccount);
// router.put('/', usersAccountController.updateUsersAccount);
router.delete('/:id', usersAccountController.deleteUsersAccount);

module.exports = router;
