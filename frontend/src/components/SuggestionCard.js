import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SuggestionCard.module.scss';
import { Path } from './../constants';
import Picture from './../pics/profile.svg';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/app';
import { commonFollowers } from '../utils';

const SuggestionCard = ({ user }) => {
    const currentUser = useSelector(getUser);
    return (
        <Link
            to={`${Path.profile}/${user.username}`}
            className={styles.maincontainer}
        >
            <img src={Picture} alt="profile-pic" className={styles.img} />
            <div className={styles.infocontainer}>
                <div className={styles.name}>
                    <p>{user.first_name} </p>
                    <p>{user.last_name}</p>
                </div>
                <div className={styles.username}>@{user.username}</div>
                <div className={styles.commonfollowers}>
                    {commonFollowers(currentUser, user)} yhteistä seuraajaa
                </div>
            </div>
        </Link>
    );
};

export default SuggestionCard;
