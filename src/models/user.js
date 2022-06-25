const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    firstLogin: {
        type: Boolean,
        default: true
    },
    state: {
        type: Boolean,
        default: true,
    },
    oldPassword: [
        {
            type: String,
        }
    ],
    attempts:{
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN'],
    }
});
module.exports = model("User", userSchema);

