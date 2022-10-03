import React from 'react';
import styles from './UserDisplay.module.scss';
import Picture from './../pics/profile.svg';
import userApi from './../api/user';
import { getUser } from '../redux/app';
import { useSelector } from 'react-redux';
import Button from './Button';

const UserDisplay = ({ firstname, lastname, username, id }) => {
    const currentUser = useSelector(getUser);

    const onClickFollowUser = async (id) => {
        await userApi.followUser(id, currentUser.id);
    };
    return (
        <div className={styles.maincontainer}>
            <img src={Picture} alt="profile-pic" className={styles.img} />
            <div className={styles.infocontainer}>
                <div className={styles.name}>
                    {firstname} {lastname}
                </div>
                <div className={styles.username}>@{username}</div>
            </div>
            <Button
                onClick={() => onClickFollowUser(id)}
                text={'seuraa'}
                className={styles.button}
            ></Button>
        </div>
    );
};

export default UserDisplay;
