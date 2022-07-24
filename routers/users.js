const userRouter = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../serverutils/config');
const bcrypt = require('bcrypt');

// Get all users
userRouter.get('/', async (request, response) => {
    const users = await User.find({});
    response.json(users.map((u) => u.toJSON()));
});

// Get user
userRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id);
    response.json(user);
});

// Update user
userRouter.put('/:id', async (request, response) => {
    const body = request.body;
    if (request.params.id !== body.id)
        return response
            .status(403)
            .json({ message: "Can't update other accounts" });
    const decodedToken = jwt.verify(request.token, config.SECRET);
    if (!decodedToken || !decodedToken.id)
        return response
            .status(401)
            .json({ message: 'Token missing or invalid' });
    const user = await User.findByIdAndUpdate(body.id, body, { new: true });
    return response.status(200).json(user);
});

// Delete user
userRouter.delete('/:id', async (request, response) => {
    const body = request.body;
    if (request.params.id !== body.id)
        return response
            .status(403)
            .json({ message: "Can't delete other accounts" });

    const decodedToken = jwt.verify(request.token, config.SECRET);
    if (!decodedToken || !decodedToken.id)
        return response
            .status(401)
            .json({ message: 'Token missing or invalid' });

    const userForVerification = await User.findOne({ username: body.username });
    const verified = await bcrypt.compare(
        body.password,
        userForVerification.passwordHash
    );
    if (!verified)
        return response.status(400).json({ message: 'Wrong credentials' });

    const user = await User.findByIdAndRemove(body.id);
    return response.status(200).json(user);
});

module.exports = userRouter;
