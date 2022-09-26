const commentRouter = require('express').Router();
const Comment = require('../models/Comment');
const { expressjwt: jwt } = require('express-jwt');
const config = require('../serverutils/config');
const Post = require('../models/Post');

// Get a comment with specific id
commentRouter.get(
    '/:id',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        const comment = await Comment.findById(request.params.id);
        response.json(comment);
    }
);

// Create new comment
commentRouter.post(
    '/',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        try {
            const body = request.body;

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
    }
);

module.exports = commentRouter;
