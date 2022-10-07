import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAndUpdate } from '../redux/app';
import Button from './Button';
import styles from './PostForm.module.scss';

const PostForm = () => {
    const [postData, setPostData] = useState('');
    const dispatch = useDispatch();

    const onInputChange = (event) => {
        setPostData(event.target.value);
    };
    const onClickSubmitPost = async (e) => {
        e.preventDefault();
        dispatch(postAndUpdate(postData));
        setPostData('');
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
