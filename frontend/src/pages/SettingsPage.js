import React from 'react';
import InfoEditor from '../components/InfoEditor';
import styles from './SettingsPage.module.scss';
import { useSelector } from 'react-redux';
import { getUser } from './../redux/app';
import PasswordUpdater from '../components/PasswordUpdater';

const SettingsPage = () => {
    const user = useSelector(getUser);
    return (
        <>
            <div className={styles.maincontainer}>
                <div className={styles.midbox}>
                    <h3 className={styles.title}>Muuta henkilötietoja</h3>
                    <InfoEditor
                        fieldName={'first_name'}
                        fieldValue={user.first_name}
                        userId={user.id}
                    />
                    <InfoEditor
                        fieldName={'last_name'}
                        fieldValue={user.last_name}
                        userId={user.id}
                    />
                    <InfoEditor
                        fieldName={'username'}
                        fieldValue={user.username}
                        userId={user.id}
                    />
                    <InfoEditor
                        fieldName={'country'}
                        fieldValue={user.country}
                        userId={user.id}
                    />
                    <InfoEditor
                        fieldName={'city'}
                        fieldValue={user.city}
                        userId={user.id}
                    />
                    <div className={styles.divider}></div>
                    <h3 className={styles.title}>Muuta salasana</h3>
                    <PasswordUpdater
                        username={user.username}
                        userId={user.id}
                    />
                    <div className={styles.divider}></div>
                    <h3 className={styles.title}>Poista käyttäjä</h3>
                </div>
            </div>
        </>
    );
};

export default SettingsPage;
