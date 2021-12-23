import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLoggedIn } from '../redux/app';

const LoginForm = (params) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onChangeUsername = (event) => {
        setUsername(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const onClickLogin = () => {
        dispatch(setUserLoggedIn());
    };

    return (
        <div>
            <form>
                <label>username</label>
                <input onChange={onChangeUsername} value={username}></input>
            </form>
            <form>
                <label>password</label>
                <input onChange={onChangePassword} value={password}></input>
            </form>
            <button onClick={() => onClickLogin()}>Log in</button>
        </div>
    );
};

export default LoginForm;
