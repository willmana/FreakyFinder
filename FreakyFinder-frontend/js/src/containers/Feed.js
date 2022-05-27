import React, { useEffect, useState } from 'react';
import postApi from '../api/post';
import Post from '../components/Post';
import PostForm from '../components/PostForm';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const postResponse = await postApi.getAll();
            postResponse.sort((a, b) => b.date - a.date);
            setPosts(postResponse);
        }
        getPosts();
    }, []);

    return (
        <div>
            <PostForm />
            {posts.map((post) => (
                <Post postProps={post} />
            ))}
        </div>
    );
};

export default Feed;
