const userRouter = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../serverutils/config');
const bcrypt = require('bcrypt');
const logger = require('../serverutils/logger');

// Get all users
userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('posts', { description: 1 });
    response.json(users.map((u) => u.toJSON()));
});

// Get user
userRouter.get('/:username', async (request, response) => {
    const user = await User.findOne({ username: request.params.username });
    response.json(user);
});

// Update user
userRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body;
        if (request.params.id !== body.id)
            return response
                .status(403)
                .json({ message: "Can't update other accounts" });
        if (!request.token)
            return response.status(401).json({ message: 'Token missing' });
        try {
            const token = jwt.verify(request.token, config.SECRET);
            if (!token || token.id !== body.id) {
                return response
                    .status(401)
                    .json({ message: "Token doesn't belong to this user" });
            }
        } catch (error) {
            return response.status(401).json({ message: 'Token invalid' });
        }
        const user = await User.findByIdAndUpdate(body.id, body, { new: true });
        return response.status(200).json(user);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

// Delete user
userRouter.delete('/:id', async (request, response) => {
    try {
        const body = request.body;
        if (request.params.id !== body.id)
            return response
                .status(403)
                .json({ message: "Can't delete other accounts" });

        if (!request.token)
            return response.status(401).json({ message: 'Token missing' });
        try {
            jwt.verify(request.token, config.SECRET);
        } catch (error) {
            return response.status(401).json({ message: 'Token invalid' });
        }
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
            return response.status(400).json({ message: 'Wrong credentials' });

        const user = await User.findByIdAndRemove(body.id);
        return response.status(200).json(user);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = userRouter;
