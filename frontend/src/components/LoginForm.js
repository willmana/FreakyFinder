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
    const onClickLogin = async () => {
        try {
            const userId = await authApi.login({ username, password });
            const user = await userApi.getUser(userId);
            window.localStorage.setItem('currentUser', JSON.stringify(user));
            dispatch(setUser(user));
        } catch (e) {}
    };

    return (
        <div className={styles.formcontainer}>
            <form className={styles.margin}>
                <label>username: </label>
                <input onChange={onChangeUsername} value={username}></input>
            </form>
            <form className={styles.margin}>
                <label>password: </label>
                <input onChange={onChangePassword} value={password}></input>
            </form>
            <button className={styles.margin} onClick={() => onClickLogin()}>
                Log in
            </button>
        </div>
    );
};

export default LoginForm;
