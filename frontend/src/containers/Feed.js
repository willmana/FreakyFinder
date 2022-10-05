import React, { useEffect } from 'react';
import postApi from '../api/post';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getUser, setPosts } from '../redux/app';
import styles from './Feed.module.scss';

const Feed = ({ profileFeed = false, userId }) => {
    const dispatch = useDispatch();
    const posts = useSelector(getPosts);
    const user = useSelector(getUser);

    useEffect(() => {
        async function getPosts() {
            let postResponse;
            if (profileFeed) {
                postResponse = await postApi.getUserPosts(userId);
            } else {
                postResponse = await postApi.getFeed(user.id);
            }
            const sortedresponse = postResponse.sort((a, b) => {
                const dateA = a.createdAt.toUpperCase();
                const dateB = b.createdAt.toUpperCase();
                if (dateA < dateB) return 1;
                if (dateA > dateB) return -1;
                return 0;
            });
            dispatch(setPosts(sortedresponse));
        }
        getPosts();
    }, [dispatch, profileFeed, user.id, userId]);

    return (
        <div className={styles.maincontainer}>
            <PostForm />
            {posts.map((post) => (
                <Post key={post.id} postProps={post} />
            ))}
        </div>
    );
};

export default Feed;
