import React, { useEffect, useState } from 'react';
import styles from './ProfileCard.module.scss';
import Picture from './../pics/profile.svg';
import Button from './Button';
import { useSelector, useDispatch } from 'react-redux';
import { followAndUpdate, getUser, unfollowAndUpdate } from './../redux/app';
import CloseIcon from '@mui/icons-material/Close';
import UserDisplay from './UserDisplay';
import { useMessageGetter } from '@messageformat/react';

const ProfileCard = ({ user }) => {
    const thisUser = useSelector(getUser);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    const [modalTitle, setModalTitle] = useState('');
    const createdDate = new Date(user.createdAt);
    const commonFollowers = user.followers.filter((follower) =>
        thisUser.followers.includes(follower.id)
    );
    const commonFollowing = user.following.filter((followed) =>
        thisUser.following.includes(followed.id)
    );
    const msg = useMessageGetter('Profile');
    const msgButton = useMessageGetter('RightBar');

    const ownPage = thisUser.id === user.id;
    const dispatch = useDispatch();
    const getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const onClickFollowButton = async () => {
        if (isFollowed) {
            dispatch(unfollowAndUpdate(user.id, thisUser.id));
        } else {
            dispatch(followAndUpdate(user.id, thisUser.id));
        }
    };
    const onClickFollower = () => {
        setModalContent(user.followers);
        setModalTitle(msg('followersTitle'));
        setModalOpen(true);
    };
    const onClickFollowed = () => {
        setModalContent(user.following);
        setModalTitle(msg('followsTitle'));
        setModalOpen(true);
    };

    // Reset follower/following data when changing user from RightBar
    useEffect(() => {
        setModalContent([]);
        setModalOpen(false);
    }, [user]);

    const isFollowed = thisUser.following.includes(user.id);
    return (
        <>
            <div className={styles.profilecontainer}>
                <div className={styles.backgroundcolor1}></div>
                <div className={styles.backgroundcolor2}></div>
                <img
                    src={Picture}
                    alt="profile-pic"
                    className={styles.profilepicture}
                />
                <h2 className={styles.fullname}>
                    {user.first_name} {user.last_name}
                </h2>
                <h3 className={styles.username}>@{user.username} </h3>
                <ul className={styles.firstlist}>
                    <li>
                        <span className={styles.bold}>{msg('age1')}</span>{' '}
                        {getAge(user.date_of_birth)} {msg('age2')}
                    </li>
                    <li>
                        <span className={styles.bold}>{msg('gender')}</span>{' '}
                        {msg(`genderMap.${user.gender}`)}
                    </li>
                    <li>
                        <span className={styles.bold}>{msg('location')}</span>{' '}
                        {user.city}, {user.country}
                    </li>
                </ul>
                <ul className={styles.secondlist}>
                    <li className={styles.bold}>
                        {msg('since', {
                            date: createdDate.toLocaleDateString()
                        })}
                    </li>
                    {ownPage ? (
                        <>
                            <li onClick={() => onClickFollowed()}>
                                <span className={styles.bold}>
                                    {msg('follows')}
                                </span>{' '}
                                {user.following.length}
                            </li>
                            <li onClick={() => onClickFollower()}>
                                <span className={styles.bold}>
                                    {msg('followers')}
                                </span>{' '}
                                {user.followers.length}
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                {commonFollowers.length}{' '}
                                {msg('commonFollowers')}
                            </li>
                            <li>
                                {commonFollowing.length} {msg('commonFollowed')}
                            </li>
                        </>
                    )}
                </ul>
                {!ownPage && (
                    <>
                        <div className={styles.followbutton}>
                            {isFollowed ? (
                                <Button
                                    text={msgButton('unfollow')}
                                    onClick={onClickFollowButton}
                                />
                            ) : (
                                <Button
                                    text={msgButton('button')}
                                    onClick={onClickFollowButton}
                                />
                            )}
                        </div>
                        <div
                            className={styles.follows}
                            onClick={() => onClickFollowed()}
                        >
                            {msg('follows')}
                            {user.following.length}
                        </div>
                        <div
                            className={styles.followers}
                            onClick={() => onClickFollower()}
                        >
                            {msg('followers')} {user.followers.length}
                        </div>
                    </>
                )}
            </div>
            {modalOpen && (
                <>
                    <div className={styles.userlist}>
                        <div className={styles.headerrow}>
                            <h4 className={styles.listheader}>{modalTitle}</h4>
                            <CloseIcon
                                className={styles.closelist}
                                onClick={() => setModalOpen(false)}
                            />
                        </div>
                        <div className={styles.listcontainer}>
                            {modalContent.map((user, i, array) => (
                                <div key={i} className={styles.usercontainer}>
                                    <UserDisplay
                                        firstname={user.first_name}
                                        lastname={user.last_name}
                                        username={user.username}
                                        id={user.id}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProfileCard;
