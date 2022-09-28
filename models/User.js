const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        username: { type: String, required: true },
        passwordHash: { type: String, required: true },
        gender: { type: Number, enum: [1, 2, 3], required: true },
        date_of_birth: { type: Date, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
                required: false
            }
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: false
            }
        ],
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: false
            }
        ],
        isAdmin: { type: Boolean, default: false, required: false }
    },
    { timestamps: true }
);

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

module.exports = mongoose.model('User', userSchema);
