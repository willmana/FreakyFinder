import React, { useEffect, useState } from 'react';
import Comment from './Comment';

const Post = ({ postProps }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        setComments(postProps.comments);
    }, [postProps.comments, setComments]);
    return (
        <div>
            <h4>{postProps.author}</h4>
            <small>{postProps.date}</small>
            <p>{postProps.description}</p>
            {comments.map((p) => (
                <Comment commentProps={p} />
            ))}
        </div>
    );
};

export default Post;
