import React, { useState } from 'react';
import Post from '../components/Post';

export const Feed = () => {
    const [posts, setPosts] = useState([]);

    return (
        <div>
            {posts.map((post) => (
                <Post postProps={post} />
            ))}
        </div>
    );
};

export default Feed;
