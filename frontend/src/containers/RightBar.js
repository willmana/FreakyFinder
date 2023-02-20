import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, getUsers } from './../redux/app';
import UserDisplay from '../components/UserDisplay';
import styles from './RightBar.module.scss';
import { shuffle } from '../utils';
import { useMessageGetter } from '@messageformat/react';
import { getAllUsers } from './../redux/calls';

const RightBar = () => {
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const currentUser = useSelector(getUser);
    const msg = useMessageGetter('RightBar');
    const users = useSelector(getUsers);
    const dispatch = useDispatch();
    useEffect(() => {
        if (users.length === 0) {
            dispatch(getAllUsers());
        }
        const filtered = users
            .filter((user) => user.username !== currentUser.username)
            .filter((user) => !currentUser.following.includes(user.id));
        setDisplayedUsers(shuffle(filtered));
    }, [currentUser.following, currentUser.username, dispatch, users]);

    return (
        <div className={styles.maincontainer}>
            <div>
                <h2 className={styles.title}>{msg('title')}</h2>
                {displayedUsers.map((user, i, array) => (
                    <div key={i} className={styles.usercontainer}>
                        <UserDisplay
                            firstname={user.first_name}
                            lastname={user.last_name}
                            username={user.username}
                            id={user.id}
                        />
                        {array.length !== i + 1 && (
                            <div className={styles.divider}></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RightBar;
