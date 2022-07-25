const commentRouter = require('express').Router();
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');
const config = require('../serverutils/config');
const Post = require('../models/Post');

// Get all comments from specific post
commentRouter.get('/:id', async (request, response) => {
    const comments = await Comment.find({ post: request.params.id });
    response.json(comments.map((c) => c.toJSON()));
});

// Create new post
commentRouter.post('/', async (request, response) => {
    try {
        const body = request.body;
        if (!request.token)
            return response.status(401).json({ message: 'Token missing' });
        try {
            const verifiedToken = jwt.verify(request.token, config.SECRET);
            if (!verifiedToken || verifiedToken.id !== body.userId) {
                return response
                    .status(401)
                    .json({ message: "Token doesn't belong to this user" });
            }
        } catch (error) {
            return response.status(401).json({ message: 'Token invalid' });
        }
        const post = await Post.findById(body.postId);
        const comment = new Comment({
            user: body.userId,
            post: body.postId,
            content: body.content
        });
        const savedComment = await comment.save();
        post.comments = post.comments.concat(savedComment._id);
        await post.save();
        return response.status(201).json(savedComment);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = commentRouter;
