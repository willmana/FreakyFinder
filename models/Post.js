const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        description: { type: String, maxlength: 500, required: false },
        likes: { type: Array, default: [], required: false }
    },
    { timestamps: true }
);

postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Post', postSchema);
