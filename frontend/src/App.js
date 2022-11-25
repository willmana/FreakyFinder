import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FreakyFinder from './pages/FreakyFinder';
import LandingPage from './pages/LandingPage';
import { getUser, isLoading, setUser } from './redux/app';
import styles from './App.module.scss';
import NavigationBar from './containers/NavigationBar';
import { useNavigate } from 'react-router-dom';
import Loader from './components/Loader';

const App = ({ onChangeLocale }) => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(isLoading)

    useEffect(() => {
        const currentUser = window.localStorage.getItem('currentUser');
        if (currentUser) {
            const userJSON = JSON.parse(currentUser);
            dispatch(setUser(userJSON));
        } else {
            navigate('/');
        }
    }, [dispatch, navigate]);
    return (
        <div className={styles.app}>
            <NavigationBar onChangeLocale={onChangeLocale} />
            {loading ? <Loader />
            : user ? <FreakyFinder /> : <LandingPage />}
        </div>
    );
};

export default App;
