import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import userApi from './../api/user';
import styles from './ProfilePage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import postApi from './../api/post';
import { setPosts } from '../redux/app';
import { getPosts } from './../redux/app';
import Post from './../components/Post';

const ProfilePage = () => {
    const [user, setUser] = useState();
    const location = useLocation();
    const posts = useSelector(getPosts);
    const dispatch = useDispatch();

    // Derive username from path
    useEffect(() => {
        const username = location.pathname.split('/')[2];
        async function getContent() {
            const userResponse = await userApi.getUser(username);
            setUser(userResponse);
            const postResponse = await postApi.getUserPosts(userResponse.id);
            const sortedresponse = postResponse.sort((a, b) => {
                const dateA = a.createdAt.toUpperCase();
                const dateB = b.createdAt.toUpperCase();
                if (dateA < dateB) return 1;
                if (dateA > dateB) return -1;
                return 0;
            });
            dispatch(setPosts(sortedresponse));
        }
        getContent();
    }, [dispatch, location.pathname]);

    return (
        <>
            {user && (
                <div className={styles.maincontainer}>
                    <div>{user.first_name}</div>
                    {posts.map((post) => (
                        <Post key={post.id} postProps={post} />
                    ))}
                </div>
            )}
        </>
    );
};

export default ProfilePage;
