import React from 'react';
import RegisterForm from '../components/RegisterForm';
import styles from './LandingPage.module.scss';
import Logo from './../logo/default.svg';

const LandingPage = (params) => {
    return (
        <div className={styles.maincontainer}>
            <img src={Logo} alt="Logo" className={styles.imgcontainer}></img>
            <div className={styles.registerformcontainer}>
                <RegisterForm />
            </div>
        </div>
    );
};

export default LandingPage;
