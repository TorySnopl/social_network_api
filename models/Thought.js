const {Schema, model} = require('mongoose');
const Reaction = require('./Reaction');
const dayjs = require('dayjs');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 128,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(createdAt){
            return dayjs(createdAt).format("LLL")
        } 
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [Reaction.schema],
},
{
    timestamps: true,

    toJSON: {
        virtuals: true,
    },
    id: false,
});

thoughtSchema
.virtual('reactionCount')
.get(function(){
    return this.reactions.length;
});



const Thought = model ('thought', thoughtSchema);

module.exports = Thought;
