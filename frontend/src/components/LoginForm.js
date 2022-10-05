import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authApi from '../api/auth';
import { setUser } from '../redux/app';
import styles from './LoginForm.module.scss';
import Button from './Button';
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
            const user = await authApi.login({ username, password });
            window.localStorage.setItem('currentUser', JSON.stringify(user));
            dispatch(setUser(user.user));
        } catch (e) {}
    };

    return (
        <div className={styles.formcontainer}>
            <div className={styles.inputcontainer}>
                <label className={styles.labeltext}>username</label>
                <input
                    onChange={onChangeUsername}
                    value={username}
                    className={styles.input}
                ></input>
            </div>
            <div className={styles.inputcontainer}>
                <label className={styles.labeltext}>password</label>
                <input
                    onChange={onChangePassword}
                    value={password}
                    type="password"
                    className={styles.input}
                ></input>
            </div>
            <Button
                className={styles.margin}
                onClick={() => onClickLogin()}
                text={'Log in'}
            ></Button>
        </div>
    );
};

export default LoginForm;
