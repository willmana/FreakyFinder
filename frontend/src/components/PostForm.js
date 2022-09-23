import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, getUser, setPosts } from '../redux/app';
import postApi from './../api/post';
import styles from './PostForm.module.scss';

const PostForm = () => {
    const [postData, setPostData] = useState();
    const user = useSelector(getUser);
    const posts = useSelector(getPosts);
    const dispatch = useDispatch();

    const onInputChange = (event) => {
        setPostData(event.target.value);
    };
    const onClickSubmitPost = async (e) => {
        e.preventDefault();
        const postObject = {
            userId: user.user.id,
            description: postData,
            date: new Date()
        };
        console.log(postObject);
        await postApi.createPost(postObject, user.token);
        setPostData('');
        const res = await postApi.getAll();
        dispatch(setPosts(res));
    };

    return (
        <div className={styles.maincontainer}>
            <textarea
                className={styles.inputfield}
                value={postData}
                placeholder="kirjoita jotain"
                onChange={onInputChange}
            ></textarea>
            <div className={styles.buttoncontainer}>
                <button
                    onClick={onClickSubmitPost}
                    className={styles.submitbutton}
                >
                    Julkaise
                </button>
            </div>
        </div>
    );
};

export default PostForm;
