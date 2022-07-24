import React from 'react';

const Comment = ({ commentProps }) => {
    return (
        <div>
            <h5>{commentProps.author}</h5>
            <small>{commentProps.date}</small>
            <p>{commentProps.content}</p>
        </div>
    );
};

export default Comment;
