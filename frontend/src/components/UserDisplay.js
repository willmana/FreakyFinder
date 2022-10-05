import React from 'react';
import styles from './UserDisplay.module.scss';
import Picture from './../pics/profile.svg';
import userApi from './../api/user';
import { getUser } from '../redux/app';
import { useSelector } from 'react-redux';
import Button from './Button';
import { Link } from 'react-router-dom';
import { Path } from './../constants';

const UserDisplay = ({ firstname, lastname, username, id }) => {
    const currentUser = useSelector(getUser);

    const onClickFollowUser = async (id) => {
        console.log(id);
        await userApi.followUser(id, currentUser.id);
    };
    return (
        <div className={styles.maincontainer}>
            <img src={Picture} alt="profile-pic" className={styles.img} />
            <div className={styles.infocontainer}>
                <div className={styles.name}>
                    {firstname} {lastname}
                </div>
                <Link
                    className={styles.username}
                    to={`${Path.profile}/${username}`}
                >
                    @{username}
                </Link>
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
