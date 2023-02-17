import React, { useState } from 'react';
import styles from './PasswordUpdater.module.scss';
import Button from './Button';
import userApi from '../api/user';
import { useMessageGetter } from '@messageformat/react';

const PasswordUpdater = ({ userId, username }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const msg = useMessageGetter('Settings.password');

    const onChangeOldPassword = (e) => {
        setOldPassword(e.target.value);
    };

    const onChangeNewPassword1 = (e) => {
        setNewPassword1(e.target.value);
    };

    const onChangeNewPassword2 = (e) => {
        setNewPassword2(e.target.value);
    };

    const onClickSubmit = async () => {
        if (newPassword1 !== newPassword2) {
            window.alert(msg('noMatchError'));
            return;
        }
        try {
            const requestBody = {
                oldPassword: oldPassword,
                newPassword1: newPassword1,
                newPassword2: newPassword2,
                userId: userId,
                username: username
            };
            await userApi.updatePassword(userId, requestBody);
        } catch (error) {
            if (error.response.data) {
                const data = error.response.data;
                window.alert(data.message);
            }
        }
    };
    return (
        <div className={styles.maincontainer}>
            <p className={styles.fieldname}>{msg('old')}</p>
            <div className={styles.searchcontainer}>
                <input
                    className={styles.forminput}
                    type="password"
                    value={oldPassword}
                    onChange={onChangeOldPassword}
                    autoComplete="off"
                ></input>
            </div>
            <p className={styles.fieldname}>{msg('new1')}</p>
            <div className={styles.searchcontainer}>
                <input
                    className={styles.forminput}
                    type="password"
                    value={newPassword1}
                    onChange={onChangeNewPassword1}
                    autoComplete="off"
                ></input>
            </div>
            <p className={styles.fieldname}>{msg('new2')}</p>
            <div className={styles.searchcontainer}>
                <input
                    className={styles.forminput}
                    type="password"
                    value={newPassword2}
                    onChange={onChangeNewPassword2}
                    autoComplete="off"
                ></input>
            </div>
            <Button
                text={msg('send')}
                className={styles.button}
                onClick={onClickSubmit}
            />
        </div>
    );
};

export default PasswordUpdater;
