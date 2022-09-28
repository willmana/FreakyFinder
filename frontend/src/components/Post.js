import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import styles from './Post.module.scss';

const Post = ({ postProps }) => {
    const [comments, setComments] = useState(postProps.comments);
    const date = new Date(postProps.createdAt);

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
