const postRouter = require('express').Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const config = require('../serverutils/config');
const User = require('../models/User');

// Get all posts
postRouter.get('/', async (request, response) => {
    const posts = await Post.find({})
        .populate('user', { username: 1 })
        .populate('comments', { content: 1 });
    response.json(posts.map((p) => p.toJSON()));
});

// Get post
postRouter.get('/:id', async (request, response) => {
    const post = await Post.findById(request.params.id);
    response.json(post);
});

// Get all posts from specific user
postRouter.get('/user', async (request, response) => {
    const posts = await Post.find({ user: request.query.id });
    response.json(posts.map((p) => p.toJSON()));
});

// Create new post
postRouter.post('/', async (request, response) => {
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
        const user = await User.findById(body.userId);
        const post = new Post({
            user: body.userId,
            description: body.description
        });
        const savedPost = await post.save();
        user.posts = user.posts.concat(savedPost._id);
        await user.save();
        return response.status(201).json(savedPost);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = postRouter;
