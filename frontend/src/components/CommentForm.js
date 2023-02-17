import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/app';
import styles from './CommentForm.module.scss';
import commentApi from './../api/comment';
import postApi from '../api/post';
import SendIcon from '@mui/icons-material/Send';
import { useMessageGetter } from '@messageformat/react';

const CommentForm = ({ postId, setComments }) => {
    const [commentData, setCommentData] = useState('');
    const msg = useMessageGetter('CommentForm');
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
                placeholder={msg('placeHolder')}
                onChange={onInputChange}
                autoComplete="off"
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
