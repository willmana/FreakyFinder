const postRouter = require('express').Router();
const Post = require('../models/Post');
const { expressjwt: jwt } = require('express-jwt');
const config = require('../serverutils/config');
const User = require('../models/User');

// Get all posts
postRouter.get(
    '/',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        const posts = await Post.find({})
            .populate('user', { username: 1 })
            .populate('comments', { content: 1 });
        response.json(posts.map((p) => p.toJSON()));
    }
);

// Get post
postRouter.get(
    '/:id',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        const post = await Post.findById(request.params.id);
        response.json(post);
    }
);

// Get all posts from specific user
postRouter.get(
    '/user/:id',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        const posts = await Post.find({ user: request.params.id });
        response.json(posts.map((p) => p.toJSON()));
    }
);

// Create new post
postRouter.post(
    '/',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        try {
            const body = request.body;

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
    }
);

// Get all posts from followed users
postRouter.get(
    '/feed/:id',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        try {
            const userId = request.params.id;
            const user = await User.findById(userId);
            const posts = await Promise.all(
                user.following.map((friend) => {
                    return Post.find({ user: friend });
                })
            );
            response.status(200).json(posts);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
);

module.exports = postRouter;
