const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {},
    last_name: {},
    username: {},
    password: {},
    gender: {},
    date_of_birth: {},
    country: {},
    city: {},
    following: {},
    followers: {},
    isAdmin: {}
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('User', userSchema);
