import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, getUser, setPosts } from '../redux/app';
import postApi from './../api/post';

const PostForm = () => {
    const [postData, setPostData] = useState();
    const user = useSelector(getUser);
    const posts = useSelector(getPosts);
    const dispatch = useDispatch();

    const onInputChange = (event) => {
        console.log(event.target.value);
        setPostData(event.target.value);
    };
    const onClickSubmitPost = async (e) => {
        e.preventDefault();
        const postObject = {
            userId: user.user.id,
            description: postData,
            date: new Date()
        };
        console.log(postObject);
        await postApi.createPost(postObject, user.token);
        setPostData('');
        const res = await postApi.getAll();
        dispatch(setPosts(res));
    };

    return (
        <div>
            <input
                value={postData}
                placeholder="kirjoita jotain"
                onChange={onInputChange}
            ></input>
            <button onClick={onClickSubmitPost}>Julkaise</button>
        </div>
    );
};

export default PostForm;
