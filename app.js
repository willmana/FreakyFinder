const express = require('express');
const app = express();
const cors = require('cors');
const { expressjwt: jwt } = require('express-jwt');
const authRouter = require('./routers/auth');
const userRouter = require('./routers/users');
const postRouter = require('./routers/posts');
const commentRouter = require('./routers/comments');
const middleware = require('./serverutils/middleware');
const config = require('./serverutils/config');
const logger = require('./serverutils/logger');
const mongoose = require('mongoose');

logger.info('Connecting to ', config.MONGODB_URI);

mongoose
    .connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        logger.info('Connected to MongoDB');
    })
    .catch((error) => {
        logger.error('Error while connecting to MongoDB: ', error.message);
    });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(
    jwt({
        secret: config.SECRET,
        algorithms: ['HS256'],
        getToken: function getTokenFromHeader(request) {
            if (
                request.headers.authorization &&
                request.headers.authorization.split(' ')[0] === 'Bearer'
            ) {
                return request.headers.authorization.split(' ')[1];
            }
            return null;
        }
    }).unless({
        path: ['/api/auth/login', '/api/auth/register', '/api/auth/verify']
    })
);

//Routerit
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
