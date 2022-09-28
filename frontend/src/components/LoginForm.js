import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authApi from '../api/auth';
import userApi from '../api/user';
import { setUser } from '../redux/app';
import styles from './LoginForm.module.scss';

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
    const onClickLogin = async (event) => {
        try {
            const user = await authApi.login({ username, password }).then();
            window.localStorage.setItem('currentUser', JSON.stringify(user));
            dispatch(setUser(user.user));
        } catch (e) {}
    };

    return (
        <div className={styles.formcontainer}>
            <label>username: </label>
            <input onChange={onChangeUsername} value={username}></input>
            <label>password: </label>
            <input onChange={onChangePassword} value={password}></input>
            <button className={styles.margin} onClick={() => onClickLogin()}>
                Log in
            </button>
        </div>
    );
};

export default LoginForm;
