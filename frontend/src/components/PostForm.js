import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, getUser, setPosts } from '../redux/app';
import postApi from './../api/post';
import Button from './Button';
import styles from './PostForm.module.scss';

const PostForm = () => {
    const [postData, setPostData] = useState('');
    const user = useSelector(getUser);
    const posts = useSelector(getPosts);
    const dispatch = useDispatch();

    const onInputChange = (event) => {
        setPostData(event.target.value);
    };
    const onClickSubmitPost = async (e) => {
        e.preventDefault();
        const postObject = {
            userId: user.id,
            description: postData,
            date: new Date()
        };
        await postApi.createPost(postObject);
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
                <Button
                    onClick={onClickSubmitPost}
                    className={styles.submitbutton}
                    text={'Julkaise'}
                />
            </div>
        </div>
    );
};

export default PostForm;
