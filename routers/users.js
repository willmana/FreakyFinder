const userRouter = require('express').Router();
const User = require('../models/User');
const config = require('../serverutils/config');
const bcrypt = require('bcrypt');
const logger = require('../serverutils/logger');
var { expressjwt: jwt } = require('express-jwt');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

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

// Get user by username
userRouter.get(
    '/profile/:username',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        const user = await User.findOne({ username: request.params.username })
            .populate('followers', {
                username: 1,
                first_name: 1,
                last_name: 1,
                id: 1
            })
            .populate('following', {
                username: 1,
                first_name: 1,
                last_name: 1,
                id: 1
            });
        response.json(user);
    }
);

// Get user by user id
userRouter.get(
    '/:id',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        const user = await User.findById(request.params.id);
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
            //First verify user
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

            // Actual deletion of user
            const user = await User.findByIdAndRemove(body.id);

            // Delete all comments the user has created
            const allComments = await Comment.find({ user: user.id });
            await Comment.deleteMany({ user: user.id });

            // Delete comment references from posts where comment was removed
            if (allComments && allComments.length !== 0) {
                let postReferences = allComments.map((obj) => {
                    const object = { commentid: obj.id, postid: obj.post };
                    return object;
                });
                if (postReferences && postReferences.length !== 0) {
                    await Promise.all(
                        postReferences.map((ref) => {
                            return Post.findByIdAndUpdate(ref.postid, {
                                $pull: { comments: ref.commentid }
                            });
                        })
                    );
                }
            }

            // Delete all posts the user has created
            if (user.posts && user.posts.length !== 0) {
                const posts = await Promise.all(
                    user.posts.map((post) => {
                        const res = Post.findByIdAndRemove(post);
                        return res;
                    })
                );
                // Delete comments from removed posts
                let commentsToRemove = posts.map((obj) => {
                    return obj.comments;
                });
                if (commentsToRemove && commentsToRemove.length !== 0) {
                    commentsToRemove = [].concat.apply([], commentsToRemove);
                    await Promise.all(
                        commentsToRemove.map((comment) => {
                            Comment.findByIdAndRemove(comment);
                        })
                    );
                }
            }

            // Remove user references from follower/following lists
            // (refered field following)
            if (user.followers && user.followers.length !== 0) {
                await Promise.all(
                    user.followers.map((follower) => {
                        return User.findByIdAndUpdate(follower, {
                            $pull: { following: user.id }
                        });
                    })
                );
            }
            // (refered field followers)
            if (user.following && user.following.length !== 0) {
                await Promise.all(
                    user.following.map((followed) => {
                        return User.findByIdAndUpdate(followed, {
                            $pull: { followers: user.id }
                        });
                    })
                );
            }

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

// Update user info via settings
userRouter.put(
    '/:id/modify',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        try {
            const body = request.body;
            if (request.params.id !== body.userId) {
                return response
                    .status(403)
                    .json({ message: "Can't modify other users" });
            }
            await User.findByIdAndUpdate(request.params.id, {
                $set: { [body.fieldname]: body.updatedvalue }
            });
            return response.status(200).json({
                message: `${body.fieldname} now updated with value ${body.updatedvalue}`
            });
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
);

// Change password from settings
userRouter.put(
    '/:id/password',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        try {
            const body = request.body;
            if (request.params.id !== body.userId) {
                return response
                    .status(403)
                    .json({ message: "Can't modify other users" });
            }
            const user = await User.findOne({ username: body.username });
            const passwordMatch = await bcrypt.compare(
                body.oldPassword,
                user.passwordHash
            );
            if (!passwordMatch)
                return response
                    .status(400)
                    .json({ message: 'Incorrect password' });
            if (body.newPassword1 !== body.newPassword2)
                return response
                    .status(400)
                    .json({ message: "New passwords don't match}" });
            const costFactor = 10;
            const newPasswordHash = await bcrypt.hash(
                body.newPassword1,
                costFactor
            );
            await User.findByIdAndUpdate(request.params.id, {
                $set: { passwordHash: newPasswordHash }
            });
            return response.status(200).json({
                message: 'Password successfully updated'
            });
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
);

// Search for users
userRouter.get(
    '/search/:query',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        try {
            const query = request.params.query;
            const users = await User.find({
                $or: [
                    { username: { $regex: query, $options: 'i' } },
                    { first_name: { $regex: query, $options: 'i' } },
                    { last_name: { $regex: query, $options: 'i' } }
                ]
            });
            response.json(users.map((u) => u.toJSON()));
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
);

// Get recommendation for users that your friends are connected with
userRouter.get(
    '/recommendations/:id',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        try {
            const user = await User.findById(request.params.id);
            // Get all followers
            const followers = await Promise.all(
                user.followers.map((follower) => {
                    return User.findById(follower);
                })
            );
            // Get all people that your followers also follow as user ids
            let followsYouFollowAlso = [];
            followers.map((follower) => {
                if (follower !== null) {
                    followsYouFollowAlso.push(...follower.following);
                }
            });
            // Remove recommendations that you already follow
            const followsYouFollowAlsoNoRec = followsYouFollowAlso.filter(
                (id) => !user.following.includes(id)
            );

            // Convert from objectIds to strings and remove duplicates
            const followsYouFollowAlsoToString = followsYouFollowAlsoNoRec
                .map((id) => {
                    if (id.toString() !== user.id) {
                        return id.toString();
                    }
                })
                .filter((id) => id !== undefined);
            const followsYouFollowAlsoNoDuplicates = [
                ...new Set(followsYouFollowAlsoToString)
            ];

            // Get all people you follow
            const followedPeople = await Promise.all(
                user.following.map((followed) => {
                    return User.findById(followed);
                })
            );
            // Get all people they also follow as user ids
            let youFollowFollowAlso = [];
            followedPeople.map((followed) => {
                if (followed !== null) {
                    youFollowFollowAlso.push(...followed.following);
                }
            });
            // Remove recommendations that you already follow
            const youFollowFollowAlsoNoRec = youFollowFollowAlso.filter(
                (id) => !user.following.includes(id)
            );
            // Convert from objectIds to strings and remove duplicates
            const youFollowFollowAlsoToString = youFollowFollowAlsoNoRec
                .map((id) => {
                    if (id.toString() !== user.id) {
                        return id.toString();
                    }
                })
                .filter((id) => id !== undefined);
            const youFollowFollowAlsoNoDuplicates = [
                ...new Set(youFollowFollowAlsoToString)
            ];
            const followerResObj = await Promise.all(
                followsYouFollowAlsoNoDuplicates.map((id) => {
                    return User.findById(id);
                })
            );
            const followingResObj = await Promise.all(
                youFollowFollowAlsoNoDuplicates.map((id) => {
                    return User.findById(id);
                })
            );
            response.status(200).json({
                followYouFollowAlso: followerResObj,
                youFollowFollowAlso: followingResObj
            });
        } catch (error) {}
    }
);

// Return users connections
userRouter.get(
    '/friends/:id',
    jwt({ secret: config.SECRET, algorithms: ['HS256'] }),
    async (request, response) => {
        try {
            const user = await User.findById(request.params.id);
            // Get all followers
            const followers = await Promise.all(
                user.followers.map((follower) => {
                    return User.findById(follower);
                })
            );
            // Get all people you follow
            const youFollow = await Promise.all(
                user.following.map((followed) => {
                    return User.findById(followed);
                })
            );
            response.status(200).json({
                followers: followers,
                youFollow: youFollow
            });
        } catch (error) {}
    }
);

module.exports = userRouter;
