const { User, Thought } = require('../models');

module.exports = {
    //Get all users
    async getUsers(req,res){
        try {
            const users = await User.find();
            res.json(users);
        } catch (err){
            res.status(500).json(err);
        }
    },

    //Get a single user by by its _id and populated thought and friend data
    async getSingleUser (req,res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
            .select ('-_v');

            if (!user) {
                return res.status(404).json({message: 'No user found with that Id.'})
            }

            res.json(user);
        } catch (err){
            res.status(500).json(err);
        }
    },

    //Post a new user
    async createUser(req,res){
        try{
            const user = await User.create(req.body);
            res.json(user);
        }catch(err){
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // Put to update a user by its _id
    async updateUser(req,res){
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body}
            );

            if(!user){
                return res.status(404).json({message: "no user with that ID"});
            }

            res.json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },

    // Delete to remove a user by its _id
    async deleteUser(req,res){
        try{
            const user = await User.findOneAndDelete({_id: req.params.userId});

            if(!user){
                return res.status(404).json({message: "no user with that ID"});
            }

            await Thought.deleteMany({_id: { $in: user.thoughts }});
            
            res.json({message: "User and thoughts deleted!"});
        } catch(err){
            res.status(500).json(err);
        }
    },

    // (api/users/:userId/friends/:friendId) Post to add new friend
    async addFriend(req, res) {
        try {
            const { userId, friendId } = req.params;

            
            const user = await User.findById(userId);
            const friend = await User.findById(friendId);

            if (!user || !friend) {
                return res.status(404).json({ message: 'User or friend not found.' });
            }

    
            if (!user.friends.includes(friendId)) {
                
                user.friends.push(friendId);
                await user.save();

                
                friend.friends.push(userId);
                await friend.save();

                res.json(user);
            } else {
                res.status(400).json({ message: 'Friend already added.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Delete to remove a friend
    async removeFriend(req, res) {
        try {
            const { userId, friendId } = req.params;

            
            const user = await User.findById(userId);
            const friend = await User.findById(friendId);

            if (!user || !friend) {
                return res.status(404).json({ message: 'User or friend not found.' });
            }

        
            if (user.friends.includes(friendId)) {
                
                user.friends = user.friends.filter(friend => friend.toString() !== friendId);
                await user.save();

                
                friend.friends = friend.friends.filter(user => user.toString() !== userId);
                await friend.save();

                res.json(user);
            } else {
                res.status(400).json({ message: 'Friend not found in the user\'s friends list.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
};