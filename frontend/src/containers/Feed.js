import React, { useEffect } from 'react';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/app';
import styles from './Feed.module.scss';
import { requestFeed } from '../redux/calls';

const Feed = () => {
    const dispatch = useDispatch();
    const posts = useSelector(getPosts);

    useEffect(() => {
        dispatch(requestFeed());
    }, [dispatch]);

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
