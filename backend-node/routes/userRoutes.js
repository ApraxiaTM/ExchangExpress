const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const auth = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getUserByUsername);
router.put('/', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;