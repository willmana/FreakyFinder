import React, { useEffect } from 'react';
import styles from './FriendSearchPage.module.scss';
import userApi from './../api/user';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/app';

const FriendSearchPage = () => {
    const user = useSelector(getUser);
    useEffect(() => {
        function fetchRecommendations() {
            userApi.getRecommendations(user.id);
        }
        fetchRecommendations();
    }, [user.id]);
    return (
        <div className={styles.maincontainer}>
            <div className={styles.midbox}>
                <h3 className={styles.title}>
                    Ihmiset joita seuraat, seuraavat myös:
                </h3>
                <h3 className={styles.title}>
                    Ihmiset jotka seuraavat sinua, seuraavat myös:
                </h3>
            </div>
        </div>
    );
};

export default FriendSearchPage;
