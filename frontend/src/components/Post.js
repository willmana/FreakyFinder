import React from 'react';

const Post = ({ postProps }) => {
    return (
        <div>
            <h4>{postProps.author}</h4>
            <small>{postProps.date}</small>
            <p>{postProps.description}</p>
        </div>
    );
};

export default Post;
