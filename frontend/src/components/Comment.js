import React from 'react';
import styles from './Comment.module.scss';

const Comment = ({ commentProps }) => {
    return (
        <div className={styles.commentcontainer}>
            <h5>{commentProps.id}</h5>
            <p>{commentProps.content}</p>
        </div>
    );
};

export default Comment;
