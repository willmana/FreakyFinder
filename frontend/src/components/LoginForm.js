import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './LoginForm.module.scss';
import Button from './Button';
import { loginAndGetFeed } from './../redux/app';

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
        dispatch(loginAndGetFeed(username, password));
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
