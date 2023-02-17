import React, { useEffect, useState } from 'react';
import userApi from './../api/user';
import { useSelector } from 'react-redux';
import { getUser } from './../redux/app';
import UserDisplay from '../components/UserDisplay';
import styles from './RightBar.module.scss';
import { shuffle } from '../utils';
import { useMessageGetter } from '@messageformat/react';

const RightBar = () => {
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const currentUser = useSelector(getUser);
    const msg = useMessageGetter('RightBar');

    useEffect(() => {
        async function fetchUsers() {
            const res = await userApi.getAll();
            const filtered = res
                .filter((user) => user.username !== currentUser.username)
                .filter((user) => !currentUser.following.includes(user.id));
            setDisplayedUsers(shuffle(filtered));
        }
        fetchUsers();
    }, [currentUser.following, currentUser.username]);

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
