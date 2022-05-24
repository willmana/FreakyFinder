import React, { useState } from 'react';
import Post from '../components/Post';
import * as Mock from './../db.json';

export const Feed = () => {
    const [posts, setPosts] = useState(Mock.posts);

    return (
        <div>
            {posts.map((post) => (
                <Post postProps={post} />
            ))}
        </div>
    );
};

export default Feed;
