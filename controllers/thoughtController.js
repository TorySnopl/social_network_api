const { User, Thought } = require('../models');

module.exports = {
//Get all thoughts
async getThoughts(req,res){
    try{
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err){
        res.status(500).json(err);
    }
},

//Get a single thought by its _id
async getSingleThought (req,res) {
    try {
        const thought = await Thought.findOne({_id: req.params.thoughtId})
        .select ('-_v');

        if(!thought){
            return res.status(404).json({message: 'No Thought Found with that Id.'})
        }

        res.json(thought);
    } catch (err){
        res.status(500).json(err);
    }
},
//Post to create a new thought(dont forget to push the created thoughts _id to the associated users thoughts array field)

// Put to update a thought by its _id

//Delete a thought by its _id

// /api/thoughts/:thoughtId/reactions;
//Post to create a reaction stored in a single thoughts reactions array

//Delete to pull and remove a reaction by the reactions reactionId value

};