const userRouter = require('express').Router();
const User = require('../models/User');
const config = require('../serverutils/config');
const bcrypt = require('bcrypt');
const logger = require('../serverutils/logger');
var { expressjwt: jwt } = require('express-jwt');

// Get all users
userRouter.get(
    '/',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        const users = await User.find({})
            .populate('posts', { description: 1 })
            .populate('followers', { username: 1 })
            .populate('following', { username: 1 });
        response.json(users.map((u) => u.toJSON()));
    }
);

// Get user
userRouter.get(
    '/:username',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        const user = await User.findOne({ username: request.params.username });
        response.json(user);
    }
);

// Update user
userRouter.put(
    '/:id',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        try {
            const body = request.body;
            if (request.params.id !== body.id)
                return response
                    .status(403)
                    .json({ message: "Can't update other accounts" });

            const user = await User.findByIdAndUpdate(body.id, body, {
                new: true
            });
            return response.status(200).json(user);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
);

// Delete user
userRouter.delete(
    '/:id',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        try {
            const body = request.body;
            if (request.params.id !== body.id)
                return response
                    .status(403)
                    .json({ message: "Can't delete other accounts" });
            if (!body.username || !body.password)
                return response
                    .status(400)
                    .json({ message: 'Missing username or password' });
            const userForVerification = await User.findOne({
                username: body.username
            });
            const verified = await bcrypt.compare(
                body.password,
                userForVerification.passwordHash
            );
            if (!verified)
                return response
                    .status(400)
                    .json({ message: 'Wrong credentials' });

            const user = await User.findByIdAndRemove(body.id);
            return response.status(200).json(user);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
);

// Follow user
userRouter.put(
    '/:id/follow',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        try {
            const body = request.body;
            if (request.params.id === body.userId) {
                return response
                    .status(403)
                    .json({ message: "Can't follow yourself" });
            }
            const followedUser = await User.findById(request.params.id);
            if (followedUser.followers.includes(body.userId)) {
                return response.status(403).json({
                    message: 'You already follow this user'
                });
            }
            await User.findByIdAndUpdate(request.params.id, {
                $push: { followers: body.userId }
            });
            await User.findByIdAndUpdate(body.userId, {
                $push: { following: request.params.id }
            });
            return response.status(200).json({
                message: `${body.username} now follows ${followedUser.username}`
            });
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
);

// Unfollow user
userRouter.put(
    '/:id/unfollow',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        try {
            const body = request.body;
            if (request.params.id === body.userId) {
                return response
                    .status(403)
                    .json({ message: "Can't unfollow yourself" });
            }
            const followedUser = await User.findById(request.params.id);
            if (!followedUser.followers.includes(body.userId)) {
                return response.status(403).json({
                    message: 'You are not following this user'
                });
            }
            await User.findByIdAndUpdate(request.params.id, {
                $pull: { followers: body.userId }
            });
            await User.findByIdAndUpdate(body.userId, {
                $pull: { following: request.params.id }
            });
            return response.status(200).json({
                message: `${body.username} now unfollows ${followedUser.username}`
            });
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
);

module.exports = userRouter;
