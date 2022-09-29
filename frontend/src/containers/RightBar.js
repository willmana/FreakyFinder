import React, { useEffect, useState } from 'react';
import userApi from './../api/user';
import { useSelector } from 'react-redux';
import { getUser } from './../redux/app';

const RightBar = () => {
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const currentUser = useSelector(getUser);

    useEffect(() => {
        async function fetchUsers() {
            const res = await userApi.getAll();
            setDisplayedUsers(
                res.filter((user) => user.username !== currentUser.username)
            );
        }
        fetchUsers();
    }, []);

    const onClickFollowUser = async (id) => {
        await userApi.followUser(id, currentUser.id);
    };

    return (
        <div>
            <div>
                {displayedUsers.map((user, i) => (
                    <div key={i}>
                        <div>{user.username}</div>
                        <button onClick={() => onClickFollowUser(user.id)}>
                            seuraa
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RightBar;
