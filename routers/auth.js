const authRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../serverutils/config');

// Register new user
authRouter.post('/register', async (request, response, next) => {
    try {
        const body = request.body;
        if (!body.password)
            return response.status(400).json({ message: 'Password missing' });
        const costFactor = 10;
        const passwordHash = await bcrypt.hash(body.password, costFactor);

        const user = new User({
            first_name: body.first_name,
            last_name: body.last_name,
            username: body.username,
            passwordHash,
            gender: body.gender,
            date_of_birth: body.date_of_birth,
            country: body.country,
            city: body.city
        });

        const savedUser = await user.save();
        return response.status(201).json(savedUser);
    } catch (error) {
        return response.status(500).json(error);
    }
});

// Login with existing user
authRouter.post('/login', async (request, response) => {
    try {
        const body = request.body;
        const user = await User.findOne({ username: body.username });
        if (!user)
            return response.status(400).json({ message: 'Wrong credentials' });
        const passwordMatch = await bcrypt.compare(
            body.password,
            user.passwordHash
        );
        if (!passwordMatch)
            return response.status(400).json({ message: 'Wrong credentials' });

        const userForToken = {
            username: user.username,
            id: user._id
        };
        const token = jwt.sign(userForToken, config.SECRET);
        return response.status(200).send({ token, user });
    } catch (error) {
        return response.status(500).json(error);
    }
});

// Verify user
authRouter.post('/verify', async (request, response) => {
    try {
        const body = request.body;
        const user = await User.findOne({ username: body.username });
        if (!user)
            return response.status(400).json({ message: 'Wrong credentials' });
        const username = await User.findById(body.id);
        if (username !== body.username)
            return response.status(400).json({ message: 'Wrong credentials' });
        const passwordMatch = await bcrypt.compare(
            body.password,
            user.passwordHash
        );
        if (!passwordMatch)
            return response.status(400).json({ message: 'Wrong credentials' });
        return response.status(200).json({ verified: true });
    } catch (error) {
        return response.status(500).json(error);
    }
});

module.exports = authRouter;
