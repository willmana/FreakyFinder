import React from 'react';
import styles from './Comment.module.scss';

const Comment = ({ commentProps }) => {
    const date = new Date(commentProps.createdAt);

    return (
        <div className={styles.commentcontainer}>
            <div className={styles.topbar}>
                <div className={styles.username}>
                    {commentProps.user.username}
                </div>
                <div className={styles.date}>{date.toDateString()}</div>
            </div>
            <p className={styles.text}>{commentProps.content}</p>
        </div>
    );
};

export default Comment;
