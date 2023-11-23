const express = require('express');
const router = express.Router();
const userController = require('/Users/tory/Documents/repos/social_network_api/controllers/userController');

// User Routes

router.get('/', userController.getUsers);
router.get('/:userId', userController.getSingleUser);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.post('/:userId/friends/:friendId', userController.addFriend);
router.delete('/:userId/friends/:friendId', userController.removeFriend);

module.exports = router;