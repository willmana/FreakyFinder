import React, { useEffect, useState } from 'react';
import postApi from '../api/post';
import Comment from './Comment';
import CommentForm from './CommentForm';
import styles from './Post.module.scss';
import { dateSorter } from './../utils/index';

const Post = ({ postProps }) => {
    const [comments, setComments] = useState([]);
    const date = new Date(postProps.createdAt);

    useEffect(() => {
        async function getComments() {
            const commentRes = await postApi.getComments(postProps.id);
            setComments(commentRes);
        }
        getComments();
    }, [postProps.id]);

    return (
        <div className={styles.postcontainer}>
            <div className={styles.topbar}>
                <div className={styles.username}>{postProps.user.username}</div>
                <div className={styles.date}>{date.toDateString()}</div>
            </div>
            <p className={styles.text}>{postProps.description}</p>
            <div className={styles.separatorline}></div>
            {comments &&
                dateSorter(comments).map((p) => (
                    <Comment key={p.id} commentProps={p} />
                ))}
            <CommentForm postId={postProps.id} setComments={setComments} />
        </div>
    );
};

export default Post;
