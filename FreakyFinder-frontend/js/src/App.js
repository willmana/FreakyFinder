import React from 'react';
import FreakyFinder from './FreakyFinder';
import LandingPage from './pages/LandingPage';
import { getUserLoggedIn } from './redux/app';

const App = () => {
    const isUserLoggedin = useSelector(getUserLoggedIn);

    return <div>{isUserLoggedin ? <FreakyFinder /> : <LandingPage />}</div>;
};

export default App;
