import React, { useState } from 'react';
import Button from './Button';
import styles from './UserDeletor.module.scss';
import authApi from './../api/auth';
import userApi from './../api/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/app';
import { useMessageGetter } from '@messageformat/react';

const UserDeletor = ({ userId }) => {
    const [userVerified, setUserVerified] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const msg = useMessageGetter('Settings.delete');

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onClickVerify = async () => {
        try {
            const requestBody = {
                id: userId,
                username: username,
                password: password
            };
            const res = await authApi.verify(requestBody);
            if (res.verified) {
                setUserVerified(res.verified);
            } else {
                setUserVerified(false);
            }
        } catch (error) {
            if (error.response.data) {
                const data = error.response.data;
                window.alert(data.message);
            }
        }
    };
    const onClickConfirmDelete = async () => {
        try {
            const requestBody = {
                id: userId,
                username: username,
                password: password
            };
            if (userVerified) {
                await userApi.deleteUser(userId, requestBody);
                window.localStorage.clear();
                dispatch(setUser(null));
                navigate('/');
            }
        } catch (error) {
            if (error.response.data) {
                const data = error.response.data;
                window.alert(data.message);
            }
        }
    };
    const onClickCancel = () => {
        setUserVerified(false);
    };

    return (
        <div className={styles.maincontainer}>
            {userVerified ? (
                <div className={styles.confirmcontainer}>
                    <p className={styles.confirmtext}>{msg('confirmText')}</p>
                    <div className={styles.buttoncontainer}>
                        <Button
                            text={msg('confirm')}
                            onClick={onClickConfirmDelete}
                            className={styles.widebuttonred}
                        />
                        <Button
                            text={msg('cancel')}
                            onClick={onClickCancel}
                            className={styles.widebutton}
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <p className={styles.fieldname}>{msg('username')}</p>
                    <div className={styles.searchcontainer}>
                        <input
                            className={styles.forminput}
                            type="text"
                            value={username}
                            onChange={onChangeUsername}
                        ></input>
                    </div>
                    <p className={styles.fieldname}>{msg('password')}</p>
                    <div className={styles.searchcontainer}>
                        <input
                            className={styles.forminput}
                            type="password"
                            value={password}
                            onChange={onChangePassword}
                        ></input>
                    </div>
                    <Button
                        text={msg('authenticate')}
                        className={styles.button}
                        onClick={onClickVerify}
                    />
                </div>
            )}
        </div>
    );
};

export default UserDeletor;
