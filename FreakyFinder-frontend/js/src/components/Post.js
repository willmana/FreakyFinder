import React from 'react';

export const Post = ({ postProps }) => {
    return (
        <div>
            <h4>{postProps.author}</h4>
            <p>{postProps.content}</p>
            <div></div>
            <div></div>
        </div>
    );
};

export default Post;
