const {Schema, model, Types} = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default:() => new Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(createdAt){
            return dayjs(createdAt).format("LLL")
        }
    },
}
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;