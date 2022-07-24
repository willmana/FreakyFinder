const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        postId: { type: String, required: true },
        userId: { type: String, required: true },
        content: { type: String, required: true, maxlength: 500 }
    },
    { timestamps: true }
);

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Comment', commentSchema);
