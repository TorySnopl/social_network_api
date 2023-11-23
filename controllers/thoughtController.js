const { Reaction, Thought, User } = require('../models');

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
async createThought(req,res){
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOne({_id: req.params.userId});

        if (!user){
            return res.status(404).json({message: "User not found"});
        }

        user.thoughts.push(thought._id);
        user.save();

        res.json(thought);
    }catch (err){
        console.error(err);
        return res.status(500).json(err);
    }
},

// Put to update a thought by its _id
async updateThought(req,res){
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body}
        );

        if(!thought){
            return res.status(404).json({message: "no thought found"})
        }

        res.json(thought);
    }catch(err){
        res.status(500).json(err);
    }
},

//Delete a thought by its _id
async deleteThought(req,res){
    try{
        const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId})

        if(!thought){
            return res.status(404).json({message: "no thought found with that Id"})
        }

        res.json({message: "Thought deleted"})
    }catch(err){
        res.status(500).json(err);
    }
},

// /api/thoughts/:thoughtId/reactions;
//Post to create a reaction stored in a single thoughts reactions array

//Delete to pull and remove a reaction by the reactions reactionId value

};