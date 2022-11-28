import React, { useState } from 'react';
import Button from './Button';
import styles from './UserDeletor.module.scss';
import authApi from './../api/auth';
import userApi from './../api/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/app';

const UserDeletor = ({ userId }) => {
    const [userVerified, setUserVerified] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onClickVerify = async () => {
        try {
            const requestBody = {
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
            console.log(error);
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
            console.log(error);
        }
    };
    const onClickCancel = () => {
        setUserVerified(false);
    };

    return (
        <div className={styles.maincontainer}>
            {userVerified ? (
                <div className={styles.confirmcontainer}>
                    <p className={styles.confirmtext}>
                        Oletko varma? Vahvistamisen jälkeen käyttäjäsi
                        poistetaan järjestelmästä.
                    </p>
                    <div className={styles.buttoncontainer}>
                        <Button
                            text={'Kyllä, poista käyttäjä'}
                            onClick={onClickConfirmDelete}
                            className={styles.widebuttonred}
                        />
                        <Button
                            text={'En, peruuta'}
                            onClick={onClickCancel}
                            className={styles.widebutton}
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <p className={styles.fieldname}>Käyttäjätunnus</p>
                    <div className={styles.searchcontainer}>
                        <input
                            className={styles.forminput}
                            type="text"
                            value={username}
                            onChange={onChangeUsername}
                        ></input>
                    </div>
                    <p className={styles.fieldname}>Salasana</p>
                    <div className={styles.searchcontainer}>
                        <input
                            className={styles.forminput}
                            type="password"
                            value={password}
                            onChange={onChangePassword}
                        ></input>
                    </div>
                    <Button
                        text={'Tunnistaudu'}
                        className={styles.button}
                        onClick={onClickVerify}
                    />
                </div>
            )}
        </div>
    );
};

export default UserDeletor;
