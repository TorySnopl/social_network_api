const express = require('express');
const router = express.Router();
const thoughtController = require('../controllers/thoughtController');

//Thought Routes
router.get('/thoughts', thoughtController.getThoughts);
router.get('/thoughts/:thoughtId', thoughtController.getSingleThought);
router.post('/thoughts', thoughtController.createThought);
router.put('/thoughts/:thoughtId', thoughtController.updateThought);
router.delete('/thoughts/:thoughtId', thoughtController.deleteThought);
router.post('/thoughts/:thoughtId/reactions', thoughtController.createReaction);
router.delete('/thoughts/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);

module.exports = router;