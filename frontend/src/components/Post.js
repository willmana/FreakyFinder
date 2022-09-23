import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import styles from './Post.module.scss';

const Post = ({ postProps }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        setComments(postProps.comments);
    }, [postProps.comments, setComments]);
    const date = new Date(postProps.createdAt);

    console.log(postProps);
    return (
        <div className={styles.postcontainer}>
            <div className={styles.topbar}>
                <div className={styles.username}>{postProps.user.username}</div>
                <div className={styles.date}>{date.toDateString()}</div>
            </div>
            <p className={styles.text}>{postProps.description}</p>
            {comments.map((p) => (
                <Comment key={p.id} commentProps={p} />
            ))}
        </div>
    );
};

export default Post;
