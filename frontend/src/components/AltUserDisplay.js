import React from 'react';
import { Link } from 'react-router-dom';
import Picture from './../pics/profile.svg';
import { Path } from '../constants';
import styles from './AltUserDisplay.module.scss';

const AltUserDisplay = ({ firstname, lastname, username }) => {
    return (
        <Link
            to={`${Path.profile}/${username}`}
            className={styles.maincontainer}
        >
            <img src={Picture} alt="profile-pic" className={styles.img} />
            <div className={styles.infocontainer}>
                <div className={styles.name}>
                    <p>{firstname} </p>
                    <p>{lastname}</p>
                </div>
                <div className={styles.username}>@{username}</div>
            </div>
        </Link>
    );
};

export default AltUserDisplay;
