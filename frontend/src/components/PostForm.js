import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAndUpdate } from '../redux/app';
import Button from './Button';
import styles from './PostForm.module.scss';
import { useMessageGetter } from '@messageformat/react';

const PostForm = () => {
    const [postData, setPostData] = useState('');
    const dispatch = useDispatch();
    const msg = useMessageGetter('PostForm');

    const onInputChange = (event) => {
        setPostData(event.target.value);
    };
    const postLenghtInvalid = () => {
        if (postData.length === 0) {
            return true;
        }
        if (postData.length > 500) {
            return true;
        }
        return false;
    };
    const onClickSubmitPost = async (e) => {
        e.preventDefault();
        if (postLenghtInvalid()) {
            window.alert(msg('errorMessage'));
            return;
        }
        if (postData.length) dispatch(postAndUpdate(postData));
        setPostData('');
    };

    return (
        <div className={styles.maincontainer}>
            <textarea
                className={styles.inputfield}
                value={postData}
                placeholder={msg('placeHolder')}
                onChange={onInputChange}
            ></textarea>
            <div className={styles.buttoncontainer}>
                <Button
                    onClick={onClickSubmitPost}
                    className={styles.submitbutton}
                    text={msg('button')}
                />
            </div>
        </div>
    );
};

export default PostForm;
