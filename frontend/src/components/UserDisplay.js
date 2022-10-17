import React, { useEffect, useState } from 'react';
import styles from './UserDisplay.module.scss';
import Picture from './../pics/profile.svg';
import { followAndUpdate, getUser, unfollowAndUpdate } from '../redux/app';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import { Link } from 'react-router-dom';
import { Path } from './../constants';

const UserDisplay = ({ firstname, lastname, username, id }) => {
    const [isFollowed, setFollowed] = useState(false);
    const thisUser = useSelector(getUser);
    const isMe = thisUser.id === id;
    const dispatch = useDispatch();
    const onClickFollowButton = async () => {
        if (isFollowed) {
            dispatch(unfollowAndUpdate(id, thisUser.id));
        } else {
            dispatch(followAndUpdate(id, thisUser.id));
        }
    };
    useEffect(() => {
        setFollowed(thisUser.following.includes(id));
    }, [id, thisUser]);

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
            {isMe ? (
                <></>
            ) : isFollowed ? (
                <Button text={'lopeta seuraus'} onClick={onClickFollowButton} />
            ) : (
                <Button text={'seuraa'} onClick={onClickFollowButton} />
            )}
        </div>
    );
};

export default UserDisplay;
