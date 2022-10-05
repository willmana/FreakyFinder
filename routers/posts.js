const postRouter = require('express').Router();
const Post = require('../models/Post');
const { expressjwt: jwt } = require('express-jwt');
const config = require('../serverutils/config');
const User = require('../models/User');
const Comment = require('../models/Comment');

// Get all posts
postRouter.get(
    '/',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        const posts = await Post.find({})
            .populate('user', { username: 1 })
            .populate('comments', { content: 1, createdAt: 1 });
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
        const posts = await Post.find({ user: request.params.id })
            .populate('user', { username: 1 })
            .populate('comments', { content: 1, createdAt: 1, user: 1 });
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
            const ownPosts = await Post.find({ user: request.params.id })
                .populate('user', { username: 1 })
                .populate('comments', { content: 1, createdAt: 1, user: 1 });
            const posts = await Promise.all(
                user.following.map((friend) => {
                    return Post.find({ user: friend })
                        .populate('user', { username: 1 })
                        .populate('comments', {
                            content: 1,
                            createdAt: 1,
                            user: 1
                        });
                })
            );
            const resObject = ownPosts.concat([].concat.apply([], posts));
            response.status(200).json(resObject);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
);

// Get all comments from specific post
postRouter.get(
    '/comments/:id',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        const comments = await Comment.find({ post: request.params.id });
        response.json(comments.map((c) => c.toJSON()));
    }
);

module.exports = postRouter;
