const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                // Using a simple regular expression for email validation
                return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
    }

},
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
    

},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema
.virtual('friendCount')
.get(function(){
    return this.friends.length;
})

const User = model ('user', userSchema);

module.exports = User;
