import React from 'react';
import Feed from './containers/Feed';
import styles from './FreakyFinder.module.scss';

const FreakyFinder = () => {
    return (
        <div className={styles.mainpagecontainer}>
            <div className={styles.leftbar}></div>
            <div className={styles.middlebar}>
                <Feed />
            </div>
            <div className={styles.rightbar}></div>
        </div>
    );
};

export default FreakyFinder;
