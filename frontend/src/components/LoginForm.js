import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './LoginForm.module.scss';
import Button from './Button';
import { loginAndGetFeed } from './../redux/app';
import { useNavigate } from 'react-router-dom';
import { useMessageGetter } from '@messageformat/react';

const LoginForm = (params) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const msg = useMessageGetter('NavigationBar');
    const onChangeUsername = (event) => {
        setUsername(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const onClickLogin = async (event) => {
        dispatch(loginAndGetFeed(username, password));
        navigate('/');
    };

    return (
        <div className={styles.formcontainer}>
            <div className={styles.inputcontainer}>
                <label className={styles.labeltext}>
                    {msg('loginUsername')}
                </label>
                <input
                    onChange={onChangeUsername}
                    value={username}
                    className={styles.input}
                ></input>
            </div>
            <div className={styles.inputcontainer}>
                <label className={styles.labeltext}>
                    {msg('loginPassword')}
                </label>
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
                text={msg('loginButton')}
            ></Button>
        </div>
    );
};

export default LoginForm;
