const userRouter = require('express').Router();
const User = require('../models/User');

userRouter.get('/', async (request, response) => {
    const users = await User.find({});
    response.json(users.map((u) => u.toJSON()));
});

module.exports = userRouter;
