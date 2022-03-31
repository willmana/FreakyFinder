import React, { useState } from 'react';
import Post from '../components/Post';
import * as Mock from './../mockData';

export const Feed = () => {
    const [posts, setPosts] = useState(Mock.mockPosts);

    return (
        <div>
            {posts.map((post) => (
                <Post postProps={post} />
            ))}
        </div>
    );
};

export default Feed;
