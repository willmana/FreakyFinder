import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/app';
import postApi from './../api/post';

const PostForm = () => {
    const [postData, setPostData] = useState();
    const user = useSelector(getUser);

    const onInputChange = (event) => {
        console.log(event.target.value);
        setPostData(event.target.value);
    };
    const onClickSubmitPost = async (e) => {
        e.preventDefault();
        const postObject = {
            id: Math.floor(Math.random() * 1000),
            userId: user.id,
            description: postData,
            likes: [],
            date: new Date()
        };
        await postApi.createPost(postObject);
        setPostData('');
    };

    return (
        <div>
            <form>
                <input
                    value={postData}
                    placeholder="kirjoita jotain"
                    onChange={onInputChange}
                ></input>
                <button onClick={onClickSubmitPost}>Julkaise</button>
            </form>
        </div>
    );
};

export default PostForm;
