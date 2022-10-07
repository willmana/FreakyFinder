import React from 'react';
import styles from './ProfileCard.module.scss';
import Picture from './../pics/profile.svg';
import Button from './Button';
import { useSelector } from 'react-redux';
import { getUser } from './../redux/app';

const ProfileCard = ({ user }) => {
    const thisUser = useSelector(getUser);
    const createdDate = new Date(user.createdAt);
    const commonFollowers = user.followers.filter((follower) =>
        thisUser.followers.includes(follower)
    );
    const commonFollowing = user.following.filter((followed) =>
        thisUser.following.includes(followed)
    );
    const isFollowed = thisUser.following.includes(user.id);

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

    return (
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
                <li>Ikä: {getAge(user.date_of_birth)} vuotta</li>
                <li>Sukupuoli: {user.gender}</li>
                <li>
                    Kotoisin: {user.city}, {user.country}
                </li>
            </ul>
            <ul className={styles.secondlist}>
                <li>Käyttäjä {createdDate.toLocaleDateString()} lähtien</li>
                {user.id !== thisUser.id && (
                    <>
                        <li>{commonFollowers.length} yhteistä seuraajaa</li>
                        <li>{commonFollowing.length} yhteistä seurattavaa</li>
                    </>
                )}
            </ul>
            <div className={styles.followbutton}>
                {isFollowed ? (
                    <Button text={'lopeta seuraus'} />
                ) : (
                    <Button text={'seuraa'} />
                )}
            </div>
            <div className={styles.message}>
                <Button text={'lähetä viesti'} />
            </div>
            <div className={styles.follows}>
                Seuraa: {user.following.length}
            </div>
            <div className={styles.followers}>
                Seuraajia: {user.followers.length}
            </div>
        </div>
    );
};

export default ProfileCard;
