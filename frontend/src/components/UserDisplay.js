import React, { useEffect, useState } from 'react';
import styles from './UserDisplay.module.scss';
import Picture from './../pics/profile.svg';
import { followAndUpdate, getUser, unfollowAndUpdate } from '../redux/app';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import { Link } from 'react-router-dom';
import { Path } from './../constants';
import { useMessageGetter } from '@messageformat/react';

const UserDisplay = ({ firstname, lastname, username, id }) => {
    const [isFollowed, setFollowed] = useState(false);
    const msg = useMessageGetter('RightBar');
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
            <div className={styles.midcontainer}>
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
            </div>
            {isMe ? (
                <></>
            ) : isFollowed ? (
                <Button
                    text={msg('unfollow')}
                    onClick={onClickFollowButton}
                    className={styles.button}
                />
            ) : (
                <Button
                    text={msg('button')}
                    onClick={onClickFollowButton}
                    className={styles.button}
                />
            )}
        </div>
    );
};

export default UserDisplay;
