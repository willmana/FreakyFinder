import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FreakyFinder from './FreakyFinder';
import LandingPage from './pages/LandingPage';
import { getUser, setUser } from './redux/app';
import styles from './App.module.scss';
import NavigationBar from './containers/NavigationBar';

const App = () => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const currentUser = window.localStorage.getItem('currentUser');
        if (currentUser) {
            const userJSON = JSON.parse(currentUser);
            dispatch(setUser(userJSON));
        }
    }, [dispatch]);

    return (
        <div className={styles.app}>
            <NavigationBar />
            {user ? <FreakyFinder /> : <LandingPage />}
        </div>
    );
};

export default App;
