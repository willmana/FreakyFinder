import React from 'react';
import Feed from '../containers/Feed';
import RightBar from '../containers/RightBar';
import LeftBar from '../containers/LeftBar';
import styles from './FreakyFinder.module.scss';
import { Route, Routes } from 'react-router-dom';
import { Path } from './../constants';
import ProfilePage from './ProfilePage';

const FreakyFinder = () => {
    return (
        <div className={styles.mainpagecontainer}>
            <div className={styles.leftbar}>
                <LeftBar />
            </div>
            <div className={styles.middlebar}>
                <Routes>
                    <Route path={Path.front} element={<Feed />} />
                    <Route
                        path={`${Path.profile}/*`}
                        element={<ProfilePage />}
                    />
                </Routes>
            </div>
            <div className={styles.rightbar}>
                <RightBar />
            </div>
        </div>
    );
};

export default FreakyFinder;
