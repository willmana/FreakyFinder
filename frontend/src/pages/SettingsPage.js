import React from 'react';
import InfoEditor from '../components/InfoEditor';
import styles from './SettingsPage.module.scss';
import { useSelector } from 'react-redux';
import { getUser } from './../redux/app';

const SettingsPage = () => {
    const user = useSelector(getUser);
    return (
        <>
            <div className={styles.maincontainer}>
                <div className={styles.midbox}>
                    <h3 className={styles.title}>Muuta henkilötietoja</h3>
                    <InfoEditor
                        fieldName={'First name'}
                        fieldValue={user.first_name}
                    />
                    <div className={styles.divider}></div>
                    <h3 className={styles.title}>Muuta salasana</h3>
                    <div className={styles.divider}></div>
                    <h3 className={styles.title}>Poista käyttäjä</h3>
                </div>
            </div>
        </>
    );
};

export default SettingsPage;
