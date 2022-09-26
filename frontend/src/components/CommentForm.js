import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/app';
import styles from './CommentForm.module.scss';
import commentApi from './../api/comment';
import postApi from '../api/post';
import Button from './Button';

const CommentForm = ({ postId, setComments }) => {
    const [commentData, setCommentData] = useState('');
    const user = useSelector(getUser);
    const onInputChange = (event) => {
        setCommentData(event.target.value);
    };

    const onClickSubmitComment = async (e) => {
        e.preventDefault();
        const commentObject = {
            userId: user.user.id,
            postId: postId,
            content: commentData
        };
        console.log(commentObject);
        await commentApi.createComment(commentObject);
        setCommentData('');
        const commentRes = await postApi.getComments(postId);
        setComments(commentRes);
    };

    return (
        <div className={styles.maincontainer}>
            <input
                className={styles.inputfield}
                value={commentData}
                placeholder="kirjoita kommentti"
                onChange={onInputChange}
            ></input>
            <div className={styles.buttoncontainer}>
                <Button onClick={onClickSubmitComment} text={'Julkaise'} />
            </div>
        </div>
    );
};

export default CommentForm;
