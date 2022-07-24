const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String },
    passwordHash: { type: String },
    gender: { type: Number, enum: [1, 2, 3] },
    date_of_birth: { type: Date },
    country: { type: String },
    city: { type: String },
    following: { type: Array, default: [] },
    followers: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false }
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

module.exports = mongoose.model('User', userSchema);
