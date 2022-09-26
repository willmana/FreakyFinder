import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import styles from './Post.module.scss';
import postApi from './../api/post';

const Post = ({ postProps }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        async function getComments() {
            const commentRes = await postApi.getComments(postProps.id);
            setComments(commentRes);
        }
        getComments();
    }, [postProps.id]);
    const date = new Date(postProps.createdAt);

    console.log(postProps);
    return (
        <div className={styles.postcontainer}>
            <div className={styles.topbar}>
                <div className={styles.username}>{postProps.user.username}</div>
                <div className={styles.date}>{date.toDateString()}</div>
            </div>
            <p className={styles.text}>{postProps.description}</p>
            <div className={styles.separatorline}></div>
            {comments &&
                comments.map((p) => <Comment key={p.id} commentProps={p} />)}
            <CommentForm postId={postProps.id} setComments={setComments} />
        </div>
    );
};

export default Post;
