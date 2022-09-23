import React, { useEffect } from 'react';
import postApi from '../api/post';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, setPosts } from '../redux/app';
import styles from './Feed.module.scss';

const Feed = () => {
    const dispatch = useDispatch();
    const posts = useSelector(getPosts);

    useEffect(() => {
        async function getPosts() {
            const postResponse = await postApi.getAll();
            postResponse.sort((a, b) => a.date - b.date);
            dispatch(setPosts(postResponse));
        }
        getPosts();
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
