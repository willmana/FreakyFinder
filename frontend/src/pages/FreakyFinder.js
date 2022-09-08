import React from 'react';
import Feed from '../containers/Feed';
import SideBar from '../containers/SideBar';
import styles from './FreakyFinder.module.scss';

const FreakyFinder = () => {
    return (
        <div className={styles.mainpagecontainer}>
            <div className={styles.leftbar}>
                <SideBar />
            </div>
            <div className={styles.middlebar}>
                <Feed />
            </div>
            <div className={styles.rightbar}></div>
        </div>
    );
};

export default FreakyFinder;
