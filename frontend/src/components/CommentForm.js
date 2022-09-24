import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/app';
import styles from './CommentForm.module.scss';
import commentApi from './../api/comment';

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
        const commentRes = await commentApi.getComments(postId);
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
            <div>
                <button onClick={onClickSubmitComment}>Julkaise</button>
            </div>
        </div>
    );
};

export default CommentForm;
