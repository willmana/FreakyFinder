import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/app';
import styles from './CommentForm.module.scss';
import commentApi from './../api/comment';
import postApi from '../api/post';
import SendIcon from '@mui/icons-material/Send';

const CommentForm = ({ postId, setComments }) => {
    const [commentData, setCommentData] = useState('');
    const user = useSelector(getUser);
    const onInputChange = (event) => {
        setCommentData(event.target.value);
    };

    const onClickSubmitComment = async (e) => {
        e.preventDefault();
        const commentObject = {
            userId: user.id,
            postId: postId,
            content: commentData
        };
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
            <button
                onClick={onClickSubmitComment}
                className={styles.sendbutton}
            >
                <SendIcon />
            </button>
        </div>
    );
};

export default CommentForm;
