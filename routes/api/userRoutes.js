const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User Routes

router.get('/users', userController.getUsers);
router.get('/users/:userId', userController.getSingleUser);
router.post('/users', userController.createUser);
router.put('users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);
router.post('/users/:userId/friends/:friendId', userController.addFriend);
router.delete('/users/:userId/friends/:friendId', userController.removeFriend);

module.exports = router;