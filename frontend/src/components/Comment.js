import React from 'react';

const Comment = ({ commentProps }) => {
    return (
        <div>
            <h5>{commentProps.id}</h5>
            <p>{commentProps.content}</p>
        </div>
    );
};

export default Comment;
